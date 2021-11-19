const { producto } = require('./config');
const fnElemento = require('./elemento');

//CrearProducto estructura:
/*
{
  "ImgURL": "https://live.mrf.io/statics/i/ps/irecetasfaciles.com/wp-content/uploads/2019/08/pizza-de-jamon-queso-y-tocino.jpg?width=1200&enable=upscale",
  "Precio": 65,
  "Costo": 50,
  "Tamano": "Grande",
  "Nombre": "Pizza 3 Quesos"
  "ListaIngredientes":
  [
  	{
  		"IdIngrediente":"ANICBIWBCIE",
  		"Cantidad": 500,
  		"TipoUnidad":"ml",
  		"Costo": 10,
  		"Nombre": "Tomate"
  	}
  ]
}
*/

/*
Estructura Body -> Crear
{

  "ImgURL": "https://live.mrf.io/statics/i/ps/irecetasfaciles.com/wp-content/uploads/2019/08/pizza-de-jamon-queso-y-tocino.jpg?width=1200&enable=upscale",
  "Precio": 65,
  "Tamano": "Grande",
  "Nombre": "Pizza 3 Quesos",
  "ListaIngredientes":
  [
    {
      "IdIngrediente":"PGVhUoHrbLGLr080Euu6",
      "Cantidad": 200
    }
  ]
}
*/

async function crearProducto(miProd) 
{
  var elcosto = 0;
  var nuevaListaIng = []
  for await (const ing of miProd.ListaIngredientes)
  {

    var elem = await fnElemento.obtenerElementoId(ing.IdIngrediente);
    var costoArt = parseFloat(ing.Cantidad) *(parseFloat(elem.CostoMedia)/parseFloat(elem.CantidadMedida));
    var faltante = {
      "TipoUnidad":elem.TipoUnidad,
      "Costo": costoArt,
      "Nombre": elem.Nombre
    }
    var articulo = Object.assign(ing, faltante);
    console.log("Articulo: ",articulo);
    nuevaListaIng.push(articulo);
    elcosto =elcosto + costoArt;
    console.log("Costo: ",elcosto)

  }
    console.log("CostoFuera: ",elcosto);
    var nuevoProd = {

      "ImgURL": miProd.ImgURL,
      "Precio": miProd.Precio,
      "Costo": elcosto,
      "Tamano": miProd.Tamano,
      "Nombre": miProd.Nombre,
      "ListaIngredientes":nuevaListaIng
    }
  await producto.add(nuevoProd);
  return nuevoProd;
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

