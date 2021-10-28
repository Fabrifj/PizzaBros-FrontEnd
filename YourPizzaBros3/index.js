

//const firestore = require('firebase/firestore')
const express = require('express')
const cors = require('cors');
const { query } = require('express');

database = require('./config')
const ingrediente = database.ingrediente;
const producto = database.producto;
const familia = database.familia;
const cliente = database.cliente;
const pedido = database.pedido;
const firebase = database.firebase;

//const { async } = require('@firebase/util')
const app = express()
app.use(express.json())
app.use(cors())

//GetIngredientes
async function getIngredientes() {
  const snapshot = await ingrediente.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}
app.get("/api/getIngredientes", async (req, res) => {
  const list = await getIngredientes();
  res.send(list);
});

//GetProductos  
async function getProductos() {
  const snapshot = await producto.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}
app.get("/api/getProductos", async (req, res) => {
  const list = await getProductos();
  res.send(list);
});

//GetClientes
async function getClientes() {
  const snapshot = await cliente.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}
app.get("/api/getClientes", async (req, res) => {
  const list = await getClientes();
  res.send(list);
});

//GetPedidos
async function getPedidos() {
  const snapshot = await pedido.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}
app.get("/api/getPedidos", async (req, res) => {
  const list = await getPedidos();
  res.send(list);
});

//PostIngrediente
//Formato del ingrediente en el Body del request:
// {
//   "Cantidad": 5,
//   "CostoUnidad": 10,
//   "Nombre": "Lechuga",
//   "Proveedor": "348887",
//   "UnidadMedida": "Kg."
// }

app.post("/api/postIngrediente", async (req, res) => {
  const data = req.body
  console.log("Info Ingredientes ", data)
  await ingrediente.add(data)
  res.send({ msg: "Ingrediente added" })
})

