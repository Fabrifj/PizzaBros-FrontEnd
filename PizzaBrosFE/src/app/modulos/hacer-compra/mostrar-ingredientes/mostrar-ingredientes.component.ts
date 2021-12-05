import { Component, OnInit } from '@angular/core';
import { ArticuloListaModel } from 'src/app/modelos/articuloLista.model';
import { ElementoModel } from 'src/app/modelos/elementos.model';
import { AppHttpService } from 'src/app/servicios/app-http.service';

import { HacerCompraService } from '../hacer-compra.service';

@Component({
  
  selector: 'app-mostrar-ingredientes',
  templateUrl: './mostrar-ingredientes.component.html',
  styleUrls: ['./mostrar-ingredientes.component.css']
})
export class MostrarIngredientesComponent implements OnInit {

  ingrediente: ElementoModel|any ; 
  articulos:ArticuloListaModel[] =[];
  id:string='';
  categorias:string[] =[];
  datosCat:any|undefined;

  constructor(private servicioHttp: AppHttpService,private hacerCompraService:HacerCompraService) { }

  ngOnInit(): void {
    this.categorias = this.hacerCompraService.obtenerNombres();
    
    console.log('En ingredientes',this.categorias)
    this.obtenerCategorias()
  }

  obtenerCategorias(){
    this.servicioHttp.obtenerElementos()
    .subscribe((jsonFile:any)=>{
     
      console.log("Obtenido en ingredientes",jsonFile);
      this.datosCat = jsonFile;
    } ,(error)=>{
        console.log("hubo error obteniendo elementos")

    } )
  }

  actualizarCategoria(categoria:string){
    this.ingrediente = this.hacerCompraService.obtenerElementos(categoria);
    console.log('Ingrediente seleccionado',this.ingrediente)
    this.articulos = this.ingrediente.ListaArticulos;
    console.log('Articulos seleccionados',this.articulos)
    this.id=this.ingrediente.id
  }


}
