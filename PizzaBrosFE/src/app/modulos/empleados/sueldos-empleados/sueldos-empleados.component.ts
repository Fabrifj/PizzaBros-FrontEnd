import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sueldos-empleados',
  templateUrl: './sueldos-empleados.component.html',
  styleUrls: ['./sueldos-empleados.component.css']
})
export class SueldosEmpleadosComponent implements OnInit {

  constructor() { 
 
  }

  datos: any | undefined;

  columnas = [
    {field:'Nombre',header:'Nombre '},
    {field:'ApellidoP',header:'Apellido Paterno'},
    {field:'CI',header:'Identificacion'},
    {field:'FechaNacimiento',header:'Fecha de inicio'},
    {field:'Estado',header:'Estado'}
  ];

  nombreBotones: string[] | undefined;

  ngOnInit(): void {
  }
  funcionBoton( nombres: any){

  }

}
