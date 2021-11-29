function stringAFecha(fecha) {
  var parts = fecha.split("-");
  // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
  // January - 0, February - 1, etc.
  var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
  return mydate;
}

async function actualizarDoc(idDoc, nuevoPar, nombreEntidad) {
  var respuesta = null;
  await nombreEntidad
    .doc(idDoc)
    .update(nuevoPar)
    .then(() => {
      respuesta = nuevoPar;
      console.log(`${nombreEntidad} actualizad@ correctamente!`);
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error(`Error al actualizar : ${nombreEntidad}`, error);
    });

  return respuesta;
}
//EliminarDoc
async function eliminarDoc(idDoc,nombreEntidad) {
  var respuesta = null;
  await nombreEntidad.doc(idDoc).delete().then(() => {
    respuesta = `${nombreEntidad} correctamente eliminad@!`
    console.log(respuesta);
  }).catch((error) => {
    console.error(`Error al eliminar  ${nombreEntidad}: `, error);
  });
  return respuesta;
}
module.exports = {
  stringAFecha,
  actualizarDoc,
  eliminarDoc
};
