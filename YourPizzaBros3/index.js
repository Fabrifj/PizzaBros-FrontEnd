//const firestore = require('firebase/firestore')
const express = require('express');
const cors = require('cors');
const { query } = require('express');
const { compra } = require('./config');
database = require('./config');
//const ingrediente = database.ingrediente;
const producto = database.producto;
const cliente = database.cliente;
const pedido = database.pedido;
const firebase = database.firebase;
const categoria = database.categoria;
const elemento = database.elemento;

const app = express();
app.use(express.json());
app.use(cors());

/*
app.post("/api/ingrediente", async (req, res) => {
  const data = req.body
  console.log("Info Ingredientes ", data)
  await ingrediente.add(data)
  res.send({ msg: "Ingrediente added" })
})

//ObtenerIngredientes
async function obtenerIngredientes() {
  const snapshot = await ingrediente.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}
app.get("/api/ingredientes", async (req, res) => {
  const list = await obtenerIngredientes();
  res.send(list);
});

//ObtenerIngredienteNombre
async function obtenerIngredienteNombre(nombreIng) {

  let query = await ingrediente.where('Nombre', '==', nombreIng);
  let querySnapshot = await query.get();
  let respuesta = null;

  if (querySnapshot.empty) {
    console.log(`No encontramos al Ingrediente: ${nombreIng}`);

  } else {
    console.log('Encontramos al ingrediente: ', nombreIng);
    const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    respuesta = list
  }
  return respuesta;
}
app.get("/api/ingrediente/:nombre", async (req, res) => {
  var nombreIng = req.params.nombre
  var respuesta = await obtenerIngredienteNombre(nombreIng);
  res.send(respuesta);
});

//Actualizar Ingrediente
app.put("/api/ingrediente/:nombre", async (req, res) =>{
  var nombreIng = req.params.nombre
  var data = req.params.body

  // data = {data}
  const ref = await bien.where('Nombre', '==', nombreIng).set(data, { merge: true });
  res.send({ msg: "Ingrediente actualizado" })
})

*/

/*===================================
          CRUD PRODUCTOS
//===================================*/

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
//El body que se debe mandar:
/*
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

    var elem = await obetenerElementoId(ing.IdIngrediente);
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

app.post("/api/producto", async (req, res) => {
  var miProd = req.body;
  var nuevoProd = await crearProducto(miProd);
  res.send({ msg: "Producto agregado correctamente", "Producto": nuevoProd });
});

//ObtenerProductos  
async function obtenerProductos() {
  const snapshot = await producto.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}
app.get("/api/productos", async (req, res) => {
  const list = await obtenerProductos();
  res.send(list);
});

//ObtenerProductoId
async function obtenerProductoId(prd) {
  let respuesta = null;
  await producto.doc(prd).get().then(snapshot => {
    let querySnapshot = snapshot.data()
    console.log(querySnapshot)
    if (typeof querySnapshot == 'undefined' || querySnapshot.empty || querySnapshot == null) {
      console.log(`No encontramos el producto con Id: ${prd}`);

    } else {
      console.log('Encontramos al producto: ', prd);
      respuesta = querySnapshot
    }
  })
  return respuesta;
}
app.get("/api/producto/Id/:id", async (req, res) => {
  var prd = req.params.id
  var respuesta = await obtenerProductoId(prd);

  res.send(respuesta);
});

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
app.get("/api/producto/Nombre/:nombre", async (req, res) => {
  var prd = req.params.nombre
  var respuesta = await obtenerProductoNombre(prd);
  res.send(respuesta);
});

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

app.delete("/api/producto/:id", async (req, res) => {
  var prod = req.params.id;
  const resp = await eliminarProducto(prod);
  res.send(resp);
});

//ActualizarProducto
async function actualizarProducto(idProd, prod) {
  
  var resp = null;
  await producto.doc(idProd).update(prod)
  .then(() => 
  {
    resp = prod;  
    console.log("Producto successfully updated!");
  })
  .catch((error) => 
  {
      // The document probably doesn't exist.
      console.error("Error updating producto: ", error);
  });

  return resp;
}
app.put("/api/producto/:id", async (req, res) => {
  var prodid = req.params.id;
  var prod = req.body;
  const resp = await actualizarProducto(prodid,prod);
  res.send(resp);
});
//AgregarIngredienteAProducto
//El body es:
/*
[
  {
    "IdIngrediente":"ANICBIWBCIE",
    "Cantidad": 500,
    
  }
]
{
  		"IdIngrediente":"ANICBIWBCIE",
  		"Cantidad": 500,
  		"TipoUnidad":"ml",
  		"Costo": 10,
  		"Nombre": "Tomate"
  	}

*/


