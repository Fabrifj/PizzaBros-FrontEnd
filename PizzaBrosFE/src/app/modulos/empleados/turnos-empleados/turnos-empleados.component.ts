import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turnos-empleados',
  templateUrl: './turnos-empleados.component.html',
  styleUrls: ['./turnos-empleados.component.css']
})
export class TurnosEmpleadosComponent implements OnInit {

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
