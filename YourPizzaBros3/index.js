const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const fnCliente = require('./cliente');
const fnProducto = require('./producto');
const fnCategoria = require('./categoria');
const fnPedido = require('./pedido');
const fnElemento = require('./elemento');
const fnCompra = require('./compra');
const fnEmpleado = require('./empleado');

/*===================================
          CRUD PRODUCTOS
===================================*/

// CrearProducto
app.post("/api/producto", async (req, res) => {
  var miProducto = req.body;
  const respuesta = await fnProducto.crearProducto(miProducto);
  res.send(respuesta);
});

// ObtenerProductos  
app.get("/api/productos", async (req, res) => {
  const list = await fnProducto.obtenerProductos();
  res.send(list);
});

//ObtenerProductoId
app.get("/api/producto/Id/:id", async (req, res) => {
  var prd = req.params.id
  const respuesta = await fnProducto.obtenerProductoId(prd);
  res.send(respuesta);
});

//ObtenerProductoNombre
app.get("/api/producto/Nombre/:nombre", async (req, res) => {
  var prd = req.params.nombre
  var respuesta = await fnProducto.obtenerProductoNombre(prd);
  res.send(respuesta);
});

//EliminarProducto
app.delete("/api/producto/:id", async (req, res) => {
  var prod = req.params.id;
  const resp = await fnProducto.eliminarProducto(prod);
  res.send(resp);
});

//ActualizarProducto
app.put("/api/producto/:id", async (req, res) => {
  var prodid = req.params.id;
  var prod = req.body;
  const resp = await fnProducto.actualizarProducto(prodid,prod);
  res.send(resp);
});

//AgregarIngredientesaProducto
app.put("/api/producto/:id/agregarIng", async (req, res) => {
  var prodid = req.params.id;
  var body = req.body;
  const resp = await fnProducto.agregarIngredientesAProducto(prodid,body);
  res.send(resp);
});

/*===================================
          CRUD CLIENTES
//===================================*/

//CrearCliente
app.post("/api/cliente", async (req, res) => {
  const data = req.body
  const respuesta = await fnCliente.crearCliente(data);
  res.send(respuesta)
})

//ObtenerClientes
app.get("/api/clientes", async (req, res) => {
  const list = await fnCliente.obtenerClientes();
  res.send(list);
});

//ObtenerClienteNit
app.get("/api/cliente/:nit", async (req, res) => {
  var nitCliente = req.params.nit
  var respuesta = await fnCliente.obtenerClienteNit(nitCliente);
  res.send(respuesta);
});

/*===================================
          CRUD CATEGORIA
//===================================*/

//CrearCategoria
app.post("/api/categoria", async (req, res) => {
  var miCategoria = req.body;
  const respuesta = await fnCategoria.crearCategoria(miCategoria);
  res.send(respuesta);
});

//ObtenerCategorias
app.get("/api/categorias", async (req, res) => {
  const list = await fnCategoria.obtenerCategorias();
  res.send(list);
});

//ObtenerCategoriaNombre
app.get("/api/categoria/:nombre", async (req, res) => {
  var prd = req.params.nombre;
  var respuesta = await fnCategoria.obtenerCategoriaNombre(prd);
  res.send(respuesta);
});

//EliminarCategoriaId
app.delete("/api/categoria/:id", async (req, res) => {
  var cat = req.params.id;
  const resp = await fnCategoria.eliminarCategoria(cat);
  res.send(resp);
});

//ActualizarCategoria
app.put("/api/categoria/:id", async (req, res) => {
  var catid = req.params.id;
  var cat = req.body;
  const respuesta = await fnCategoria.actualizarCategoria(catid,cat);
  res.send(respuesta);
});

//AgregarProdsCategoria
app.put("/api/categoria/:id/agregarProds", async (req, res) => {
  var catid = req.params.id;
  var prods = req.body;
  const respuesta = await fnCategoria.agregarProdsCategoria(catid,prods);
  res.send(respuesta);
});

/*===================================
          CRUD PEDIDOS
//===================================*/

//CrearPedido
app.post("/api/pedido", async (req, res) => {
  const data = req.body; 
  const respuesta = await fnPedido.crearPedido(data);
  res.send(respuesta)
})

//ActualizarPedidoEstado
app.post("/api/pedidoEstado", async (req, res) => {
  var idPedido = req.body.IdPedido;
  var estado = req.body.Estado;
  var respuesta = await fnPedido.actualizarPedidoEstado(idPedido, estado);
  res.send(respuesta);
});

//ObtenerPedidos
app.get("/api/pedidos", async (req, res) => {
  const list = await fnPedido.obtenerPedidos();
  res.send(list);
});

