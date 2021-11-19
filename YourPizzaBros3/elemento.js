const { elemento } = require('./config');

/*
Estructura Body -> Crear
{
	"Nombre": "Salsa Tomate",
	"TipoUnidad": "ml",
	"ListaArticulos":
	[
		{
			"Marca":"Salsa de Tomate Maggi",
			"Costo":15,
			"CantidadMedida":500
		}
	],
  "CantidadMedida":500,
	"CantidadInventario":1000,//cantidad de salsa en el inventario medida en ml
	"CostoMedia":15,//Media de los costos de la listaArticulos
	"Tipo":"Ingrediente"
}
*/

//Crear Elemento
async function crearElemento(data){
  await elemento.add(data);
  respuesta = {
    "Mensaje" : "Elemento agregado correctamente",
    "Elemento": data
  }
  return respuesta;
}

//ObtenerElementos
async function obtenerElementos() {
  const snapshot = await elemento.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}

//ObtenerIngredientes
async function obtenerIngredientes() {
  const snapshot = await elemento.where('Tipo','==','Ingrediente').get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}

//ObtenerBienes
async function obtenerBienes() {
  const snapshot = await elemento.where('Tipo','==','Bien').get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}

//EliminarElemento
async function eliminarElemento(idEl) {  
  var respuesta = null;
  await elemento.doc(idEl).delete().then(() => {
    respuesta = "Elemento borrado correctamente!"
    console.log(respuesta);
  }).catch((error) => 
  {
    console.error("Error eliminando elemento: ", error);
  });

  return respuesta;
}

/*
Estructura Body -> Actualizar
{
	"Nombre": "Salsa Tomate",
	"TipoUnidad": "ml",
	"ListaArticulos":
	[
		{
			"Marca":"Salsa de Tomate Maggi",
			"Costo":15,
			"CantidadMedida":500
		}
	],
  "CantidadMedida":500,
	"CantidadInventario":1000,//cantidad de salsa en el inventario medida en ml
	"CostoMedia":15,//Media de los costos de la listaArticulos
	"Tipo":"Ingrediente" //Puede ser Ingrediente o Bien
}
*/

//ActualizarElemento
async function actualizarElemento(idEl, el) {
  var respuesta = null;
  await elemento.doc(idEl).update(el)
  .then(() => 
  {
    respuesta = el;  
    console.log("Elemento actualizada correctamente");
  })
  .catch((error) => 
  {
      // The document probably doesn't exist.
      console.error("Error al actualizar el elemento: ", error);
  });
  return respuesta;
}

//ObtenerElementoById
async function obtenerElementoId(elid) 
{
  var respuesta = null;
  await elemento.doc(elid).get().then((doc) => {
    if (doc.exists) {
      respuesta = { id: doc.id, ...doc.data() }  
      console.log("Data de Elemento:", doc.data());
    } else { 
        console.log("Elemento no existe");
    }
  }).catch((error) => 
  {
      console.log("Error getting document:", error);
  });
  return respuesta;
}


/*
Estructura Body -> Actualizar
{
	"Marca":"Salsa de Tomate Flor",
	"Costo":20,
	"CantidadMedida":800,
	"CantidadComprada":3
}
*/

//ActualizarElemAgregarInv sirve apra aggregar cantidad al inventario de un elemento.
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

module.exports = {
  crearElemento,
  obtenerElementos,
  obtenerIngredientes, 
  obtenerBienes, 
  eliminarElemento, 
  actualizarElemento,
  obtenerElementoId,
  actualizarElemAgregarInv
};