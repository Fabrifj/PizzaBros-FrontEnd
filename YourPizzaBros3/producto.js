const { producto } = require('./config');

/*  
Estructura del body -> Crear
{
  "ImgURL": "https://live.mrf.io/statics/i/ps/irecetasfaciles.com/wp-content/uploads/2019/08/pizza-de-jamon-queso-y-tocino.jpg?width=1200&enable=upscale",
  "Precio": 65,
  "Costo": 50,
  "Tamano": "Grande",
  "Nombre": "Pizza 3 Quesos"
}    
*/ 
async function crearProducto(body){
    await producto.add(body);
    respuesta = {
        "Mensaje" : "Producto agregado correctamente",
        "Producto": body
    }
    return respuesta;
}

async function obtenerProductos(){
    const snapshot = await producto.get();
    const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    return lista;
}

//ObtenerProductoId
async function obtenerProductoId(prd) {
  let respuesta = null;
  await producto.doc(prd).get().then(snapshot => {
    let querySnapshot = snapshot.data()
    if (typeof querySnapshot == 'undefined' || querySnapshot.empty || querySnapshot == null) {
      console.log(`No encontramos el producto con Id: ${prd}`);
    } else {
      console.log('Encontramos al producto: ', prd);
      respuesta = querySnapshot
    }
  })
  return respuesta;
}

//ObtenerProductoNombre
async function obtenerProductoNombre(prd) {
  let query = await producto.where('Nombre', '==', prd);
  let querySnapshot = await query.get();
  let respuesta = null;

  if (querySnapshot.empty) {
    console.log(`No encontramos el producto con nombre: ${prd}`);
    respuesta = `No encontramos el producto con nombre: ${prd}`;

  } else {
    console.log('Encontramos al producto: ', prd);
    respuesta = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return respuesta;
}

// Hacen falta funciones para poder actualizar y eliminar un producto.


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoId,
    obtenerProductoNombre
};

