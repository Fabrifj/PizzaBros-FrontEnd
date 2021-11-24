const { detalleSueldo } = require('./config');

/*
{
  "IdEmpleado":"",
  "SueldoBase":"",
  "SueldoReal":""
}
*/

//CrearDetalleSueldo
async function crearDetalleSueldo(data){
  await detalleSueldo.add(data);
  respuesta = {
    "Mensaje" : "Detalle sueldo agregado correctamente",
    "DetalleSueldo": data
  }
  return respuesta;
}

//ObtenerDetalleSueldo
async function obtenerDetalleSueldo() {
  const snapshot = await detalleSueldo.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}

//EliminarDetalleSueldo
async function eliminarDetalleSueldo(idDS) {  
  var respuesta = null;
  await detalleSueldo.doc(idDS).delete().then(() => {
    respuesta = "DetalleSueldo borrado correctamente!"
    console.log(respuesta);
  }).catch((error) => 
  {
    console.error("Error eliminando DetalleSueldo: ", error);
  });

  return respuesta;
}

//ActualizarDetalleSueldo
async function actualizarDetalleSueldo(idDS, ds){
  var respuesta = null;
  await detalleSueldo.doc(idDS).update(ds)
  .then(() => 
  {
    respuesta = ds;  
    console.log("DetalleSueldo actualizado correctamente");
  })
  .catch((error) => 
  {
      // The document probably doesn't exist.
      console.error("Error al actualizar el DetalleSueldo: ", error);
  });
  return respuesta;
}

module.exports = {
  crearDetalleSueldo,
  obtenerDetalleSueldo,
  actualizarDetalleSueldo,
  eliminarDetalleSueldo
};