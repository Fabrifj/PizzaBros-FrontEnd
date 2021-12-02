const { compra, elemento, firebase } = require("./config");
const fnElemento = require("./elemento");
const fnHerramientas = require("./MisHerramientas");
const fnTransaccion = require("./transaccion");
/* 
Estructura body -> Crear
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

//CrearCompra
async function crearCompra(data) {
  const fecha = data.Fecha;
  const total = data.Total;

  var misElems = [];
  var msg = {};
  // Iteramos por todos los elementos dentro de la lista de elementos
  data.ListaElementos.forEach(async (elem) => {
    //Creacion del objeto elemento necesario para la creacion de la base de datos
    var elemBD = {
      IdElemento: elem.IdElemento,
      Marca: elem.Marca,
      TipoUnidad: elem.TipoUnidad,
      CantidadMedida: elem.CantidadMedida,
      CostoUnidad: elem.CostoUnidad,
      CantidadComprada: elem.CantidadComprada,
    };
    misElems.push(elemBD);
    //console.log("Elementos a ingresar dentro de compra en la BD: ", misElems);

    // Creacion de la compra individual
    var nuevaCompraIndividual = {
      Tipo: "Individual",
      Fecha: firebase.firestore.Timestamp.fromDate(new Date(fecha)),
      Total: total,
      CostoUnidad: elem.CostoUnidad,
      CantidadComprada: elem.CantidadComprada,
      TipoUnidad: elem.TipoUnidad,
      CantidadMedida: elem.CantidadMedida,
      IdElemento: elem.IdElemento,
    };

    console.log(
      "Nueva compra individual a ingresar en la base de datos: ",
      nuevaCompraIndividual
    );
    await compra.add(nuevaCompraIndividual);
    console.log("Compra individual agregada");
    msg["Compra Individual"] = nuevaCompraIndividual;

    // Verificacion de la existencia del elemento dentro de la base de datos
    await elemento
      .doc(elem.IdElemento)
      .get()
      .then((snapshot) => {
        let querySnapshot = snapshot.data();
        //console.log("Resultado de la consulta: ", querySnapshot);

        if (
          typeof querySnapshot == "undefined" ||
          querySnapshot.empty ||
          querySnapshot == null
        ) {
          console.log(
            `elemento con el id: ${elem.IdElemento} no encontrado en la base de datos`
          );
          // formato del elemento
          var cantInventario = elem.CantidadMedida * elem.CantidadComprada;
          var miElem = {
            Nombre: elem.Nombre,
            Tipounidad: elem.TipoUnidad,
            ListaArticulos: [
              {
                Marca: elem.Marca,
                Costo: elem.CostoUnidad,
                CantidadMedida: elem.CantidadMedida,
              },
            ],
            CantidadInventario: cantInventario,
            CostoMedia: elem.CostoUnidad,
            Tipo: elem.Tipo,
          };
          //console.log("En caso de que el elemento no este creado: ", miElem);
          // Creacion del elemento con la funcion de Gaby
          fnElemento.crearElemento(miElem);
        } else {
          // Dado que el elemento existe se capturara los nuevos datos que el elemento
          // trae con la compra
          console.log("Elemento encontrado: ", elem.IdElemento);

          var miElem = {
            Marca: elem.Marca,
            CantidadMedida: elem.CantidadMedida,
            Costo: elem.CostoUnidad,
            CantidadComprada: elem.CantidadComprada,
          };
          //console.log("En caso de que el elemento este creado: ", miElem);

          // Actualizacion del elemento mediante la funcion de Gaby
          fnElemento.actualizarElemAgregarInv(elem.IdElemento, miElem);
        }
      });
  });
  var respuesta = null;

  // Creacion de la compra de tipo grupal
  var nuevaCompraGrupal = {
    Tipo: "Grupal",
    Fecha: firebase.firestore.Timestamp.fromDate(new Date(fecha)),
    Total: total,
    ListaElementos: misElems,
  };
  console.log(
    "Nueva compra grupal a ingresar en la base de datos: ",
    nuevaCompraGrupal
  );
  await compra.add(nuevaCompraGrupal);
  console.log("Compra grupal agregada");
  msg["CompraGrupal"] = nuevaCompraGrupal;


  finalDate = fnHerramientas.obtenerFechaActual();
  var desc = "Compra"; 

  // Ingresar la compra a la transaccion
  var detalleTransaccion = {
    "Fecha": finalDate,
    "Tipo": "Egreso",
    "Descripcion": desc,
    "Cantidad": total
  };
  await fnTransaccion.crearTransaccion(detalleTransaccion);
  return msg;
}

//Obtener todas las compras
async function obtenerCompras() {
  const snapshot = await compra.get();
  const list = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return list;
}

// ObtenerCompraId
async function obtenerCompraId(compraId) {
  var respuesta = null;
  await compra
    .doc(compraId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        respuesta = { id: doc.id, ...doc.data() };
        console.log("Informacion de la compra:", doc.data());
      } else {
        respuesta = "La compra no existe";
        console.log("La compra no existe");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  return respuesta;
}

/* 
Estructura body -> Actualizar
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

// Actualizar compra
async function actualizarCompra(compraId, cmp) {
  var respuesta = null;
  await compra
    .doc(compraId)
    .update(cmp)
    .then(() => {
      respuesta = cmp;
      console.log("Compra actualizada");
    })
    .catch((error) => {
      console.error("Error al actualizar la compra: ", error);
    });
  return respuesta;
}

// Eliminar Compra
async function eliminarCompra(compraId) {
  var respuesta = null;
  await compra
    .doc(compraId)
    .delete()
    .then(() => {
      respuesta = "Compra borrada correctamente!";
      console.log(respuesta);
    })
    .catch((error) => {
      console.error("Error eliminando la compra: ", error);
    });
  return respuesta;
}

module.exports = {
  crearCompra,
  obtenerCompras,
  obtenerCompraId,
  actualizarCompra,
  eliminarCompra,
};
