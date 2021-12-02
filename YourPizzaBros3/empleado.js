const { empleado, firebase, cliente } = require("./config");
const fnHerramientas = require("./herramientas");
var dias = {
  Domingo: 0,
  Lunes: 1,
  Martes: 2,
  Miercoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sabado: 6,
};
var dias2 = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

//LO QUE SE GUARDA COMO ENTIDAD EN LA BASE DE DATOS:
/*
{
    "Nombre": "",
    "ApellidoP":"",
    "ApellidoM":"",
    "CI":"",
    "Celular":"",
    "FechaNacimiento":"",
    "Cargo":"",

    "HorarioSemanal":
		[
			{
                "Dia":"Lunes",
                "Turnos":
                [
                    "A","B"
                ]
            },
            {
                "Dia":"Miercoles",
                "Turnos":
                [
                    "C","D"
                ]
            },
            {
                "Dia":"Viernes",
                "Turnos":
                [
                    "A","B","C"
                ] 
            }
			
        ]
        
    
    "ListaTurnos":
    [
      {
        "Fecha":"03-09-2021",
        "Turnos":
        [
          {
              "Id":"A",
              "Estado": "Tarde" //"Tarde", "Puntual", "Falta"(PREDEETRMINADO)
          },
          {
              "Id":"B",
              "Estado": ""
          }
        ]
      },
      {
        "Fecha":"04-09-2021",
        "Turnos":
        [
          {
              "Id":"C",
              "Estado": "Puntual"
          },
          {
              "Id":"D",
              "Estado": ""
          }
        ]
      }...
    ]
}

*/

/*lo que nos pasan para crear empleado

{
	"Nombre": "",
	"ApellidoP":"",
	"ApellidoM":"",
	"CI":"",
	"Celular":"",
	"FechaNacimiento":"2019-01-02",
	"Cargo":"",
}*/

/**
 *
 * @param {string} fecha "2000-08-15"
 * @returns {Date} mydate
 */
async function crearEmpleado(body) {
  body.ListaTurnos = [];
  body.HorarioSemanal=[];
  var mydate = fnHerramientas.stringAFecha(body.FechaNacimiento);
  console.log(mydate.toDateString());
  body.FechaNacimiento = firebase.firestore.Timestamp.fromDate(mydate);
  await empleado.add(body);
  respuesta = {
    Mensaje: "Empleado agregado correctamente",
    Categoria: body,
  };
  return respuesta;
}
/**
 * 
 * @param {obj} body debe estar:
 * {
        "IdEmpleado":"jhiJfhPcm778r3txm9hg",
		"FechaTurnos":"2021-11-17",
    "HorarioSemanal":
		[
			{
                "Dia":"Lunes",
                "Turnos":
                [
                    "A","B"
                ]
            },
            {
                "Dia":"Miercoles",
                "Turnos":
                [
                    "C","D"
                ]
            },
            {
                "Dia":"Viernes",
                "Turnos":
                [
                    "A","B","C"
                ] 
            }
			
        ]
    }
 * 
 */

