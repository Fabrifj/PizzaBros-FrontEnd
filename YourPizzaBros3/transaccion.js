const { transaccion, firebase } = require('./config');
const fnHerramientas = require("./herramientas");
/**
 * 
 * @param 
 * {
	"Fecha": "2020-12-23",
	"Tipo": "Ingreso",//Puede ser "Egreso"
	"Descripcion": "Ventas semanales del 01-23 de diciembre 2020",
	"Cantidad": 3000
} body 
 */
async function crearTransaccion(body)
{
  body.Fecha = firebase.firestore.Timestamp.fromDate(fnHerramientas.stringAFecha(body.Fecha));
  return await fnHerramientas.createDoc(body, "Transaccion");
}
async function obtenerTransaccion(idTrans)
{
  return await fnHerramientas.getDoc(idTrans, "Transaccion");
}
async function obtenerTransacciones()
{
  return await fnHerramientas.getDocs("Transaccion");
}
async function actualizarTransaccion(idTrans, body)
{
  if(body.hasOwnProperty('Fecha'))
  {
    body.Fecha = firebase.firestore.Timestamp.fromDate(fnHerramientas.stringAFecha(body.Fecha));
  }
  return await fnHerramientas.updateDoc(idTrans,body,"Transaccion");
}
async function eliminarTransaccion(idTrans)
{
  return await fnHerramientas.deleteDoc(idTrans,"Transaccion");
}
module.exports = {
    crearTransaccion,
    obtenerTransaccion,
    obtenerTransacciones,
    actualizarTransaccion,
    eliminarTransaccion
  };
