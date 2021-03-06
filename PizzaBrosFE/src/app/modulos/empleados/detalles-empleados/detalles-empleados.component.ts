import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';

@Component({
  selector: 'app-detalles-empleados',
  templateUrl: './detalles-empleados.component.html',
  styleUrls: ['./detalles-empleados.component.css']
})
export class DetallesEmpleadosComponent implements OnInit {



  datos: any | undefined;

  columnas = [
    {field:'CI',header:'CI Empleado'},
    {field:'Nombre',header:'Nombre de Empleado'},
    {field:'ApellidoP',header:'Apellido Paterno Empleado'},
    {field:'ApellidoM',header:'Apellido Materno Empleado'},
    {field:'Celular',header:'Celular Empleado'},
    {field:'FechaNacimiento',header:'Fecha Nacimiento'},
    {field:'Cargo',header:'Cargo Empleado'}
  ];
  nombreBotonesEmpleados= ["Modificar Empleado"] ;
  objetoSeleccionado :any = undefined ;
  nombreBoton:any;
  idBackup:any;

  constructor(public modalServicio:ModalService, private servicioHttp: AppHttpService) { }


  ngOnInit(): void {

    this.obtenerEmpleados();
    
  }

  obtenerEmpleados(){

    this.servicioHttp.obtenerEmpleados()
    .subscribe((jsonFile)=>{
      this.datos = jsonFile;
       
      this.modificarFecha();

    } )


  }
  crearEmpleado(body:any){

    this.servicioHttp.crearEmpleado(body)
    .subscribe((jsonFile)=>{
      alert("Empleado creado correctamente");

    } )


  }
  actualizarEmpleado(id:any,body:any){

    this.servicioHttp.actualizarEmpleado(id,body)
    .subscribe((jsonFile)=>{
      alert("Empleado modificado correctamente");

    } )


  }


  modificarFecha(){

    
    this.datos.forEach((element:any) => {
     let fecha = element.FechaNacimiento.seconds;
     let date;
     let date2;
     let date3 ;

     date = new Date(fecha * 1000);


      date3 = date.toLocaleDateString();
      let dia :string=date.getDate().toString();
      let anio =date.getFullYear().toString();
      let mes = (date.getMonth() +1).toString();

      if(mes.length == 1){

        mes  = "0" + mes;
      }
      if(dia.length == 1){

        dia  = "0" + dia;
      }
      date2 = anio + "-" + mes + "-" + dia;
      
      date3 = mes + "/" + dia + "/" + anio;
     element.FechaNacimiento = date2;
    });

    

  }
  funcionBoton( resultados: any){
    this.objetoSeleccionado =  resultados[1]
    if (resultados[0] == "Modificar Empleado" ){
      this.nombreBoton = "Modificar"
      this.modalServicio.abrir('modalEmpleado-01');
      this.rellenarCampos();

    }
    if(resultados[0]=="Crear Empleado"){

      this.nombreBoton = "Crear";
      this.rellenarValores();
      this.modalServicio.abrir('modalEmpleado-01');

    }


  }

  rellenarCampos(){
    
    this.idBackup = this.objetoSeleccionado.id;
    (<HTMLInputElement>document.getElementById("nombreEmpleado")).value = this.objetoSeleccionado.Nombre;
   (<HTMLInputElement>document.getElementById("ciEmpleado")).value = this.objetoSeleccionado.CI; 
    (<HTMLInputElement>document.getElementById("apellidoPE")).value = this.objetoSeleccionado.ApellidoP;
    (<HTMLInputElement>document.getElementById("apellidoME")).value = this.objetoSeleccionado.ApellidoM;
    (<HTMLInputElement>document.getElementById("ceEmpleado")).value = this.objetoSeleccionado.Celular;
    (<HTMLInputElement>document.getElementById("cargoEmpleado")).value = this.objetoSeleccionado.Cargo;
    (<HTMLInputElement>document.getElementById("fechaNacE")).value = this.objetoSeleccionado.FechaNacimiento;

  }

  rellenarValores()
  {
      
      this.objetoSeleccionado.Nombre = (<HTMLInputElement>document.getElementById("nombreEmpleado")).value;
      this.objetoSeleccionado.CI = (<HTMLInputElement>document.getElementById("ciEmpleado")).value ;
      this.objetoSeleccionado.ApellidoP =(<HTMLInputElement>document.getElementById("apellidoPE")).value ;
      this.objetoSeleccionado.ApellidoM = (<HTMLInputElement>document.getElementById("apellidoME")).value ;
      this.objetoSeleccionado.Celular =(<HTMLInputElement>document.getElementById("ceEmpleado")).value ;
      this.objetoSeleccionado.Cargo = (<HTMLInputElement>document.getElementById("cargoEmpleado")).value;
      this.objetoSeleccionado.FechaNacimiento = (<HTMLInputElement>document.getElementById("fechaNacE")).value;


  }

  crearModificarEmpleado()
  {
    
    var fechad = (<HTMLInputElement>document.getElementById("fechaNacE")).value;
    if(this.nombreBoton=="Crear"){

      this.objetoSeleccionado = [];
      this.rellenarValores();
      
      var nuevoEmpleado = JSON.stringify({Nombre: this.objetoSeleccionado.Nombre , ApellidoP: this.objetoSeleccionado.ApellidoP , 
      ApellidoM: this.objetoSeleccionado.ApellidoM , 
      CI:this.objetoSeleccionado.CI , Celular:this.objetoSeleccionado.Celular, 
      Cargo:this.objetoSeleccionado.Cargo, FechaNacimiento:this.objetoSeleccionado.FechaNacimiento});

     this.crearEmpleado(JSON.parse(nuevoEmpleado));
    }
    else{
      //modificar
      this.rellenarValores();
      this.actualizarEmpleado(this.idBackup, this.objetoSeleccionado);

    }

    this.obtenerEmpleados();

  }

  funcionBorrarCampos(){
    (<HTMLInputElement>document.getElementById("nombreEmpleado")).value = "";
    (<HTMLInputElement>document.getElementById("ciEmpleado")).value = "";
    (<HTMLInputElement>document.getElementById("apellidoPE")).value = "";
    (<HTMLInputElement>document.getElementById("apellidoME")).value = "";
    (<HTMLInputElement>document.getElementById("ceEmpleado")).value = "";
    (<HTMLInputElement>document.getElementById("cargoEmpleado")).value = "";
    (<HTMLInputElement>document.getElementById("fechaNacE")).value = "";
  }



}
