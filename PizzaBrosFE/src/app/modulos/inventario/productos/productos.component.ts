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
    {Ruta: "ver-productos",Nombre: "Ver Productos/Categorias"},
    {Ruta: "creacion-productos",Nombre: "Crear/Modificar Producto"},
    {Ruta: "creacion-categorias",Nombre: "Crear/Modificar Categoria"}
    
  ];
  ngOnInit(): void {
 
    
  }

}
