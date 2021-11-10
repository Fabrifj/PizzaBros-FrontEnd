

//const firestore = require('firebase/firestore')
const express = require('express')
const cors = require('cors');
const { query } = require('express');

database = require('./config')
const ingrediente = database.ingrediente;
const producto = database.producto;
const categoria = database.categoria;
const cliente = database.cliente;
const pedido = database.pedido;
const bien = database.bien;
const firebase = database.firebase;

//const { async } = require('@firebase/util')
const app = express()
app.use(express.json())
app.use(cors())

/*===================================
          CRUD INGREDIENTES
//===================================*/

//CrearIngrediente
//Formato del ingrediente en el Body del request:
// {
//   "Cantidad": 5,
//   "CostoUnidad": 10,
//   "Nombre": "Lechuga",
//   "Proveedor": "348887",
//   "UnidadMedida": "Kg."
// }

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

/*===================================
          CRUD PRODUCTOS
//===================================*/

//CrearProducto estructura:
// {
    
//   "ImgURL": "https://live.mrf.io/statics/i/ps/irecetasfaciles.com/wp-content/uploads/2019/08/pizza-de-jamon-queso-y-tocino.jpg?width=1200&enable=upscale",
//   "Precio": 65,
//   "Costo": 50,
//   "Tamano": "Grande",
//   "Nombre": "Pizza 3 Quesos"
// }
app.post("/api/producto", async (req, res) => {
  var miProducto = req.body;
  await producto.add(miProducto)
  res.send({msg:"Producto agregado correctamente","Producto":miProducto});
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

app.get("/api/categoria/:nombre/productos", async (req, res) => {
  var cat = req.params.nombre
  var respuesta = await obtenerProductosCategoriaNombre(cat);
  res.send(respuesta);
});
//Obtener productos por nombre de categoria
async function obtenerProductosCategoriaNombre(Cat){
  let query = await categoria.where('Nombre', '==', Cat);
  let querySnapshot = await query.get();
  let respuesta = null;

  if (querySnapshot.empty) {
    console.log(`No encontramos la categoria con nombre: ${Cat}`);

  } else {
    console.log('Encontramos a la categoria: ', Cat);
    respuesta = querySnapshot.docs.map((doc) => (doc.data().ListaProductos));
    respuesta = respuesta[0]
  }
  return respuesta;
}

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

async function crearPedidoEstado(idPedido,estado) {
  let respuesta = null;
  await pedido.doc(idPedido).get().then(snapshot => {
    let querySnapshot = snapshot.data()
    console.log(querySnapshot)
    if (typeof querySnapshot == 'undefined' || querySnapshot.empty || querySnapshot == null) {
      console.log(`No encontramos el pedido con Id: ${idPedido}`);

    } else {
      console.log('Encontramos al pedido: ', idPedido);
      var a = pedido.doc(idPedido).update({"Estado":estado});
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

  var respuesta = await crearPedidoEstado(idPedido,estado);
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
  const snapshot = await pedido.where('Estado','==',estado).get();
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
  const snapshot = await pedido.where('Fecha','==',fecha).where('NITCliente','==',nitCliente).get();
  var list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  if(list.length < 1)
  {
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
  console.log("NIT CLIENTE: ",nitCliente);
  const snapshot = await pedido.where('NITCliente','==',parseInt(nitCliente,10)).get();
  var list = await snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(list);
  if(list.length < 1)
  {
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
  console.log("NIT CLIENTE: ",nitCliente);
  const snapshot = await pedido.where('NITCliente','==',parseInt(nitCliente,10)).get();
  var list = await snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(list);
  if(list.length < 1)
  {
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

app.post("/api/bien", async (req, res) => {
  const data = req.body
  console.log("Informacion del Bien ", data)
  await bien.add(data)
  res.send({ msg: "Bien agregado" })
})

//ObtenerBien
async function obtenerBien() {
  const snapshot = await bien.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}
app.get("/api/bienes", async (req, res) => {
  const list = await obtenerBien();
  res.send(list);
});

//ObtenerBienNombre
async function obtenerBienNombre(nombreBien) {

  let query = await bien.where('Nombre', '==', nombreBien);
  let querySnapshot = await query.get();
  let respuesta = null;

  if (querySnapshot.empty) {
    console.log(`No encontramos el Bien: ${nombreBien}`);

  } else {
    console.log('Encontramos el Bien: ', nombreBien);
    const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    respuesta = list
  }
  return respuesta;
}
app.get("/api/bien/:nombre", async (req, res) => {
  var nombreBien = req.params.nombre
  var respuesta = await obtenerBienNombre(nombreBien);
  res.send(respuesta);
});

//Actualizar Bien
app.put("/api/bien/:nombre", async (req, res) =>{
  var nombreBien = req.params.nombre
  var data = req.params.body

  // data = {data}
  const ref = await bien.where('Nombre', '==', nombreBien).set(data, { merge: true });
  res.send({ msg: "Bien actualizado" })
})

/////////
app.listen(4000, () => console.log("Up and Running on 4000"));
