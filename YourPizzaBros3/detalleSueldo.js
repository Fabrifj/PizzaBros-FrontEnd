const { detalleSueldo } = require("./config");
const fnHistorialActividad = require("./historialActividad");
const fnEmpleado = require("./empleado");

/*
{
  "IdEmpleado":"",
  "SueldoBase":""
}
*/

//CrearDetalleSueldo
async function crearDetalleSueldo(data) {
  if (data.SueldoReal) {
    respuesta =
      "No se puede crear un detalle de sueldo con el sueldo real ya establecido";
  } else {
    await detalleSueldo.add(data);
    respuesta = {
      Mensaje: "Detalle sueldo agregado correctamente",
      DetalleSueldo: data,
    };
  }
  return respuesta;
}

//ObtenerDetalleSueldo
async function obtenerDetalleSueldo() {
  const snapshot = await detalleSueldo.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
}

//ObtenerDetalleSueldoEmpleado
async function obtenerDetalleSueldoEmpleado(idEmpleado) {
  var respuesta = null;
  var query = await detalleSueldo.where("IdEmpleado", "==", idEmpleado).get();
  if (query.empty) {
    respuesta =
      "El empleado con ID: " +
      idEmpleado +
      " no tiene ningun detalle de sueldo";
  } else {
    console.log("Se encontro el detalle de sueldo del empleado");
    respuesta = query.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return respuesta;
}

//EliminarDetalleSueldo
async function eliminarDetalleSueldo(idDS) {
  var respuesta = null;
  await detalleSueldo
    .doc(idDS)
    .delete()
    .then(() => {
      respuesta = "DetalleSueldo borrado correctamente!";
      console.log(respuesta);
    })
    .catch((error) => {
      console.error("Error eliminando DetalleSueldo: ", error);
    });

  return respuesta;
}

//ActualizarDetalleSueldo
async function actualizarDetalleSueldo(idDS, ds) {
  var respuesta = null;

  if (ds.SueldoReal) {
    respuesta =
      "No se puede actualizar un detalle de sueldo con el sueldo real ya establecido";
  } else {
    await detalleSueldo
      .doc(idDS)
      .update(ds)
      .then(() => {
        respuesta = ds;
        console.log("DetalleSueldo actualizado correctamente");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        respuesta = "Error al actualizar el DetalleSueldo: ";
      });
  }
  return respuesta;
}

async function calcularSueldoReal(idEmpleado) {
  var respuesta = null;
  var sueldo = await obtenerDetalleSueldoEmpleado(idEmpleado);
  var sueldoBase = sueldo[0].SueldoBase;
  var idDetalle = sueldo[0].id;
  
  // Buscar los turnos del empleado y contar todas los estados de llegada
  var numFaltas = 0;
  var numPuntual = 0;
  var numRetrasos = 0;

  var empleado = await fnEmpleado.obtenerEmpleado(idEmpleado);
  empleado.ListaTurnos.forEach((turno) => {
    turno.Turnos.forEach(async (t) => {
      switch (t.Estado){
        case "Falta":
          numFaltas++;
          break;
        case "Puntual":
          numPuntual++;
          break;
        case "Retraso":
          numRetrasos++;
          break;
      }
    });  
  });
  //Calcular el sueldo real tras descontar las faltas y retrasos
  var sueldoReal = sueldoBase - (numRetrasos*(sueldoBase*0.002)) - (numFaltas*(sueldoBase*0.005));
  console.log(sueldoReal);

  //Actualizar el detalleSueldo agregando el SueldoReal
  await detalleSueldo.doc(idDetalle).set({
    "SueldoReal": sueldoReal
  }, {merge: true});
  respuesta = await obtenerDetalleSueldoEmpleado(idEmpleado);
  return respuesta;
}

module.exports = {
  crearDetalleSueldo,
  obtenerDetalleSueldo,
  actualizarDetalleSueldo,
  eliminarDetalleSueldo,
  obtenerDetalleSueldoEmpleado,
  calcularSueldoReal
};
