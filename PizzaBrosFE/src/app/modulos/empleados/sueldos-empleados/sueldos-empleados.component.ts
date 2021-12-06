import { Component, OnInit } from '@angular/core';
import { TransaccionModel } from 'src/app/modelos/transaccion.model';
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
    {field:'Apellido',header:'Apellido'},
    {field:'Nombre',header:'Nombre '},
    {field:'CI',header:'CI'},
    {field:'Fecha Nacimiento',header:'Fecha de inicio'},
    {field:'SueldoBase',header:'Sueldo Base'},
    {field:'SueldoReal',header:'Sueldo Real'}

  ];

  nombreBotones: string[] = ["PagarSueldo"];

  ngOnInit(): void {
    this.obtenerCaja();
  }
 
  funcionBoton( nombres: any){
    let time = new Date();
    let pago:TransaccionModel = new TransaccionModel(nombres[1].SueldoReal,nombres[0],time,"egreso" );
    this.servicioHttp.crearRegistro(pago).subscribe((r:any)=> {
      console.log(r)
    })
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
