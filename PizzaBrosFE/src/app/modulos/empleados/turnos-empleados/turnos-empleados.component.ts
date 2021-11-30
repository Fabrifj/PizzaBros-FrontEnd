import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';

@Component({
  selector: 'app-turnos-empleados',
  templateUrl: './turnos-empleados.component.html',
  styleUrls: ['./turnos-empleados.component.css']
})
export class TurnosEmpleadosComponent implements OnInit {
  

  constructor(private servicioHttp: AppHttpService, public servicioModal: ModalService) { }

  empleadoSeleccionado:any = {}

  datosEmp: any | undefined;

  columnasEmp = [
    {field:'Nombre',header:'Nombre'},
    {field:'ApellidoP',header:'ApellidoP'},
    {field:'ApellidoM',header:'ApellidoM'},
    {field:'CI',header:'CI'},
    {field:'Celular',header:'Celular'},
    {field:'FechaNacimineto',header:'Fecha de Nacimiento'},
    {field:'Cargo',header:'Cargo'}
  ];
  nombreBotonesEmp: string[] = ['Ver Turnos','Seleccionar'];


  

  columnasTurn = [
    {field:'Nombre',header:'Nombre'},
    {field:'HoraInicio',header:'Hora Inicio'},
    {field:'HoraFin',header:'Hora Fin'}
  ];

  outputTableArray: any=[];

/*-------------------------------------------
*Variables necesarias para la parte de Turnos de un empleado
*---------------------------------------------*/
  datosTurnEmp: any; //Recoge todos los turnos de un empleado;


  datosTurn: any | undefined;
  valorTurnos: string[] = [];
  valorSelect: string[] | undefined;
  basico :any;
  bo: boolean = false;

  //Todos los turnos seleccionados previamente de un empleado
  selectL: string[] = [];
  selectM: string[] = [];
  selectMi: string[] = [];
  selectJ: string[] = [];
  selectV: string[] = [];
  selectS: string[] = [];
  selectD: string[] = [];

  horarioSemanal: string[] = [];

  turnosL: string[] = [];
  turnosM: string[] = [];
  turnosMi: string[] = [];
  turnosJ: string[] = [];
  turnosV: string[] = [];
  turnosS: string[] = [];
  turnosD: string[] = [];



  ngOnInit(): void {
    this.obtenerEmpleados()
    this.obtenerTurnos()
    //this.valorTurnos = ["uno1","dos1","tres1"];
    //this.valorSelect = ["uno1","dos1"];
  }

  ngAfterViewInit(){
    
  }

  obtenerEmpleados(){
    console.log("entra al obtener empleados");
    this.servicioHttp.obtenerEmpleados()
    .subscribe((jsonFile:any)=>{
     
      console.log(jsonFile);
      this.datosEmp = jsonFile;
      
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }

  obtenerTurnosEmp(){ 


    this.horarioSemanal = this.empleadoSeleccionado.HorarioSemanal;
    console.log("horario semanal: ", this.horarioSemanal);

    this.horarioSemanal.forEach((element: any) => {
      console.log("elem.dias:", element.Dia);
      switch (element.Dia){
        case "Lunes":
          element.Turnos.forEach((e:any) => {
            e=e+"1";
            this.selectL.push(e);           
          });
          console.log("elemento de dia lunes:",this.selectL);
          break;
        case "Martes":
          element.Turnos.forEach((e:any) => {
            e=e+"2";
            this.selectM.push(e);           
          });
          console.log("elemento de dia mARTES:",this.selectM);
          break;
        case "Miercoles":
          element.Turnos.forEach((e:any) => {
            e=e+"3";
            this.selectMi.push(e);           
          });
          console.log("elemento de dia MI:",this.selectMi);
          break;
        case "Jueves":
          element.Turnos.forEach((e:any) => {
            e=e+"4";
            this.selectJ.push(e);           
          });
          console.log("elemento de dia J:",this.selectJ);
          break;
        case "Viernes":
          element.Turnos.forEach((e:any) => {
            e=e+"5";
            this.selectV.push(e);           
          });
          console.log("elemento de dia V:",this.selectV);
          break;
        case "Sabado":
          element.Turnos.forEach((e:any) => {
            e=e+"6";
            this.selectS.push(e);           
          });
          console.log("elemento de dia S:",this.selectS);
          break;
        default:
          element.Turnos.forEach((e:any) => {
            e=e+"7";
            this.selectD.push(e);           
          });
          console.log("elemento de dia D :",this.selectD);
          break;
      }
      
    });
    /*
    this.servicioHttp.obtenerEmpleado(this.empleadoSeleccionado.id)
    .subscribe((jsonFile:any)=>{
     
      this.datosTurnEmp= jsonFile;
      console.log("turnos de un empleado: " , this.datosTurnEmp);
      

    } ,(error)=>{
        console.log("hubo error ing")

    } )*/
  }


  funcionBoton( names: any){
    this.empleadoSeleccionado = names[1];
    if (names[0] == "Ver Turnos"){
        console.log(this.empleadoSeleccionado);
        this.obtenerTurnosEmp();

        //Llenar el modal de Turnos de un empleado 
        this.basico.forEach((e:any) => {
          this.valorTurnos.push(e.id);
        });
        console.log("todos los turnos:", this.valorTurnos);

        this.llenarTurnos();
        this.bo=true;


        this.servicioModal.abrir('modalMostrarTurnos');
    }
    else{
      this.servicioModal.abrir('modalTurosEmpleados');
    }
  }

 
  displayArray(theArray: any){
  this.outputTableArray=theArray;
  console.log("el array  fuera de comp:",theArray);
  }
 

  funcionCancelarTurno(){
    
    this.servicioModal.cerrar('modalTurnos');
    (<HTMLInputElement>document.getElementById('rTurnos')).checked= false;
  }
  
  funcionCancelarTurnEmpleado(){
    this.servicioModal.cerrar('modalTurosEmpleados');
    (<HTMLInputElement>document.getElementById('rTEmpleados')).checked= false;
  }

  obtenerTurnos(){
    
    this.servicioHttp.obtenerHorarios()
    .subscribe((jsonFile:any)=>{
     
      console.log("eljson",jsonFile);
      this.basico = jsonFile;
      
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }

  llenarTurnos(){
    this.valorTurnos.forEach(element => {
      this.turnosL.push(element+"1");
      this.turnosM.push(element+"2");
      this.turnosMi.push(element+"3");
      this.turnosJ.push(element+"4");
      this.turnosV.push(element+"5");
      this.turnosS.push(element+"6");
      this.turnosD.push(element+"7");
      
    });
  }


}


