const { horario } = require('./config');

/*
Estructrura Body -> Crear
{
	"HoraEntrada":"12:30",
	"HoraSalida":"14:30"
}
*/

//CrearHorario
async function crearHorario(idHor, data){
  await horario.doc(idHor).set(data);
  respuesta = {
    "Mensaje" : "Horario agregado correctamente",
    "Horario": data
  }
  return respuesta;
}

//ObtenerHorarios
async function obtenerHorarios() {
  const snapshot = await horario.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}

//EliminarHorario
async function eliminarHorario(idHor) {  
  var respuesta = null;
  await horario.doc(idHor).delete().then(() => {
    respuesta = "Horario borrado correctamente!"
    console.log(respuesta);
  }).catch((error) => 
  {
    console.error("Error eliminando horario: ", error);
  });

  return respuesta;
}

//ActualizarHorario
async function actualizarHorario(idHor, hor){
  var respuesta = null;
  await horario.doc(idHor).update(hor)
  .then(() => 
  {
    respuesta = hor;  
    console.log("Horario actualizado correctamente");
  })
  .catch((error) => 
  {
      // The document probably doesn't exist.
      console.error("Error al actualizar el horario: ", error);
  });
  return respuesta;
}

module.exports = {
  crearHorario,
  obtenerHorarios,
  eliminarHorario,
  actualizarHorario
};