async function agregarIngredientesAProducto(idProd, body) {
  var miProd = await obtenerProductoId(idProd);
  
    for await (const ing of body)
  {
    var elem = await obetenerElementoId(ing.IdIngrediente);
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
app.put("/api/producto/:id/agregarIng", async (req, res) => {
  var prodid = req.params.id;
  var body = req.body;
  const resp = await agregarIngredientesAProducto(prodid,body);
  res.send(resp);
});

/*===================================
          CRUD CLIENTES
//===================================*/
//CrearCliente
async function crearCliente(data) {
  const nit = data.NIT
  var respuesta = null;
  var resp = null;
  let query = cliente.where('NIT', '==', nit);
  let querySnapshot = await query.get();

  if (querySnapshot.empty) {
    console.log(`No encontramos al NIT: ${nit}, lo creamos`);
    await cliente.add(data)
    resp = data

  } else {
    console.log('Encontramos al NIT: ', nit);
    querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    querySnapshot.docs.forEach(documentSnapshot => {

      console.log(`Found document at ${documentSnapshot.id}`);

    });
    if (querySnapshot.length = 1) {
      console.log("querySnapshot: ", querySnapshot.docs[0].data());
      if (querySnapshot.docs[0].data().Nombre == data.Nombre) {
        console.log("SI ES LA MISMA PERSONA");
        resp = querySnapshot.docs[0].data();
      }
    }


  }

  return resp;
}
app.post("/api/cliente", async (req, res) => {
  const data = req.body
  const respuesta = await crearCliente(data);
  console.log(respuesta);
  res.send(respuesta)
})

//ObtenerClientes
async function obtenerClientes() {
  const snapshot = await cliente.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}
app.get("/api/clientes", async (req, res) => {
  const list = await obtenerClientes();
  res.send(list);
});

//ObtenerClienteNit
async function obtenerClienteNit(nitCliente) {

  nitCliente = parseInt(nitCliente, 10);
  let query = await cliente.where('NIT', '==', nitCliente);
  let querySnapshot = await query.get();
  let respuesta = null;

  if (querySnapshot.empty) {
    console.log(`No encontramos al cliente con nit: ${nitCliente}`);

  } else {
    console.log('Encontramos al nit: ', nitCliente);
    respuesta = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  }
  return respuesta;
}
app.get("/api/cliente/:nit", async (req, res) => {
  var nitCliente = req.params.nit
  var respuesta = await obtenerClienteNit(nitCliente);
  res.send(respuesta);
});

/*===================================
          CRUD CATEGORIA
//===================================*/

//CrearCategoria
//Body del request:
/*
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

app.post("/api/categoria", async (req, res) => {
  var miCategoria = req.body;
  await categoria.add(miCategoria)
  res.send({ msg: "Categoria agregada correctamente", "Producto": miCategoria });
});

//ObtenerCategorias
async function obtenerCategorias() {
  const snapshot = await categoria.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}
app.get("/api/categorias", async (req, res) => {
  const list = await obtenerCategorias();
  res.send(list);
});


//ObtenerCategoriaNombre
async function obtenerCategoriaNombre(prd) {
  let query = await categoria.where('Nombre', '==', prd);
  let querySnapshot = await query.get();
  let respuesta = null;

  if (querySnapshot.empty) {
    console.log(`No encontramos la categoria con nombre: ${prd}`);

  } else {
    console.log('Encontramos a la categoria: ', prd);
    respuesta = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return respuesta;
}
app.get("/api/categoria/:nombre", async (req, res) => {
  var prd = req.params.nombre;
  var respuesta = await obtenerCategoriaNombre(prd);
  res.send(respuesta);
});

//EliminarCategoria
async function eliminarCategoria(idCat) {
  
  var resp = null;
  await categoria.doc(idCat).delete().then(() => {
    resp = "Categoria successfully deleted!"
    console.log(resp);
  }).catch((error) => 
  {
    console.error("Error removing document: ", error);
  });

  return resp;
}

app.delete("/api/categoria/:id", async (req, res) => {
  var cat = req.params.id;
  const resp = await eliminarCategoria(cat);
  res.send(resp);
});

//ActualizarCategoria
//Body a mandar para actualizar:
/*
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
  
  var resp = null;
  await categoria.doc(idCat).update(cat)
  .then(() => 
  {
    resp = cat;  
    console.log("Categoria successfully updated!");
  })
  .catch((error) => 
  {
      // The document probably doesn't exist.
      console.error("Error updating categoria: ", error);
  });

  return resp;
}
app.put("/api/categoria/:id", async (req, res) => {
  var catid = req.params.id;
  var cat = req.body;
  const resp = await actualizarCategoria(catid,cat);
  res.send(resp);
});

/*===================================
          CRUD PEDIDOS
//===================================*/

//CrearPedido
/*
  Para el siguiente post es necesaria la siguiente estructura en el requestbody:
  {
    "Fecha": "2019-01-02T10:12:04",
    "Detalle": 
    [
      {
        "Id":"xHsRl949N5aptvF0M7vt",
        "Cantidad":2
      }
    ],
    "Cliente":
    {
      "Nombre":"Lopez",
      "NIT": 4488
    },
    
    "IdEmpleado":"ABCRl949N5aptvF0M7vt",
    "Estado":"Entregado"
  }
*/
app.post("/api/pedido", async (req, res) => {
  console.log('hola')
  const data = req.body
  //buscamos todos los productos de la lista
  var misProds = []
  var precioTotal = 0;
  data.Detalle.forEach(
    async (prd) => {

      //Verificamos si existen los productos y creamos la lista de productos a ingresar
      await producto.doc(prd.IdProducto).get().then(snapshot => {
        let querySnapshot = snapshot.data()
        console.log(querySnapshot)
        if (typeof querySnapshot == 'undefined' || querySnapshot.empty || querySnapshot == null) {
          console.log(`No encontramos el producto con Id: ${prd.IdProducto}`);

        } else {
          console.log('Encontramos al producto: ', prd.IdProducto);
          var miProd = {
            "Cantidad": prd.Cantidad,
            "Id": prd.Id,
            "Nombre": querySnapshot.Nombre,
            "Precio": (parseInt(prd.Cantidad, 10) * Number(querySnapshot.Precio))
          }
          misProds.push(miProd);
          precioTotal = precioTotal + Number(miProd.Precio);

        }
      })
    }

  );
  //Verificamos si el cliente que nos pasan esta ya registrado, si no lo esta, lo registramos
  const nit = data.Cliente.NIT;
  const nombre = data.Cliente.Nombre;
  var respuesta = null;
  const dataCliente =
  {
    "NIT": parseInt(nit, 10),
    "Nombre": nombre
  }

  var miCliente = await crearCliente(dataCliente)
  if (miCliente != null) {
    var newPedido =
    {
      "Fecha": firebase.firestore.Timestamp.fromDate(new Date(data.Fecha)),
      "Detalle": misProds,
      "NITCliente": parseInt(nit, 10),
      "NombreCliente": nombre,
      "IdEmpleado": data.IdEmpleado,
      "Precio": precioTotal,
      "Estado": data.Estado

    };
    console.log("Pedido: ", newPedido);
    await pedido.add(newPedido)
    respuesta = { msg: "Pedido added", "Pedido": newPedido }
  }
  else {
    console.log(`Ya existe una un cliente registrado con el NIT ${nit} pero no el nombre ${nombre}`);
  }

  res.send(respuesta)
})

async function crearPedidoEstado(idPedido, estado) {
  let respuesta = null;
  await pedido.doc(idPedido).get().then(snapshot => {
    let querySnapshot = snapshot.data()
    console.log(querySnapshot)
    if (typeof querySnapshot == 'undefined' || querySnapshot.empty || querySnapshot == null) {
      console.log(`No encontramos el pedido con Id: ${idPedido}`);

    } else {
      console.log('Encontramos al pedido: ', idPedido);
      var a = pedido.doc(idPedido).update({ "Estado": estado });
      querySnapshot.Estado = estado;




      respuesta = querySnapshot;
    }
  })
  return respuesta;
}

app.post("/api/pedidoEstado", async (req, res) => {
  console.log("entro api 1");
  var idPedido = req.body.IdPedido;
  var estado = req.body.Estado;

  var respuesta = await crearPedidoEstado(idPedido, estado);
  res.send(respuesta);
});

//ObtenerPedidos
async function obtenerPedidos() {
  const snapshot = await pedido.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}
app.get("/api/pedidos", async (req, res) => {
  const list = await obtenerPedidos();
  res.send(list);
});

//ObtenerPedidos2Fechas
async function obtenerPedidos2Fechas(start, end) {
  console.log("start:", start);
  console.log("end", end);

  var respuesta = null;

  var inicio = firebase.firestore.Timestamp.fromDate(new Date(start));
  var final = firebase.firestore.Timestamp.fromDate(new Date(end));
  console.log("start:", inicio);
  console.log("end", final);
  let query = await pedido.where('Fecha', '>=', inicio).where('Fecha', '<=', final);
  let querySnapshot = await query.get();

  if (querySnapshot.empty) {
    console.log(`No encontramos pedidos entre esas fechas ${start} - ${end}`);

  } else {
    console.log(`Encontramos pedidos entre las fechas ${start} - ${end} `);
    respuesta = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }


  console.log("ListaFechas", respuesta);
  return respuesta;
}
/*
{
  "Inicio":"2020-01-01T12:01:18",
  "Final":"2020-07-12T12:06:00"
}

*/
app.get("/api/pedidos2Fechas/:inicio/:final", async (req, res) => {
  var inicio = req.params.inicio;
  var final = req.params.final;
  console.log("inicio:", inicio);
  console.log("final:", final);
  var respuesta = await obtenerPedidos2Fechas(inicio, final);
  res.send(respuesta);
});
/*//YA NO SIRVE, SOLO PARAMETROS DEL ENDPOINT
{
  "Inicio":"2020-01-01T12:01:18",
  "Final":"2020-07-12T12:06:00",
  "NITCliente": 123456
}

*/
async function obtenerPedidos2FechasNITCliente(start, end, NITCliente) {
  console.log("start:", start);
  console.log("end", end);

  var respuesta = null;

  var inicio = firebase.firestore.Timestamp.fromDate(new Date(start));
  var final = firebase.firestore.Timestamp.fromDate(new Date(end));
  console.log("start:", inicio);
  console.log("end", final);
  NITCliente = parseInt(NITCliente, 10);

  let query = await pedido.where('NITCliente', '==', NITCliente).where('Fecha', '>=', inicio).where('Fecha', '<=', final);
  let querySnapshot = await query.get();

  if (querySnapshot.empty) {
    console.log(`No encontramos pedidos entre esas fechas ${start} - ${end} del cliente NIT: ${NITCliente}`);

  } else {
    console.log(`Encontramos pedidos entre las fechas ${start} - ${end} del cliente NIT: ${NITCliente}`);
    respuesta = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }


  console.log("ListaFechas", respuesta);
  return respuesta;
}

app.get("/api/pedidos2FechasNITCliente/:inicio/:final/:nit", async (req, res) => {
  var inicio = req.params.inicio;
  var final = req.params.final;
  var nitCliente = req.params.nit;
  console.log("inicio:", inicio);
  console.log("final:", final);
  var respuesta = await obtenerPedidos2FechasNITCliente(inicio, final, nitCliente);
  res.send(respuesta);
});

//CrearPedidoEstado
/*
  {
    "IdPedido": "NXp6KInuGOHtoJWv9cnN",
    "Estado":"Entregado"
  }
  */

//ObtenerPedidosEstado Obtener los pedidos segun su estado
async function obtenerPedidosEstado(estado) {
  const snapshot = await pedido.where('Estado', '==', estado).get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}
app.get("/api/pedidosEstado/:estado", async (req, res) => {
  var estado = req.params.estado;
  const list = await obtenerPedidosEstado(estado);
  res.send(list);
});
/*//YA NO SIRVE, SOLO PARAMETROS DEL ENDPOINT
  {
    "Fecha":"2020-07-12T12:06:00",
    "NITCliente": 123456
  }
  */
async function obtenerPedidoFechaNIT(fecha, nitCliente) {
  fecha = firebase.firestore.Timestamp.fromDate(new Date(fecha));
  const snapshot = await pedido.where('Fecha', '==', fecha).where('NITCliente', '==', nitCliente).get();
  var list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  if (list.length < 1) {
    list = null;
  }
  return list;
}
app.get("/api/pedidoFechaNIT/:fecha/:nit", async (req, res) => {
  var fecha = req.params.fecha;
  var nitCliente = req.params.nit;
  const list = await obtenerPedidoFechaNIT(fecha, nitCliente);
  res.send(list);
});

//GetPedidosCliente
async function obtenerPedidosCliente(nitCliente) {
  console.log("NIT CLIENTE: ", nitCliente);
  const snapshot = await pedido.where('NITCliente', '==', parseInt(nitCliente, 10)).get();
  var list = await snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(list);
  if (list.length < 1) {
    list = null;
  }
  return list;

}
app.get("/api/pedidosCliente/nit/:nit", async (req, res) => {
  var nitCliente = req.params.nit;
  const list = await obtenerPedidosCliente(nitCliente);


  res.send(list);
});

//CONSULTAR ANDY
//GetPedidosCliente
async function getPedidosCliente(nitCliente) {
  console.log("NIT CLIENTE: ", nitCliente);
  const snapshot = await pedido.where('NITCliente', '==', parseInt(nitCliente, 10)).get();
  var list = await snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(list);
  if (list.length < 1) {
    list = null;
  }
  return list;

}
app.get("/api/getPedidosCliente/nit/:nit", async (req, res) => {
  var nitCliente = req.params.nit;
  const list = await getPedidosCliente(nitCliente);


  res.send(list);
});


/*===================================
          CRUD BIENES
//===================================*/

//CrearBien
//Formato del bien en el Body del request:
// {
//   "Cantidad": 5,
//   "Descripcion": "Objeto para tal cosa",
//   "Nombre": "Mesa",
//   "PrecioUnidad": 20,
//   "UnidadMedida": "Unidades"
// }

// app.post("/api/bien", async (req, res) => {
//   const data = req.body
//   console.log("Informacion del Bien ", data)
//   await bien.add(data)
//   res.send({ msg: "Bien agregado" })
// })

// //ObtenerBien
// async function obtenerBien() {
//   const snapshot = await bien.get();
//   const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   return list;
// }
// app.get("/api/bienes", async (req, res) => {
//   const list = await obtenerBien();
//   res.send(list);
// });

// //ObtenerBienNombre
// async function obtenerBienNombre(nombreBien) {

//   let query = await bien.where('Nombre', '==', nombreBien);
//   let querySnapshot = await query.get();
//   let respuesta = null;

//   if (querySnapshot.empty) {
//     console.log(`No encontramos el Bien: ${nombreBien}`);

//   } else {
//     console.log('Encontramos el Bien: ', nombreBien);
//     const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     respuesta = list
//   }
//   return respuesta;
// }
// app.get("/api/bien/:nombre", async (req, res) => {
//   var nombreBien = req.params.nombre
//   var respuesta = await obtenerBienNombre(nombreBien);
//   res.send(respuesta);
// });


// //Actualizar Bien
// app.put("/api/bien/:nombre", async (req, res) =>{
//   var nombreBien = req.params.nombre
//   var data = req.params.body

//   // data = {data}
//   const ref = await bien.where('Nombre', '==', nombreBien).set(data, { merge: true });
//   res.send({ msg: "Bien actualizado" })
// })

/*===================================
          CRUD ELEMENTO
//===================================*/

//CrearElemento desde cero con 1 compra
/*
{
	"Nombre": "Salsa Tomate",
	"TipoUnidad": "ml",
	"ListaArticulos":
	[
		{
			"Marca":Salsa de Tomate Maggi",
			"Costo":15,
			"CantidadMedida":500
		}
	],
	"CantidadInventario":1000,//cantidad de salsa en el inventario medida en ml
	"CostoMedia":15,//Media de los costos de la listaArticulos
  "CantidadMedida":500
	"Tipo":"Ingrediente"
}
*/
app.post("/api/elemento", async (req, res) => {
  const data = req.body
  console.log("Info Elemento", data)
  await elemento.add(data)
  res.send({ msg: "Elemento anadido" })
})
//ObtenerElementos
async function obtenerElementos() {
  const snapshot = await elemento.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}

app.get("/api/elemento", async (req, res) => {
  const list = await obtenerElementos();
  res.send(list);
});

//ObtenerIngredientes
async function obtenerIngredientes() {
  const snapshot = await elemento.where('Tipo','==','Ingrediente').get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}
app.get("/api/ingrediente", async (req, res) => {
  const list = await obtenerIngredientes();
  res.send(list);
});

//ObtenerBienes
async function obtenerBienes() {
  const snapshot = await elemento.where('Tipo','==','Bien').get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}
app.get("/api/bien", async (req, res) => {
  const list = await obtenerBienes();
  res.send(list);
});

//EliminarElemento
async function eliminarElemento(idEl) {
  
  var resp = null;
  await elemento.doc(idEl).delete().then(() => {
    resp = "Elemento borrado correctamente!"
    console.log(resp);
  }).catch((error) => 
  {
    console.error("Error eliminando elemento: ", error);
  });

  return resp;
}
app.delete("/api/elemento/:id", async (req, res) => {
  var el = req.params.id;
  const resp = await eliminarElemento(el);
  res.send(resp);
});
//Body para actualizar elemento, borrar los comentarios
/*
{
	"Nombre": "Salsa Tomate",
	"TipoUnidad": "ml",
	"ListaArticulos":
	[
		{
			"Marca":Salsa de Tomate Maggi",
			"Costo":15,
			"CantidadMedida":500
		},
	]
  "CantidadMedida":500
	"CantidadInventario":1000,//cantidad de salsa en el inventario medida en ml
	"CostoMedia":15,//Media de los costos de la listaArticulos
	"Tipo":"Ingrediente" //Puede ser Ingrediente o Bien
}

*/
async function actualizarElemento(idEl, el) {
  
  var resp = null;
  await elemento.doc(idEl).update(el)
  .then(() => 
  {
    resp = el;  
    console.log("Categoria successfully updated!");
  })
  .catch((error) => 
  {
      // The document probably doesn't exist.
      console.error("Error updating categoria: ", error);
  });

  return resp;
};
app.put("/api/elemento/:id", async (req, res) => {
  var elid = req.params.id;
  var el = req.body;
  const resp = await actualizarElemento(elid,el);
  res.send(resp);
});
//ObetenerElementoById
async function obetenerElementoId(elid) 
{
  var resp = null;
  await elemento.doc(elid).get().then((doc) => {
    if (doc.exists) {
      resp = { id: doc.id, ...doc.data() }  
      console.log("Data de Elemento:", doc.data());
    } else {
        
        console.log("Elemento no existe");
    }
  }).catch((error) => 
  {
      console.log("Error getting document:", error);
  });

  return resp;
}

app.get("/api/elemento/:id", async (req, res) => {
  var elid = req.params.id;
  const resp = await obetenerElementoId(elid);
  res.send(resp);
});

//ActualizarElemAgregarInv sirve para agregar cantidad al inventario de un elemento
//El Body para el endpoint es:
/*
{
	"Marca":"Salsa de Tomate Flor",
	"Costo":20,
	"CantidadMedida":800,
	"CantidadComprada":3
}
*/
async function actualizarElemAgregarInv(elid,mibody) 
{
  var resp = null;
  await elemento.doc(elid).get().then(async (doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
        var costoSum = 0;
        var costoMedia = 0;
        var data = doc.data();
        var articulos = data.ListaArticulos;
        var artEncontrado = false;
        var infoUpdate = null;
        var cantInv=parseFloat(data.CantidadInventario)+ parseInt(mibody.CantidadComprada,10) * parseFloat(mibody.CantidadMedida);
        var newArt = {
          "Marca": mibody.Marca,
          "Costo": mibody.Costo,
          "CantidadMedida":mibody.CantidadMedida
        }
        if(articulos.length >0)
        {
          articulos.forEach(
            async (art) => 
            {
              costoSum += parseFloat(data.CantidadMedida)*(parseFloat(art.Costo)/parseFloat(art.CantidadMedida));
              if(mibody.Marca == art.Marca && mibody.Costo == art.Costo && mibody.CantidadMedida && art.CantidadMedida)
              {
                  artEncontrado = true;
              }
            }
            
        
          );
          
          costoMedia = (costoSum + parseFloat(data.CantidadMedida)*(parseFloat(mibody.Costo)/parseFloat(mibody.CantidadMedida)))/(articulos.length+1);
          if(artEncontrado)
          {
            infoUpdate = {
              "CostoMedia":costoMedia,
              "CantidadInventario": cantInv
            }
          }
          else
          {
            articulos.push(newArt);
            infoUpdate = {
              "CostoMedia":costoMedia,
              "ListaArticulos":articulos,
              "CantidadInventario": cantInv
            }
          }

          
        }
        else
        {
          infoUpdate = {
            "CostoMedia":parseFloat(mibody.Costo),
            "ListaArticulos":[newArt],
            "CantidadInventario": cantInv
          }
        }
        await elemento.doc(elid).update(infoUpdate)
          .then(() => 
          {
            resp = "Inventario y articulos de elemento updated!";
            console.log("Inventario y articulos de elemento updated!");
          })
          .catch((error) => 
          {
              // The document probably doesn't exist.
              console.error("Error updating elemento: ", error);
          });
        
    } else {
        
        console.log("Elemento no existe");
    }
  }).catch((error) => 
  {
      console.log("Error getting document:", error);
  });
  return resp;
}

app.put("/api/elemento/:id/agregarInv", async (req, res) => {
  var elid = req.params.id;
  var mibody = req.body;
  const resp = await actualizarElemAgregarInv(elid,mibody);
  res.send(resp);
});




/*===================================
          CRUD COMPRA
===================================*/

/* 
Estructura del body para la creacion de una compra
{
    "Fecha":"2021-02-14T",
    "Total":60,
    "ListaElementos":
    [
        {
            "IdElemento":"1",
            "Marca":"Salsa de Tomate Flor",
            "TipoUnidad":"ml",
            "CantidadMedida":500,
            "CostoUnidad":15,
            "CantidadComprada":2,
            "Tipo": "Ingrediente",
            "Nombre": "Salsa de Tomate"
        },
        {
            "IdElemento":"2",
            "Marca":"Harina BlancaFlor",
            "TipoUnidad":"kg",
            "CantidadMedida":0.5,
            "CostoUnidad":10,
            "CantidadComprada":3,
            "Tipo": "Ingrediente",
            "Nombre:" "Salsa de Tomate"
        }
    ]
}
*/

// Crear una compra
async function CrearElem(elem){
  await elemento.add(elem);
} 

app.post("/api/compra", async (req, res) => {
  const data = req.body;

  const fecha = data.Fecha;
  const total = data.Total;

  var misElems = [];
  var msg = {};
  // Iteramos por todos los elementos dentro de la lista de elementos
  data.ListaElementos.forEach(
    async (elem) => {
      //Creacion del objeto elemento necesario para la creacion de la base de datos
      var elemBD = {
        "IdElemento": elem.IdElemento,
        "Marca": elem.Marca,
        "TipoUnidad": elem.TipoUnidad,
        "CantidadMedida": elem.CantidadMedida,
        "CostoUnidad": elem.CostoUnidad,
        "CantidadComprada": elem.CantidadComprada
      }
      misElems.push(elemBD);
      //console.log("Elementos a ingresar dentro de compra en la BD: ", misElems);

      // Creacion de la compra individual
      var nuevaCompraIndividual = {
        "Tipo":"Individual",
        "Fecha": firebase.firestore.Timestamp.fromDate(new Date(fecha)),
        "Total": total,
        "CostoUnidad": elem.CostoUnidad,
        "CantidadComprada": elem.CantidadComprada,
        "TipoUnidad": elem.TipoUnidad,
        "CantidadMedida": elem.CantidadMedida,
        "IdElemento": elem.IdElemento
      }

      console.log("Nueva compra individual a ingresar en la base de datos: ", nuevaCompraIndividual);
      await compra.add(nuevaCompraIndividual);
      console.log("Compra individual agregada");
      msg["Compra Individual"] = nuevaCompraIndividual;


      // Verificacion de la existencia del elemento dentro de la base de datos
      await elemento.doc(elem.IdElemento).get().then(snapshot => {
        let querySnapshot = snapshot.data();
        //console.log("Resultado de la consulta: ", querySnapshot);
          
        if (typeof querySnapshot == 'undefined' || querySnapshot.empty || querySnapshot == null){
          console.log(`elemento con el id: ${elem.IdElemento} no encontrado en la base de datos`);
          // formato del elemento
          var cantInventario = elem.CantidadMedida * elem.CantidadComprada;
          var miElem = {
            "Nombre": elem.Nombre,
            "Tipounidad": elem.TipoUnidad,
            "ListaArticulos":
            [
                {
                    "Marca": elem.Marca,
                    "Costo": elem.CostoUnidad,
                    "CantidadMedida": elem.CantidadMedida
                }
            ],
            "CantidadInventario": cantInventario,
            "CostoMedia": elem.CostoUnidad,
            "Tipo": elem.Tipo
          }
          //console.log("En caso de que el elemento no este creado: ", miElem);

          // Creacion del elemento con la funcion de Gaby
          
          CrearElem(miElem);
        } else {
          // Dado que el elemento existe se capturara los nuevos datos que el elemento
          // trae con la compra
          console.log("Elemento encontrado: ", elem.IdElemento);

          var miElem = {
            "Marca": elem.Marca,
            "CantidadMedida": elem.CantidadMedida,
            "Costo": elem.CostoUnidad,
            "CantidadComprada": elem.CantidadComprada      
          }
          //console.log("En caso de que el elemento este creado: ", miElem);

          // Actualizacion del elemento mediante la funcion de Gaby
          actualizarElemAgregarInv(elem.IdElemento,miElem);

        }
      })
    }
  )
  var respuesta = null;

  // Creacion de la compra de tipo grupal
  var nuevaCompraGrupal = {
    "Tipo": "Grupal",
    "Fecha": firebase.firestore.Timestamp.fromDate(new Date(fecha)),
    "Total": total,
    "ListaElementos": misElems
  }
  console.log("Nueva compra grupal a ingresar en la base de datos: ", nuevaCompraGrupal);
  await compra.add(nuevaCompraGrupal);
  console.log("Compra grupal agregada");
  msg["CompraGrupal"] = nuevaCompraGrupal;

  respuesta = msg;
  res.send(respuesta);
})


//Obtener todas las compras
async function obtenerCompras(){
  const snapshot = await compra.get();
  const list = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return list;
}

app.get("/api/compras", async (req, res) => {
  const lista = await obtenerCompras();
  res.send(lista);
})

// Obtener compra mediante su ID
async function obetenerCompraId(compraId) 
{
  var resp = null;
  await compra.doc(compraId).get().then((doc) => {
    if (doc.exists) {
      resp = { id: doc.id, ...doc.data() }  
      console.log("Informacion de la compra:", doc.data());
    } else {
      console.log("La compra no existe");
    }
  }).catch((error) => 
  {
      console.log("Error getting document:", error);
  });

  return resp;
}

app.get("/api/compra/:id", async (req, res) => {
  var compraId = req.params.id;
  const resp = await obetenerCompraId(compraId);
  res.send(resp);
});


// Actualizar compra
async function actualizarCompra(compraId, cmp) {
  
  var resp = null;
  await compra.doc(compraId).update(cmp)
  .then(() => 
  {
    resp = cmp;  
    console.log("Compra actualizada");
  })
  .catch((error) => 
  {
      // The document probably doesn't exist.
      console.error("Error al actualizar la compra: ", error);
  });

  return resp;
};

app.put("/api/compra/:id", async (req, res) => {
  var compraId = req.params.id;
  var cmp = req.body;
  const resp = await actualizarCompra(compraId,cmp);
  res.send(resp);
});


// Eliminar Compra
async function eliminarCompra(compraId) {
  var resp = null;
  await compra.doc(compraId).delete().then(() => {
    resp = "Compra borrada correctamente!"
    console.log(resp);
  }).catch((error) => 
  {
    console.error("Error eliminando la compra: ", error);
  });

  return resp;
}

app.delete("/api/compra/:id", async (req, res) => {
  var compraId = req.params.id;
  const resp = await eliminarCompra(compraId);
  res.send(resp);
});

///////
app.listen(4000, () => console.log("Up and Running on 4000"));
