const { historialActividad } = require('./config');

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
async function crearHistorialActividad(data){
  await historialActividad.add(data);
  respuesta = {
    "Mensaje" : "Historial de actividad agregado correctamente",
    "HistorialActividad": data
  }
  return respuesta;
}

//ObtenerHistorialActividades
async function obtenerHistorialActividades() {
  const snapshot = await historialActividad.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}

//EliminarHistorialActividades
async function eliminarHistorialActividad(idHis) {  
  var respuesta = null;
  await historialActividad.doc(idHis).delete().then(() => {
    respuesta = "Historial de actividad borrado correctamente!"
    console.log(respuesta);
  }).catch((error) => 
  {
    console.error("Error eliminando historial de actividad: ", error);
  });

  return respuesta;
}

//ActualizarHistorialActividad
async function actualizarHistorialActividad(idHis, his){
  var respuesta = null;
  await historialActividad.doc(idHis).update(his)
  .then(() => 
  {
    respuesta = his;  
    console.log("Historial de actividad actualizado correctamente");
  })
  .catch((error) => 
  {
      // The document probably doesn't exist.
      console.error("Error al actualizar el historial de actividad: ", error);
  });
  return respuesta;
}

module.exports = {
  crearHistorialActividad,
  obtenerHistorialActividades,
  eliminarHistorialActividad,
  actualizarHistorialActividad
};