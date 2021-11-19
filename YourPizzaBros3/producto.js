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

//EliminarProducto
async function eliminarProducto(idProd) {
  
  var resp = null;
  await producto.doc(idProd).delete().then(() => {
    resp = "Producto successfully deleted!"
    console.log(resp);
  }).catch((error) => 
  {
    console.error("Error removing document: ", error);
  });
  return resp;
}

async function actualizarProducto(idProd, prod) {  
  var resp = null;
  await producto.doc(idProd).update(prod)
  .then(() => 
  {
    resp = prod;  
    console.log("Producto actualizado correctamente");
  })
  .catch((error) => 
  {
      // The document probably doesn't exist.
      console.error("Error updating producto: ", error);
  });
  return resp;
}



/*
Estructura Body -> Actualizar

  [
    {
      "IdIngrediente":"ANICBIWBCIE",
      "Cantidad": 500,
    }
  ]

*/

async function agregarIngredientesAProducto(idProd, body) {
  var miProd = await obtenerProductoId(idProd);
  
    for await (const ing of body)
  {
    var elem = await fnElemento.obtenerElementoId(ing.IdIngrediente);
    let obj = miProd.ListaIngredientes.find(f=>f.IdIngrediente==ing.IdIngrediente);
    if(obj)
    {
      var costoArt = parseFloat(obj.Cantidad) *(parseFloat(elem.CostoMedia)/parseFloat(elem.CantidadMedida));
      miProd.Costo += costoArt;
      var nuevoCosto = parseFloat(obj.Costo)+ costoArt; 
      obj.Costo=nuevoCosto;
      console.log("nuevoCosto: ",nuevoCosto);
      obj.Cantidad = parseFloat(obj.Cantidad) + parseFloat(ing.Cantidad);
      console.log("obj.Catidad: ",obj.Catidad);
      console.log("miProd.ListaIngredientes" ,miProd.ListaIngredientes);

    }
    else
    {
      var costoArt = parseFloat(ing.Cantidad) *(parseFloat(elem.CostoMedia)/parseFloat(elem.CantidadMedida));
      var faltante = {
        "TipoUnidad":elem.TipoUnidad,
        "Costo": costoArt,
        "Nombre": elem.Nombre
      }
      var articulo = Object.assign(ing, faltante);
      console.log("Articulo: ",articulo);
      miProd.ListaIngredientes.push(articulo);
      miProd.Costo += costoArt;
    }
  }

  var resp = null;
  await producto.doc(idProd).update(miProd)
  .then(() => 
  {
    resp = miProd;  
    console.log("Producto successfully updated!");
  })
  .catch((error) => 
  {
      // The document probably doesn't exist.
      console.error("Error updating producto: ", error);
  });
  return resp;
}


module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoId,
  obtenerProductoNombre, 
  eliminarProducto,
  actualizarProducto,
  agregarIngredientesAProducto
};

