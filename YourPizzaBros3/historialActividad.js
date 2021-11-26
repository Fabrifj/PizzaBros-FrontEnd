const { historialActividad, firebase, empleado } = require("./config");

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

//ActualizarHistorialActividad
async function actualizarHistorialActividad(idHis, his) {
  var respuesta = null;
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
  return respuesta;
}

module.exports = {
  crearHistorialActividad,
  obtenerHistorialActividades,
  eliminarHistorialActividad,
  actualizarHistorialActividad,
  obtenerHistorialActividadesEmpleado,
};
