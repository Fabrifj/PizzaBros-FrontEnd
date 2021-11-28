const { historialActividad, firebase, empleado } = require("./config");
const fnEmpleado = require("./empleado");
const fnHorario = require("./horario");
/*
Estructura body -> Crear
{
    "IdEmpleado":"",
    "IdTurno":"A",
    "HoraEntrada":"",
    "HoraSalida":""
}
*/

//CrearHistorialActividad
async function crearHistorialActividad(data) {
  var respuesta = null;
  if (data.HoraSalida) {
    respuesta =
      "No puedes crear un historial de actividad que cuente con un horario de salida ya establecido.";
  } else {
    data.HoraEntrada = firebase.firestore.Timestamp.fromDate(
      new Date(data.HoraEntrada)
    );

    await historialActividad.add(data);
    respuesta = {
      Mensaje: "Historial de actividad agregado correctamente",
      HistorialActividad: data,
    };
  }
  return respuesta;
}

//ObtenerHistorialActividades
async function obtenerHistorialActividades() {
  const snapshot = await historialActividad.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}

//ObtenerHistorialActividadesEmpleado
async function obtenerHistorialActividadesEmpleado(idEmpleado) {
  var respuesta = null;
  var query = await historialActividad
    .where("IdEmpleado", "==", idEmpleado)
    .get();
  if (query.empty) {
    respuesta =
      "El empleado con ID: " +
      idEmpleado +
      " no tiene ningun historial de actividad";
  } else {
    console.log("Se encontro el historial de actividad del empleado");
    respuesta = query.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return respuesta;
}

//EliminarHistorialActividades
async function eliminarHistorialActividad(idHis) {
  var respuesta = null;
  await historialActividad
    .doc(idHis)
    .delete()
    .then(() => {
      respuesta = "Historial de actividad borrado correctamente!";
      console.log(respuesta);
    })
    .catch((error) => {
      console.error("Error eliminando historial de actividad: ", error);
    });

  return respuesta;
}

//Funcion para calcular la diferencia entre horas
function diferenciaHoras(horaInicio, horaFinal) {
  hTotal = horaFinal.split(":")[0] - horaInicio.split(":")[0];
  mTotal = horaFinal.split(":")[1] - horaInicio.split(":")[1];
  return hTotal + ":" + mTotal;
}

//ActualizarHistorialActividad
async function actualizarHistorialActividad(idHis, his) {
  var respuesta = null;

  if (his.HoraSalida) {
    his.HoraEntrada = firebase.firestore.Timestamp.fromDate(
      new Date(his.HoraEntrada)
    );

    his.HoraSalida = firebase.firestore.Timestamp.fromDate(
      new Date(his.HoraSalida)
    );

    await historialActividad
      .doc(idHis)
      .update(his)
      .then(() => {
        respuesta = his;
        console.log("Historial de actividad actualizado correctamente");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error al actualizar el historial de actividad: ", error);
      });

    var fechaABuscar = his.HoraEntrada.toDate().toISOString().split("T")[0];
    var horaEntradaReal = his.HoraEntrada.toDate()
      .toISOString()
      .split("T")[1]
      .split(".")[0];
    var horaSalidaReal = his.HoraSalida.toDate()
      .toISOString()
      .split("T")[1]
      .split(".")[0];
    //var difHoras = diferenciaHoras(horaEntradaReal, horaSalidaReal);
    //console.log(difHoras);
    var turnoABuscar = his.IdTurno;

    var empleado = await fnEmpleado.obtenerEmpleado(his.IdEmpleado);
    empleado.ListaTurnos.forEach((turno) => {
      var fecha = turno.Fecha.toDate().toISOString().split("T")[0];
      if (fecha === fechaABuscar) {
        turno.Turnos.forEach(async (t) => {
          if (t.Id === turnoABuscar) {
            var body = {
              Fecha: fechaABuscar,
              Turno: turnoABuscar,
              Estado: "Puntual",
            };

            await fnEmpleado.actualizarEstadoTurno(his.IdEmpleado, body);
          }
        });
      }
    });
  } else {
    respuesta =
      "No se puede actualizar un historial de actividad de un empleado sin agregar su Hora de Salida.";
  }

  return respuesta;
}

module.exports = {
  crearHistorialActividad,
  obtenerHistorialActividades,
  eliminarHistorialActividad,
  actualizarHistorialActividad,
  obtenerHistorialActividadesEmpleado,
};
