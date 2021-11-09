import { Component, OnInit } from '@angular/core';
import { RutaTituloModel } from 'src/app/modelos/rutaTitulo.model';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  subMenus : RutaTituloModel[] = [
    {Ruta: "detalles-empleados",Nombre: "Detalles"},
    {Ruta: "sueldos-empleados",Nombre: "Sueldos"},
    {Ruta: "turnos-empleados",Nombre: "Turnos"},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
