import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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



  columnasInforme :any = []
  datosInforme :any = []

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
  



  ngOnInit() {

    
    this.obtenerEmpleados()
    this.obtenerTurnos()
   //await new Promise(resolve => setTimeout(resolve, 7000));
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
     
      console.log("los empleado son",jsonFile);
      this.datosEmp = jsonFile;
      
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }

  obtenerTurnosEmp(){ 


    this.horarioSemanal = this.empleadoSeleccionado.HorarioSemanal;
    console.log("horario semanal empleado: ", this.horarioSemanal);
    this.select = []
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
    
  }


funcionBoton( names: any){
    this.empleadoSeleccionado = names[1];
    if (names[0] == "Ver Turnos"){
        

        
        console.log("todos los turnos:", this.valorTurnos);
        
       
        this.obtenerTurnosEmp();
        
        


        this.bo=true;
       
 
       
        this.hijoBotones?.checkedElem();
       
       
        this.servicioModal.abrir('modalMostrarTurnos');
        
        
        
    }
    else{
      

      this.armarInforme();
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

          //crear las columnas de la tabla informe
      var i = 0;

      this.columnasInforme.push({field:'Fecha',header:'Fecha'});
      this.basico.forEach((e:any) => {
        this.valorTurnos.push(e.id);

        var columna :any= {}
        columna['field'] = e.id;
        columna['header'] = e.id;
        this.columnasInforme.push(columna);
        i++;
      });
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }




  
  destiquear(){
    this.hijoBotones?.destiquear();
    
    console.log("Imprimiento resultado",this.outputTableArray);

  }

  armarInforme(){
    
    console.log("empelado Seleccionado",this.empleadoSeleccionado);

    

    var i = 0 ;
    this.empleadoSeleccionado.ListaTurnos.forEach((elem:any) => {
      var fecha = new Date((elem.Fecha.seconds) * 1000).toLocaleDateString();
      var miniDatos:any = {}
     
      miniDatos['Fecha'] = fecha;
      elem.Turnos.forEach((turno:any) => {
        
        var id = turno.Id;
        miniDatos[id] = turno.Estado;

      });

          
      this.datosInforme[i] = miniDatos;
      i++;
    });

    console.log("columnas", this.columnasInforme)
    console.log("datos Informe:", this.datosInforme);

  }

  armarColumnas(){

    
  }

 
  

 


}