//ObtenerPedidos2Fechas
app.get("/api/pedidos2Fechas/:inicio/:final", async (req, res) => {
  var inicio = req.params.inicio;
  var final = req.params.final;
  var respuesta = await fnPedido.obtenerPedidos2Fechas(inicio, final);
  res.send(respuesta);
});

//ObtenerPedidos2FechasNITCliente
app.get("/api/pedidos2FechasNITCliente/:inicio/:final/:nit", async (req, res) => {
  var inicio = req.params.inicio;
  var final = req.params.final;
  var nitCliente = req.params.nit;
  var respuesta = await fnPedido.obtenerPedidos2FechasNITCliente(inicio, final, nitCliente);
  res.send(respuesta);
});

//ObtenerPedidosEstado
app.get("/api/pedidosEstado/:estado", async (req, res) => {
  var estado = req.params.estado;
  const list = await fnPedido.obtenerPedidosEstado(estado);
  res.send(list);
});

//ObtenerPedidoFechaNIT
app.get("/api/pedidoFechaNIT/:fecha/:nit", async (req, res) => {
  var fecha = req.params.fecha;
  var nitCliente = req.params.nit;
  const list = await fnPedido.obtenerPedidoFechaNIT(fecha, nitCliente);
  res.send(list);
});

//ObtenerPedidosCliente
app.get("/api/pedidosCliente/nit/:nit", async (req, res) => {
  var nitCliente = req.params.nit;
  const list = await fnPedido.obtenerPedidosCliente(nitCliente);
  res.send(list);
});


/*===================================
          CRUD ELEMENTO
//===================================*/

//CrearElemento
app.post("/api/elemento", async (req, res) => {
  const data = req.body
  const respuesta = await fnElemento.crearElemento(data);
  res.send(respuesta);
})

//ObtenerElemento
app.get("/api/elemento", async (req, res) => {
  const list = await fnElemento.obtenerElementos();
  res.send(list);
});

//ObtenerIngredientes
app.get("/api/ingrediente", async (req, res) => {
  const list = await fnElemento.obtenerIngredientes();
  res.send(list);
});

//ObtenerBienes
app.get("/api/bien", async (req, res) => {
  const list = await fnElemento.obtenerBienes();
  res.send(list);
});

//EliminarElemento
app.delete("/api/elemento/:id", async (req, res) => {
  var el = req.params.id;
  const resp = await fnElemento.eliminarElemento(el);
  res.send(resp);
});

//ActualizarElemAgregarInv sirve para agregar cantidad al inventario de un elemento
app.put("/api/elemento/:id/agregarInv", async (req, res) => {
  var elid = req.params.id;
  var mibody = req.body;
  const resp = await fnElemento.actualizarElemAgregarInv(elid,mibody);
  res.send(resp);
});

/*===================================
          CRUD COMPRA
===================================*/

// Crear una compra
app.post("/api/compra", async (req, res) => {
  const data = req.body;
  const respuesta = await fnCompra.crearCompra(data)
  res.send(respuesta);
});

//ObtenerCompras
app.get("/api/compras", async (req, res) => {
  const lista = await fnCompra.obtenerCompras();
  res.send(lista);
});

//ObtenerCompraId
app.get("/api/compra/:id", async (req, res) => {
  var compraId = req.params.id;
  const respuesta = await fnCompra.obtenerCompraId(compraId);
  res.send(respuesta);
});

//ActualizarCompra
app.put("/api/compra/:id", async (req, res) => {
  var compraId = req.params.id;
  var cmp = req.body;
  const respuesta = await fnCompra.actualizarCompra(compraId,cmp);
  res.send(respuesta);
});

//EliminarCompra
app.delete("/api/compra/:id", async (req, res) => {
  var compraId = req.params.id;
  const respuesta = await fnCompra.eliminarCompra(compraId);
  res.send(respuesta);
});

/*===================================
          CRUD EMPLEADO
===================================*/
// CrearEmpleado
app.post("/api/empleado", async (req, res) => {
  const data = req.body;
  const respuesta = await fnEmpleado.crearEmpleado(data)
  res.send(respuesta);
});

//Calcular y actualizar horario
app.put("/api/empleado/turnos", async (req, res) => {
  var body = req.body;
  const respuesta = await fnEmpleado.calcularHorario(body);
  res.send(respuesta);
});

/*===================================
          ENDPOINT DE PRUEBA
===================================*/
//Se puede poner lo que se quiera en el metodo, solo es para prueba
app.get("/api/prueba", async (req, res) => {
  var body = req.body;
  await fnEmpleado.calcularHorario(body);
  res.send("Endpoint de prueba");
});



///////
app.listen(4000, () => console.log("Up and Running on 4000"));