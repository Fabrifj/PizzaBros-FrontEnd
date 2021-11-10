import { Component, OnInit } from '@angular/core';
import { RutaTituloModel } from 'src/app/modelos/rutaTitulo.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor() { }
  

  subMenus : RutaTituloModel[] = [
    {Ruta: "crear-productos",Nombre: "Crear Producto"},
    {Ruta: "crear-categorias",Nombre: "Crear Familia"}
  ];
  ngOnInit(): void {

    
  }

}
