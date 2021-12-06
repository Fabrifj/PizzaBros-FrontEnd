import { CompileShallowModuleMetadata } from '@angular/compiler';
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
    {field:'Celular',header:'Celular'},
    {field:'Cargo',header:'Cargo'}
  ];
  nombreBotonesEmp: string[] = ['Ver Turnos','Ver Informe'];


  

  columnasTurn = [
    {field:'id',header:'Nombre'},
    {field:'HoraEntrada',header:'Hora Inicio'},
    {field:'HoraSalida',header:'Hora Fin'}
  ];
  nombreBotonTurn: string[] = ['-']

  outputTableArray: any=[];
  paraenviar: any;



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
  

  diasSemana:any = 
    {"1":"Lunes",
    '2':"Martes",
    '3':'Miercoles',
    '4':'Jueves',
    '5':'Viernes',
    '6':'Sabado',
    '7':'Domingo'};

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
  console.log("el array  fuera de comp:",this.outputTableArray);



  
  }
 

  funcionCancelarTurno(){
    
    this.servicioModal.cerrar('modalTurnos');
    (<HTMLInputElement>document.getElementById('rTurnos')).checked= false;
    console.log("los datos de basico:", this.basico);
  }
  
  funcionCancelarTurnEmpleado(){
    this.servicioModal.cerrar('modalTurosEmpleados');
    (<HTMLInputElement>document.getElementById('rTEmpleados')).checked= false;
  }

  obtenerTurnos(){
    this.valorTurnos=[];
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

 
  

 
  funcionGuardarTurno(){
    alert("Tabla turnos actualizada");
    var nombre = (<HTMLInputElement>document.getElementById('nombreT')).value;
    var entrada= (<HTMLInputElement>document.getElementById('inicioT')).value;
    var salida = (<HTMLInputElement>document.getElementById('finT')).value
    console.log("el nombre puesto es: ",nombre);
    console.log("el vector valores: ",this.valorTurnos);
    if(this.valorTurnos?.includes(nombre))
    {   
      var elemNuevo = JSON.stringify({HoraEntrada: entrada, HoraSalida: salida});
      this.servicioHttp.actualizarHorario(nombre,JSON.parse(elemNuevo)).subscribe((jsonFile:any)=>{      
        this.obtenerTurnos()
      } ,(error)=>{
          console.log("hubo error con productos")
      } )


    }else{
      var elemNuevo = JSON.stringify({HoraEntrada: entrada, HoraSalida: salida});
      this.servicioHttp.crearHorario(nombre,JSON.parse(elemNuevo)).subscribe((jsonFile:any)=>{
     
        console.log("turno creado con exito",jsonFile);       
        this.obtenerTurnos()
      } ,(error)=>{
          console.log("hubo error con productos")
      } )
    }
  }
  funcionBotonElim(names: any){
    var turnoSelect = names[1];
    this.servicioHttp.eliminarHorario(turnoSelect.id).subscribe();
    this.obtenerTurnos();
  }
  

  guardarTurnosNuevos(){
    alert("Actualizando los turnos de este empleado");
    //this.empleadoSeleccionado
    console.log("los botones seleccionados son: ", this.outputTableArray);
    var horario:string;
    var dia:string;
    var listaHorarioSemana:any=[];
    var aux1:any=[];
    var aux2:any=[];
    var aux3:any=[];
    var aux4:any=[];
    var aux5:any=[];
    var aux6:any=[];
    var aux7:any=[];
    var enviar:any;


    var today = new Date();
    let diaH :string=today.getDate().toString();
      let anio =today.getFullYear().toString();
      let mes = (today.getMonth() +1).toString();

      if(mes.length == 1){

        mes  = "0" + mes;
      }
      if(diaH.length == 1){

        dia  = "0" + diaH;
      }
      var todayDate = anio + "-" + mes + "-" + diaH;



    this.outputTableArray.forEach((elem:any) => {
      dia=elem.substr(-1); //dia 1,2,3
      horario=elem.substring(0,elem.length - 1); // horario A,B,C,D
      
      switch (this.diasSemana[dia]){
        case "Lunes":
          aux1.push(horario);
          break;
        case "Martes":
          aux2.push(horario);
          break;
        case "Miercoles":
          aux3.push(horario);
          break;
        case "Jueves":
          aux4.push(horario);
          break;
        case "Viernes":
          aux5.push(horario);
          break;
        case "Sabado":
          aux6.push(horario);
          break;
        default:
          aux7.push(horario);
          break;
      }

    });

    
    listaHorarioSemana.push({Dia:"Lunes","Turnos": aux1});
    listaHorarioSemana.push({Dia:"Martes","Turnos": aux2});
    listaHorarioSemana.push({Dia:"Miercoles","Turnos": aux3});
    listaHorarioSemana.push({Dia:"Jueves","Turnos": aux4});
    listaHorarioSemana.push({Dia:"Viernes","Turnos": aux5});
    listaHorarioSemana.push({Dia:"Sabado","Turnos": aux6});
    listaHorarioSemana.push({Dia:"Domingo","Turnos": aux7});


    enviar=JSON.stringify({"IdEmpleado":this.empleadoSeleccionado.id,"FechaTurnos":todayDate,"HorarioSemanal":listaHorarioSemana});

    console.log("horario para enviar: ",enviar);
    this.servicioHttp.calcularHorario(enviar).subscribe();


  }


}


