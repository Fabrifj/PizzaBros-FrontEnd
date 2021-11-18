const express = require('express');
const cors = require('cors');
database = require('./config');

const app = express();
app.use(express.json());
app.use(cors());

const compra = database.compra;
const firebase = database.firebase;
const elemento = database.elemento;

const fnCliente = require('./cliente');
const fnProducto = require('./producto');
const fnCategoria = require('./categoria');
const fnPedido = require('./pedido');
const fnElemento = require('./elemento');

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

//ActualizarElemento
app.put("/api/elemento/:id", async (req, res) => {
  var elid = req.params.id;
  var el = req.body;
  const respuesta = await fnElemento.actualizarElemento(elid,el);
  res.send(respuesta);
});

//ObtenerElementoId
app.get("/api/elemento/:id", async (req, res) => {
  var elid = req.params.id;
  const respuesta = await fnElemento.obtenerElementoId(elid);
  res.send(respuesta);
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
