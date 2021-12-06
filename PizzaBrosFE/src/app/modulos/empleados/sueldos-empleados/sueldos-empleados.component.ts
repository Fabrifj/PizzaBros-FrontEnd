import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';

@Component({
  selector: 'app-sueldos-empleados',
  templateUrl: './sueldos-empleados.component.html',
  styleUrls: ['./sueldos-empleados.component.css']
})
export class SueldosEmpleadosComponent implements OnInit {

  constructor(private servicioHttp: AppHttpService) { 
 
  }

  datos: any | undefined;

  columnas = [
    {field:'Nombre',header:'Nombre '},
    {field:'ApellidoP',header:'Apellido Paterno'},
    {field:'CI',header:'Identificacion'},
    {field:'FechaNacimiento',header:'Fecha de inicio'},
    {field:'Estado',header:'Estado'}
  ];

  nombreBotones: string[] = ["PagarSueldo"];

  ngOnInit(): void {
    this.obtenerCaja();
  }
 
  funcionBoton( nombres: any){

  }
  obtenerCaja(){

    this.servicioHttp.obtenerSueldoEmpleados()
    .subscribe((jsonFile)=>{
      //this.Orders = this.JSON_MAPPER.readValue(jsonFile, FinalOrderModel[])
      console.log(jsonFile);
      this.datos = jsonFile;
       
    } )


  }

}
