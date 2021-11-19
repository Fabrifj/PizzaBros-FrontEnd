import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalles-empleados',
  templateUrl: './detalles-empleados.component.html',
  styleUrls: ['./detalles-empleados.component.css']
})
export class DetallesEmpleadosComponent implements OnInit {

  constructor() { }

  datos: any | undefined;

  columnas = [
    {field:'NITCliente',header:'NIT de Cliente'},
    {field:'NombreCliente',header:'Nombre de Cliente'},
    {field:'Precio',header:'Total Bs.'},
    {field:'Fecha',header:'Fecha'},
    {field:'Estado',header:'Estado'}
  ];
  nombreBotones: string[] | undefined;

  ngOnInit(): void {
  }
  funcionBoton( nombres: any){

  }

}
