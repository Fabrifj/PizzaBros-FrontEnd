import { Component, OnInit } from '@angular/core';
import { CajaService } from './caja.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {

  datos: any | undefined;

  columnas = [
    {field:'Fecha',header:'Fecha'},
    {field:'Tipo',header:'Tipo'},
    {field:'Descripcion',header:'Descripcion'},
    {field:'Cantidad',header:'Cantidad'},
  ];
  saldoTotal:number=0;

  nombreBotones: string[] | undefined;
  constructor( private cajaServicio:CajaService ) { 
    this.datos = cajaServicio.getTransacciones()
  }



  ngOnInit(): void {
  }
  funcionBoton( nombres: any){

  }

}