//IMPORTANTE: NO SE VERIFICA SI LOS HORARIOS EXISTEN, SE DEBEN ENVIAR HORARIOS QUE SI EXISTAN
async function calcularHorario(body) {
  var ref = empleado.doc(body.IdEmpleado);
  var miEmpleado = await obtenerEmpleado(body.IdEmpleado);

  const fechaTurnos = fnHerramientas.stringAFecha(body.FechaTurnos);
  const diasMes = diasEnMes(body.FechaTurnos);
  var misDias = [];//Aqui se guardan los indexes de los dias [0,2,5]=[Domingo, martes, miercoles]
  var misTurnos = [];

  var parts = body.FechaTurnos.split("-");
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10) - 1;

  body.HorarioSemanal.forEach((dia) => {
    misDias.push(dias[dia.Dia]);
  });

  for await (let index of [...Array(diasMes).keys()]) {
    var nuevaFecha = new Date(year, month, index + 1);
    if(nuevaFecha.setHours(0,0,0,0)>= fechaTurnos.setHours(0,0,0,0))
    {
      var diaSemana = incluidoEnHorario(year, month, index + 1, misDias);
      if (diaSemana != null) //Si la fecha esta dentro del horario
      {

        const indexTurno = miEmpleado.ListaTurnos.findIndex((turn)=> turn.Fecha.toDate().setHours(0,0,0,0) == nuevaFecha.setHours(0,0,0,0));
        if(indexTurno != null && indexTurno == -1 ) //si la fecha no se encuentra ya en la lista de turnos del empleado
        {
          var nuevoDia = {
            Fecha: firebase.firestore.Timestamp.fromDate(nuevaFecha),
            Turnos: [],
          };
  
          const result = body.HorarioSemanal.find(
            ({ Dia }) => Dia === dias2[diaSemana]
          );
          result.Turnos.forEach((trn) => {
            
            //Aqui hacer la validacion de si el horario existe
            nuevoDia.Turnos.push({
              Id: trn,
              Estado: "Falta",
            });
          });
          misTurnos.push(nuevoDia);
        }
        else if(indexTurno != null && indexTurno != -1 ) //Si la fecha se encuentra ya en la lista de turnos del empleado
        {
          const result = body.HorarioSemanal.find(
            ({ Dia }) => Dia === dias2[diaSemana]
          );
          result.Turnos.forEach((trn) => {
            
            if(miEmpleado.ListaTurnos[indexTurno].Turnos.find( ({Id})=> Id == trn) == null)//si el turno no se encuentra ya agregado
            {
              miEmpleado.ListaTurnos[indexTurno].Turnos.push({Id: trn, Estado: "Falta"});
            }
          });
          
        }

      }
      
    }
    else
    {
      //console.log(`${fechaTurnos.toDateString()} es mayor que ${nuevaFecha.toDateString()}`);
    }
    
  }
  console.log("Turnos: ", misTurnos);
  var diasAEliminarDeBodyHorarioSemanal=[];
  body.HorarioSemanal.forEach((weekday, index) =>
    {
      //Encontrar el index del elemento 
       
      const result = miEmpleado.HorarioSemanal.find(
        ({ Dia }) => Dia === weekday.Dia
      );
      if(result != null)
      {
        const unido = result.Turnos.concat(weekday.Turnos);
        const unico =[...new Set(unido)]
        result.Turnos = unico;
        diasAEliminarDeBodyHorarioSemanal.push(index);
      }
      

    });
    diasAEliminarDeBodyHorarioSemanal.forEach((num)=>
    {
      body.HorarioSemanal.splice(num,1);
    });


  resp = null;
  await ref
    .update({ ListaTurnos: miEmpleado.ListaTurnos.concat(misTurnos), HorarioSemanal: miEmpleado.HorarioSemanal.concat(body.HorarioSemanal)})
    .then(() => {
      ref.get().then((s) => {
        resp = s.data();
      });
      console.log("Turnos agregados a empleado correctamente!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error al agregar turnos a empleado: ", error);
    });
  return resp;
}
// Month in JavaScript is 0-indexed (January is 0, February is 1, etc),
// but by using 0 as the day it will give us the last day of the prior
// month. So passing in 1 as the month number will return the last day
// of January, not February
function diasEnMes(fecha) {
  var parts = fecha.split("-");
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  return new Date(year, month, 0).getDate();
}

function incluidoEnHorario(year, month, day, miHorario) {
  var day = new Date(year, month, day).getDay();
  const found = miHorario.find((element) => element == day);
  return found;
}
/**
 * 
 * @param {string} IdEmpleado 
 * @param {
 * 
 *  
 {
    "Fecha":"2020-01-20"//Debe ser string
    "Turno":"A",
    "Estado":"Puntual"
 }  
 *  
 * } body 
 * @returns 
 */
async function actualizarEstadoTurno(IdEmpleado, body) {
  var miEmpleado = null;
  var respuesta = null;
  await empleado
    .doc(IdEmpleado)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Data empleado:", doc.data());
        miEmpleado = doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No existe el empleado!");
      }
    })
    .catch((error) => {
      console.log("Error getting empleado:", error);
    });
  miEmpleado.ListaTurnos.forEach((turno) => {
    fechaTurno = turno.Fecha.toDate();
    //miFecga = firebase.firestore.Timestamp.fromDate(new Date(fecha));
    miFecha = fnHerramientas.stringAFecha(body.Fecha);
    if (fechaTurno.toDateString() == miFecha.toDateString()) {
      turno.Turnos.forEach((trn) => {
        if (trn.Id == body.Turno) {
          trn.Estado = body.Estado;
        }
      });
    }
  });
  await empleado
    .doc(IdEmpleado)
    .update({ ListaTurnos: miEmpleado.ListaTurnos })
    .then(() => {
      respuesta = miEmpleado;
      console.log("Turnos actualizados correctamente!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error al actualizar turnos: ", error);
    });

  return respuesta;
}

async function obtenerEmpleado(idEmpleado) {
  var miEmpleado = null;
  await empleado
    .doc(idEmpleado)
    .get()
    .then((doc) => {
      if (doc.exists) {
        miEmpleado = doc.data();

        console.log("Data empleado:", miEmpleado);
      } else {
        // doc.data() will be undefined in this case
        console.log("El empleado no existe!");
      }
    })
    .catch((error) => {
      console.log("Error obteniendo empleado:", error);
    });

  return miEmpleado;
}

