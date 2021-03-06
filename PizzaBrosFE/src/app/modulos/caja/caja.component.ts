import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { CajaService } from './caja.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {

  datos: any | undefined;

  moment :any;
  columnas = [
    {field:'Fecha',header:'Fecha'},
    {field:'Tipo',header:'Tipo'},
    {field:'Descripcion',header:'Descripcion'},
    {field:'Cantidad',header:'Cantidad'},
  ];
  saldoTotal:number=0;

  nombreBotones: string[] | undefined;
  constructor( private servicioHttp:AppHttpService ) {  }



  ngOnInit(): void {

    this.obtenerBalanceCaja();
    
  }
  obtenerBalanceCaja(){
    this.servicioHttp.obtenerBalanceCaja()
      .subscribe((jsonFile)=>{     
        this.moment = jsonFile; 
        this.saldoTotal =this.moment.Balance.Cantidad;  
        this.datos = this.moment.Transacciones;
        this.modificarFecha();

      })
  }

 

  funcionBoton( nombres: any){

  }

  
  modificarFecha(){
    this.datos.forEach((element:any) => {
     let fecha = element.Fecha.seconds;
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
     element.Fecha = date2;
    });

  }
  saldoTotalCalculated(){
    let c = 0;
    this.datos.forEach((element:any) => {
      c+= element.Cantidad;

    })
    this.saldoTotal = c;
  }

}
