const { categoria } = require('./config');

/*
Estructura del Body -> Crear
{
  "ListaProductos":
  [
    {
      "IdProducto":"",
      "ImgURL":"",
      "NombreProducto":""
    },
    {
      "IdProducto":"",
      "ImgURL":"",
      "NombreProducto":""
    }
    
  ],
  "Descripcion":"",
  "Nombre":""
}
*/

//CrearCategoria
async function crearCategoria(body){
  await categoria.add(body);
  respuesta = {
    "Mensaje" : "Categoria agregada correctamente",
    "Categoria": body
  }
  return respuesta;
}

//ObtenerCategorias
async function obtenerCategorias(){
  const snapshot = await categoria.get();
  const lista = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return lista;
}

//ObtenerCategoriaNombre
async function obtenerCategoriaNombre(cat) {
  let query = await categoria.where('Nombre', '==', cat);
  let querySnapshot = await query.get();
  let respuesta = null;

  if (querySnapshot.empty) {
    console.log(`No encontramos la categoria con nombre: ${cat}`);
  } else {
    console.log('Encontramos a la categoria: ', cat);
    respuesta = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return respuesta;
}

//EliminarCategoriaId
async function eliminarCategoria(idCat) {
  var respuesta = null;
  await categoria.doc(idCat).delete().then(() => {
    respuesta = "Categoria correctamente eliminada!"
    console.log(respuesta);
  }).catch((error) => {
    console.error("Error al eliminar la categoria: ", error);
  });
  return respuesta;
}


/*
Estructura del body -> Actualizar
{
  "ListaProductos":
  [
    {
      "IdProducto":"",
      "ImgURL":"",
      "NombreProducto":""
    },
    {
      "IdProducto":"",
      "ImgURL":"",
      "NombreProducto":""
    }
    
  ],
  "Descripcion":"",
  "Nombre":""
}
*/

async function actualizarCategoria(idCat, cat) {  
  var respuesta = null;
  await categoria.doc(idCat).update(cat)
  .then(() => 
  {
    respuesta = cat;  
    console.log("Categoria actualizada correctamente!");
  })
  .catch((error) => 
  {
      // The document probably doesn't exist.
      console.error("Error al actualizar la categoria: ", error);
  });

  return respuesta;
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaNombre,
  eliminarCategoria,
  actualizarCategoria
};