//ObtenerEmpleados
async function obtenerEmpleados() {
  const snapshot = await empleado.get();
  const lista = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return lista;
}
async function actualizarEmpleado(idEmpleado, body) {
  if(body.hasOwnProperty('FechaNacimiento'))
  {
    body.FechaNacimiento = firebase.firestore.Timestamp.fromDate(fnHerramientas.stringAFecha(body.FechaNacimiento));
  }
  return await fnHerramientas.updateDoc(idEmpleado, body, "Empleado");
}

async function eliminarEmpleado(idEmpleado) {
  console.log("ENTRA A ELIMINAR EMPLEADO");
  return await fnHerramientas.deleteDoc(idEmpleado, "Empleado");
}

//Body para eliminar turnos de un empleado
/*
{
  "IdEmpleado":"jhiJfhPcm778r3txm9hg",
  "FechaInicio":"2021-11-17", //Desde esa fecha se eliminaran los horarios
  "HorarioSemanal": //De estos dias se eliminaran esos horarios
[
{
          "Dia":"Lunes",
          "Turnos":
          [
              "A","B"
          ]
      },
      {
          "Dia":"Miercoles",
          "Turnos":
          [
              "C","D"
          ]
      },
      {
          "Dia":"Viernes",
          "Turnos":
          [
              "A","B","C"
          ] 
      }

  ]
}
*/

async function eliminarTurnoHorarioSemanal(body) {
  console.log("ENTRA A ELIMINAR TURNOS");
  var ref = empleado.doc(body.IdEmpleado);
  var fechaInicio = fnHerramientas.stringAFecha(body.FechaInicio);
  var miEmpleado = await obtenerEmpleado(body.IdEmpleado);
  console.log("ENTRA A ELIMINAR TURNOS")
  var diasBorrar = []// Los indices de los dias de la semana a borrar
  body.HorarioSemanal.forEach((turn)=>
  {
    diasBorrar.push(dias[turn.Dia]);
    const index = miEmpleado.HorarioSemanal.findIndex(({ Dia }) => Dia === turn.Dia);
    if(index != null && index != -1)
    {
      turn.Turnos.forEach((turnos)=>
      {
        var miHorarioSemanal = miEmpleado.HorarioSemanal[index].Turnos.filter(function(ele){ 
          return ele != turnos; 
        });
        miEmpleado.HorarioSemanal[index].Turnos = miHorarioSemanal;
      });
    }
  });

  var miLista2 = miEmpleado.HorarioSemanal.filter(function(ele){ 
    return ele.Turnos.length > 0; 
  });
  miEmpleado.HorarioSemanal = miLista2;
  
  var listaTurnosBorrar = [];
  miEmpleado.ListaTurnos.forEach((turn, index)=>
  {
    var fechaActual = turn.Fecha.toDate();
    
    if( fechaActual.setHours(0,0,0,0)>= fechaInicio.setHours(0,0,0,0) && diasBorrar.includes(fechaActual.getDay()) )
    {
      
      var miDia = body.HorarioSemanal.find( ({Dia}) => Dia == dias2[fechaActual.getDay()]);
      if(miDia != null && miDia.Turnos != null)
      {
        console.log("FechaActual", fechaActual.toDateString())
        miDia.Turnos.forEach((miturno)=>
        {
          console.log("miturno: ",miturno);
          var misturnos = turn.Turnos.filter(function(ele){ 
            return ele.Id != miturno; 
          });
          if(miEmpleado.ListaTurnos[index] != null)
          {
            miEmpleado.ListaTurnos[index].Turnos = misturnos
            if(miEmpleado.ListaTurnos[index].Turnos.length ==0)
            {
              listaTurnosBorrar.push(index)
            }
            else
            {
              console.log("Lista Filtrada de MIS TURNOS: ", miEmpleado.ListaTurnos[index].Turnos);
            }
          }
          else
          {
            console.log("EEEESSSSSSS NULLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
          }
          
          
        });
      }
      
    }
  });
  

  var miLista = miEmpleado.ListaTurnos.filter(function(ele){ 
    return ele.Turnos.length > 0; 
  });
  miEmpleado.ListaTurnos = miLista;
  
  resp = null;
  await ref
    .update({ ListaTurnos: miEmpleado.ListaTurnos, HorarioSemanal: miEmpleado.HorarioSemanal})
    .then(() => {
      resp  = miEmpleado;
      console.log("Turnos eliminados de empleado correctamente!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error al eliminar turnos a empleado: ", error);
    });
  return resp;
  
   
}

function arrayRemove(arr, value) { 
    
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}

module.exports = {
  crearEmpleado,
  calcularHorario,
  actualizarEstadoTurno,
  obtenerEmpleado,
  obtenerEmpleados,
  actualizarEmpleado,
  eliminarEmpleado,
  eliminarTurnoHorarioSemanal
};
