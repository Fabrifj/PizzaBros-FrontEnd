import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sueldos-empleados',
  templateUrl: './sueldos-empleados.component.html',
  styleUrls: ['./sueldos-empleados.component.css']
})
export class SueldosEmpleadosComponent implements OnInit {

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
