import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
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


  datosTurn: any | undefined;

  columnasTurn = [
    {field:'Nombre',header:'Nombre'},
    {field:'HoraInicio',header:'Hora Inicio'},
    {field:'HoraFin',header:'Hora Fin'}
  ];

  outputTableArray: any=[];

  ngOnInit(): void {
    this.obtenerEmpleados()
  }


  obtenerEmpleados(){
    this.servicioHttp.obtenerEmpleados()
    .subscribe((jsonFile:any)=>{
     
      console.log(jsonFile);
      this.datosEmp = jsonFile;
      
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }

  obtenerTurnosEmp(){ /*
    this.servicioHttp.obtenerEmpleado(this.empleadoSeleccionado.id)
    .subscribe((jsonFile:any)=>{
     
      console.log(jsonFile);
      this.datosTurnEmp= jsonFile;
      
      

    } ,(error)=>{
        console.log("hubo error ing")

    } )*/
  }


  funcionBoton( names: any){
    this.empleadoSeleccionado = names[1];
    if (names[0] == "Ver Turnos"){
        console.log(this.empleadoSeleccionado);
        this.obtenerTurnosEmp();

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
}
