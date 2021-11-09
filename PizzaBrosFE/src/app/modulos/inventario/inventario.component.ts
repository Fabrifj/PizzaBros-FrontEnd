import { Component, OnInit } from '@angular/core';
import { RutaTituloModel } from 'src/app/modelos/rutaTitulo.model';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  constructor() { }
  subMenus : RutaTituloModel[] = [
    {Ruta: "compras",Nombre: "Compras"},
    {Ruta: "bienes",Nombre: "Bienes"},
    {Ruta: "ingredientes",Nombre: "Ingredientes"},
    {Ruta: "productos",Nombre: "Productos"},
  ];
  ngOnInit(): void {
  }

}