//PostCliente
async function postCliente(data) {
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
app.post("/api/postCliente", async (req, res) => {
  const data = req.body
  const respuesta = await postCliente(data);
  console.log(respuesta);
  res.send(respuesta)
})

//GetIngredienteByNombre
async function getIngredienteByNombre(nombreIng) {

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
app.get("/api/getIngrediente/:nombre", async (req, res) => {
  var nombreIng = req.params.nombre
  var respuesta = await getIngredienteByNombre(nombreIng);
  res.send(respuesta);
});

//GetClienteByNit
async function getClienteByNit(nitCliente) {

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
app.get("/api/getCliente/:nit", async (req, res) => {
  var nitCliente = req.params.nit
  var respuesta = await getClienteByNit(nitCliente);
  res.send(respuesta);
});

//GatFamiliaByNombre
async function getFamiliaByNombre(prd) {
  let query = await familia.where('Nombre', '==', prd);
  let querySnapshot = await query.get();
  let respuesta = null;

  if (querySnapshot.empty) {
    console.log(`No encontramos la familia con nombre: ${prd}`);

  } else {
    console.log('Encontramos a la familia: ', prd);
    respuesta = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return respuesta;
}
app.get("/api/getFamilia/:nombre", async (req, res) => {
  var prd = req.params.nombre;
  var respuesta = await getFamiliaByNombre(prd);
  res.send(respuesta);
});

//GetProductoById
/* async function getPedidos() {
  const snapshot = await pedido.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
} */
async function getProductoById(prd) {
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
app.get("/api/getProducto/Id/:id", async (req, res) => {
  var prd = req.params.id
  var respuesta = await getProductoById(prd);

  res.send(respuesta);
});

//GetProductoByNombre
async function getProductoByNombre(prd) {
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
app.get("/api/getProducto/Nombre/:nombre", async (req, res) => {
  var prd = req.params.nombre
  var respuesta = await getProductoByNombre(prd);
  res.send(respuesta);
});

//PostPedido
/*
  Para el siguiente post es necesaria la siguiente estructura en el requestbody:
  {
    "Fecha": "2019-01-02T10:12:04",
    "Detalle": 
    [
      {
        "IdProducto":"xHsRl949N5aptvF0M7vt",
        "Cantidad":2
      }
    ],
    "NombreCliente":"Lopez",
    "NITCliente": 77777,
    "IdEmpleado":"ABCRl949N5aptvF0M7vt",
    "Estado":"Entregado"
  }
*/
app.post("/api/postPedido", async (req, res) => {
  const data = req.body

  // const data = {
  //   "Fecha": "2019-01-02T10:12:04",
  //   "Detalle": 
  //   [
  //     {
  //       "IdProducto":"xHsRl949N5aptvF0M7vt",
  //       "Cantidad":4
  //     }
  //   ],
  //   "NombreCliente":"Lopez",
  //   "NITCliente": 77777,
  //   "IdEmpleado":"ABCRl949N5aptvF0M7vt"
  // }

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
            "Id": prd.IdProducto,
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
  const nit = data.NITCliente;
  const nombre = data.NombreCliente;
  var respuesta = null;
  const dataCliente =
  {
    "NIT": parseInt(nit, 10),
    "Nombre": nombre
  }

  var miCliente = await postCliente(dataCliente)
  if (miCliente != null) {
    var newPedido =
    {
      "Fecha": firebase.firestore.Timestamp.fromDate(new Date(data.Fecha)),
      "Detalle": misProds,
      "NITCliente": nit,
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
//GetPedidosBetween2Dates
async function getPedidosBetween2Dates(start, end) {
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
app.get("/api/getPedidosBetween2Dates", async (req, res) => {
  var inicio = req.body.Inicio;
  var final = req.body.Final;
  console.log("inicio:", inicio);
  console.log("final:", final);
  var respuesta = await getPedidosBetween2Dates(inicio, final);
  res.send(respuesta);
});
/*
{
  "Inicio":"2020-01-01T12:01:18",
  "Final":"2020-07-12T12:06:00",
  "NITCliente": 123456
}

*/
async function getPedidos2DatesClientNIT(start, end, NITCliente) {
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


app.get("/api/getPedidos2DatesClientNIT", async (req, res) => {
  var inicio = req.body.Inicio;
  var final = req.body.Final;
  var nitCliente = req.body.NITCliente;
  console.log("inicio:", inicio);
  console.log("final:", final);
  var respuesta = await getPedidos2DatesClientNIT(inicio, final, nitCliente);
  res.send(respuesta);
});

//UpdateState
/*
  {
    "IdPedido": "NXp6KInuGOHtoJWv9cnN",
    "Estado":"Entregado"
  }
  */

async function updatePedidoEstado(idPedido,estado) {
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

app.post("/api/updatePedidoEstado", async (req, res) => {
  console.log("entro api 1");
  var idPedido = req.body.IdPedido;
  var estado = req.body.Estado;

  var respuesta = await updatePedidoEstado(idPedido,estado);
  res.send(respuesta);
});

//GetPedidosEstado Obtener los pedidos segun su estado
async function getPedidosEstado(estado) {
  const snapshot = await pedido.where('Estado','==',estado).get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
} 
app.get("/api/getPedidosEstado/:estado", async (req, res) => {
  var estado = req.params.estado;
  const list = await getPedidosEstado(estado);
  res.send(list);
});
/*
  {
    "Fecha":"2020-07-12T12:06:00",
    "NITCliente": 123456
  }
  */
async function getPedidoFechaNIT(fecha, nitCliente) {
  fecha = firebase.firestore.Timestamp.fromDate(new Date(fecha));
  const snapshot = await pedido.where('Fecha','==',fecha).where('NITCliente','==',nitCliente).get();
  var list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  if(list.length < 1)
  {
    list = null;
  }
  return list;
} 
app.get("/api/getPedidoFechaNIT", async (req, res) => {
  var fecha = req.body.Fecha;
  var nitCliente = req.body.NITCliente;
  const list = await getPedidoFechaNIT(fecha, nitCliente);
  res.send(list);
});

app.listen(4000, () => console.log("Up and Running on 40000"));
