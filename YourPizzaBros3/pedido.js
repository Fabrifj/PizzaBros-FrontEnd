const { pedido, producto, firebase } = require('./config');
const fnCliente = require('./cliente');
const fnHerramientas = require("./herramientas");

/*
Estructura del body -> Crear    
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

//CrearPedido
async function crearPedido(data){

  //Buscamos todos los productos de la lista
  var misProds = [];
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
  const nit = data.Cliente.NIT;
  const nombre = data.Cliente.Nombre;
  var respuesta = null;
  const dataCliente =
  {
    "NIT": parseInt(nit, 10),
    "Nombre": nombre
  }

  var miCliente = await fnCliente.crearCliente(dataCliente)
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
    respuesta = { msg: "Pedido agregado", "Pedido": newPedido }
  }
  else {
    console.log(`Ya existe una un cliente registrado con el NIT ${nit} pero no el nombre ${nombre}`);
  }
  return respuesta;
}


/*
{
  "IdPedido":"",
  "Estado":""
}
*/

//ActualizarPedidoEstado
async function actualizarPedidoEstado(idPedido, estado) {
  let respuesta = null;
  var miBool = false;
  await pedido.doc(idPedido).get().then(snapshot => {
    let querySnapshot = snapshot.data()
    console.log(querySnapshot)
    if (typeof querySnapshot == 'undefined' || querySnapshot.empty || querySnapshot == null) {
      console.log(`No encontramos el pedido con Id: ${idPedido}`);
    } else {
      miBool = true;
      console.log('Encontramos al pedido: ', idPedido);
      
      var a = pedido.doc(idPedido).update({ "Estado": estado });
      querySnapshot.Estado = estado;
      respuesta = querySnapshot;
    }
  });
  if(miBool == true && estado == 'Entregado')
  {
    var miPedido = await pedido.doc(idPedido).get();
    const tr = 
    {
      "Fecha":miPedido.data().Fecha,
      "Tipo":"Ingreso",
      "Descripcion":`Pedido ${idPedido}`,
      "Cantidad": miPedido.data().Precio 
    }
    fnHerramientas.createDoc(tr,"Transaccion");
  }
  return respuesta;
}

//ObtenerPedidos
async function obtenerPedidos(){
  const snapshot = await pedido.get();
  const lista = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return lista;
}


/*
  "Inicio":"2020-01-01T12:01:18" / "Final":"2020-07-12T12:06:00"
*/

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
  "Inicio":"2020-01-01T12:01:18" /
  "Final":"2020-07-12T12:06:00" /
  "NITCliente": 123456
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
    respuesta = "No se encontro lo buscado"
  } else {
    console.log(`Encontramos pedidos entre las fechas ${start} - ${end} del cliente NIT: ${NITCliente}`);
    respuesta = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  console.log("ListaFechas", respuesta);
  return respuesta;
}

//ObtenerPedidosEstado
async function obtenerPedidosEstado(estado) {
  const snapshot = await pedido.where('Estado', '==', estado).get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}

/*
  "Fecha":"2020-07-12T12:06:00" /
  "NITCliente": 123456
*/

//ObtenerPedidoFechaNIT
// Revisar!
async function obtenerPedidoFechaNIT(fecha, nitCliente) {
  fecha = firebase.firestore.Timestamp.fromDate(new Date(fecha));
  const snapshot = await pedido.where('Fecha', '==', fecha).where('NITCliente', '==', nitCliente).get();
  var list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  if (list.length < 1) {
    list = null;
  }
  return list;
}

//ObtenerPedidosCliente
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

module.exports = {
  crearPedido,
  actualizarPedidoEstado,
  obtenerPedidos,
  obtenerPedidos2Fechas,
  obtenerPedidos2FechasNITCliente,
  obtenerPedidosEstado,
  obtenerPedidoFechaNIT,
  obtenerPedidosCliente
};