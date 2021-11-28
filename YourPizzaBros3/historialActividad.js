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
    his.HoraEntrada  = firebase.firestore.Timestamp.fromDate(new Date(his.HoraEntrada));
    his.HoraSalida = firebase.firestore.Timestamp.fromDate(new Date(his.HoraSalida));
    var horaEntradaReal = his.HoraEntrada.toDate();
    var horaSalidaReal = his.HoraSalida.toDate();
   
    //Actualizacion del historial de actividad
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
    var turnoABuscar = his.IdTurno;

    // Obtenemos la informacion del empleado
    var empleado = await fnEmpleado.obtenerEmpleado(his.IdEmpleado);
    empleado.ListaTurnos.forEach((turno) => {
      var fechaBase = turno.Fecha // -> Timestamp
      // Verificamos si la fecha es la misma
      if (fechaABuscar === fechaBase.toDate().toISOString().split("T")[0]){
        turno.Turnos.forEach(async (t) => {
          if (t.Id === turnoABuscar) {
            var horario = await fnHorario.obtenerHorarioId(t.Id); 
            var horaEntradaBase = new Date (fechaABuscar + "T" +  horario.HoraEntrada + ":00");
            var horaSalidaBase = new Date (fechaABuscar + "T" + horario.HoraSalida + ":00");
            var  tiempoReal = horaSalidaReal.getTime() - horaEntradaReal.getTime();
            var tiempoBase = horaSalidaBase.getTime() - horaEntradaBase.getTime();
            var estado = null;

            //Comparacion de horas y definicion de estado
            if(tiempoReal > tiempoBase){
              estado = "Puntual";
            }else if (tiempoReal < tiempoBase){
              if((tiempoBase - tiempoReal).toString().length <= 6){
                estado = "Retraso";
              }else{
                estado = "Falta";
              }
            }
            console.log("Estado de llegada: ", estado);
         
            var body = {
              Fecha: fechaABuscar,
              Turno: turnoABuscar,
              Estado: estado,
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
