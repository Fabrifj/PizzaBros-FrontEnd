const { empleado, firebase } = require('./config');
var dias = 
{
    Domingo: 0,
    Lunes: 1,
    Martes: 2,
    Miercoles: 3,
    Jueves: 4,
    Viernes: 5,
    Sabado: 6
}
var dias2 = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes"];


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
//CrearCategoria
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
function stringAFecha(fecha)
{
    var parts = fecha.split('-');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
    return mydate;
}
async function crearEmpleado(body)
{
    body.ListaTurnos = [];
    var mydate = stringAFecha(body.FechaNacimiento);
    console.log(mydate.toDateString());
    body.FechaNacimiento = firebase.firestore.Timestamp.fromDate(mydate);
    await empleado.add(body);
    respuesta = {
      "Mensaje" : "Empleado agregado correctamente",
      "Categoria": body
    }
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
async function calcularHorario(body)
{
    
    const diasMes = diasEnMes(body.FechaTurnos);
    var misDias = [];
    var misTurnos = [];

    var parts = body.FechaTurnos.split('-');
    var year = parseInt(parts[0],10);
    var month = parseInt(parts[1],10)-1;

    body.HorarioSemanal.forEach(dia =>{
        misDias.push(dias[dia.Dia]);
    });
      
    for await (let index of [...Array(diasMes).keys()])
    {
        var diaSemana = incluidoEnHorario(year, month, index+1, misDias);
        if( diaSemana!= null)
        {
            var nuevaFecha = new Date(year, month, index+1);
            var nuevoDia=
            {
                Fecha : firebase.firestore.Timestamp.fromDate(nuevaFecha),
                Turnos:[]
            }
            
            const result = body.HorarioSemanal.find( ({ Dia }) => Dia === dias2[diaSemana] );
            result.Turnos.forEach(trn=>{
                nuevoDia.Turnos.push(
                    {
                        Id: trn,
                        Estado: "Falta"
                    }
                );
            });
            misTurnos.push(nuevoDia);
        }
    }
    console.log("Turnos: ",misTurnos);
    var ref = empleado.doc(body.IdEmpleado);
    resp = null;
    await ref.update({ListaTurnos: misTurnos})
    .then(() => 
    {
        ref.get().then(s=>{resp = s.data()});
        console.log("Turnos agregados a empleado correctamente!");
    })
    .catch((error) => 
    {
        // The document probably doesn't exist.
        console.error("Error al agregar turnos a empleado: ", error);
    });
    return resp;
}
// Month in JavaScript is 0-indexed (January is 0, February is 1, etc), 
// but by using 0 as the day it will give us the last day of the prior
// month. So passing in 1 as the month number will return the last day
// of January, not February
function diasEnMes (fecha) {
    var parts = fecha.split('-');
    var year = parseInt(parts[0],10);
    var month = parseInt(parts[1],10);
    return new Date(year, month, 0).getDate();
}

function incluidoEnHorario(year, month, day, miHorario) {
    var day = new Date(year, month, day).getDay();
    const found = miHorario.find(element => element == day);
    return found;
    }
module.exports = {
    crearEmpleado,
    stringAFecha,
    calcularHorario
  };