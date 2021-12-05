import { Component, OnInit } from '@angular/core';
import { ArticuloModel } from 'src/app/modelos/articulo.model';
import { ElementoModel } from 'src/app/modelos/elementos.model';

import { HacerCompraService } from '../hacer-compra.service';

@Component({
  
  selector: 'app-mostrar-ingredientes',
  templateUrl: './mostrar-ingredientes.component.html',
  styleUrls: ['./mostrar-ingredientes.component.css']
})
export class MostrarIngredientesComponent implements OnInit {

  ingrediente: ElementoModel|any ; 
  articulos:ArticuloModel[] =[];
  categorias:string[] =[];

  constructor(private hacerCompraService:HacerCompraService) { }

  ngOnInit(): void {
    this.hacerCompraService.ngOnInit()
    this.categorias = this.hacerCompraService.obtenerNombres();
    
    console.log(this.categorias)
  }

  actualizarCategoria(categoria:string){
    this.ingrediente = this.hacerCompraService.obtenerElementos(categoria);
    console.log(this.ingrediente)
    this.articulos = this.ingrediente.ListaArticulos;
    console.log(this.articulos)
  }


}
