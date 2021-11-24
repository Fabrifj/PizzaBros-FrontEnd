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

//ObtenerIDCatProd este metodo te devuelve una lista de idCat de las cats que contienen un producto.
async function obtenerIDCatProd(nuevoBody) {
  let query = await categoria.where('ListaProductos', "array-contains", nuevoBody);
  let querySnapshot = await query.get();
  let respuesta = null;

  if (querySnapshot.empty) {
    console.log(`No encontramos categorias prod: ${nuevoBody.IdProducto}`);
  } else {
    
    respuesta = querySnapshot.docs.map((doc) => ({ id: doc.id }));
    console.log('Encontramos a la categorias: ', respuesta);
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
/* Prods es la lista de productos a agregar
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
  
]
*/
async function agregarProdsCategoria(idCat, prods) {  
  var respuesta = null;
  var lista = null;
  await categoria.doc(idCat).get().then(snapshot =>
    {
      lista = snapshot.data().ListaProductos
    });
  cat = {
    ListaProductos: lista.concat(prods)
  }
  await categoria.doc(idCat).update(cat)
  .then(() => 
  {
    respuesta = cat;  
    console.log("Productos agregados a categoria correctamente!");
  })
  .catch((error) => 
  {
      // The document probably doesn't exist.
      console.error("Error al agregar productos a categoria: ", error);
  });

  return respuesta;
}
//Eliminar Prod de Categorias
async function eliminarProdCategorias(prod) 
{
  var miProd = 
    {
      "IdProducto":prod.id,
      "NombreProducto":prod.Nombre,
      "ImgURL":prod.ImgURL
    }
  var listaIds = await obtenerIDCatProd(miProd);
    for await (const id of listaIds) 
    {
      await categoria.doc(id.id).get().then(snapshot =>
      {
        lista = snapshot.data().ListaProductos
        var filtered = lista.filter(function(value, index, arr)
        { 
          
          return (value.IdProducto != miProd.IdProducto);
        });
        
        var updateCat = {"ListaProductos": filtered}
        this.actualizarCategoria(id.id, updateCat);
      });

      
    }
}



module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaNombre,
  eliminarCategoria,
  actualizarCategoria,
  obtenerIDCatProd,
  agregarProdsCategoria,
  eliminarProdCategorias
};
