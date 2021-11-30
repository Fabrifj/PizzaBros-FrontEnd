import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';
import { BtnsSeleccionadosComponent } from './btns-seleccionados/btns-seleccionados.component';

@Component({
  selector: 'app-turnos-empleados',
  
  templateUrl: './turnos-empleados.component.html',
  styleUrls: ['./turnos-empleados.component.css']
  
})
export class TurnosEmpleadosComponent implements OnInit {
  

  constructor(private servicioHttp: AppHttpService, public servicioModal: ModalService) { }

@ViewChild(BtnsSeleccionadosComponent) hijoBotones:BtnsSeleccionadosComponent  | undefined;

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
  select: string[] = [];
  

  horarioSemanal: string[] = [];

  turnos: string[] = [];
  



  ngOnInit(): void {

    
    this.obtenerEmpleados()
    this.obtenerTurnos()
    //this.valorTurnos = ["uno1","dos1","tres1"];
    //this.valorSelect = ["uno1","dos1"];
    
  }

  ngAfterContentInit(){
    
    console.log("=============componente charged");
    


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
            this.select.push(e);           
          });
          
          break;
        case "Martes":
          element.Turnos.forEach((e:any) => {
            e=e+"2";
            this.select.push(e);           
          });
          
          break;
        case "Miercoles":
          element.Turnos.forEach((e:any) => {
            e=e+"3";
            this.select.push(e);           
          });
          
          break;
        case "Jueves":
          element.Turnos.forEach((e:any) => {
            e=e+"4";
            this.select.push(e);           
          });
     
          break;
        case "Viernes":
          element.Turnos.forEach((e:any) => {
            e=e+"5";
            this.select.push(e);           
          });

          break;
        case "Sabado":
          element.Turnos.forEach((e:any) => {
            e=e+"6";
            this.select.push(e);           
          });
         
          break;
        default:
          element.Turnos.forEach((e:any) => {
            e=e+"7";
            this.select.push(e);           
          });
          
          break;
      }
      
    });


    console.log("sus horarios del empleados :",this.select);
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

        this.basico.forEach((e:any) => {
          this.valorTurnos.push(e.id);
        });
    
        //this.llenarTurnos();

        //Llenar el modal de Turnos de un empleado 
        
        console.log("todos los turnos:", this.valorTurnos);
        
       
        this.obtenerTurnosEmp();
        
        


        this.bo=true;
        
        //this.hijoBotones?.checkedElem();
        this.checkedElem();
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


    console.log("en llenar turnos");
    this.valorTurnos.forEach(element => {
      this.turnos.push(element+"1");
      this.turnos.push(element+"2");
      this.turnos.push(element+"3");
      this.turnos.push(element+"4");
      this.turnos.push(element+"5");
      this.turnos.push(element+"6");
      this.turnos.push(element+"7");
      
    });
  }



  //===========================================
  dias:string[] =["1","2","3","4","5","6","7"];
  seleccionados: string[] = [];


  checkedElem(){

    console.log("en padre")
    console.log("=====Tickeando========")
    
    console.log("los select son:", this.select);
    this.select.forEach((elem:any) => {
      console.log("el elemento es: ",elem);
      (<HTMLInputElement>document.getElementById(elem)).checked = true;

      console.log("despeus de tiquear");
    });
  }

  chbOn(){

    console.log("cambiando");
/*
    elem:any
    if((<HTMLInputElement>document.getElementById(elem)).checked == true)
    {
      this.seleccionados.push(elem);
    }else
    {
      this.eliminar(elem);
    }
    */
  }

  eliminar(elemento:any) {
    var resultado = []
    for (var i = 0; i < this.seleccionados.length; i++) {
      if (this.seleccionados[i] !== elemento) {
        resultado.push(this.seleccionados[i]);
      }
    }
    this.seleccionados = resultado;
  }



}


