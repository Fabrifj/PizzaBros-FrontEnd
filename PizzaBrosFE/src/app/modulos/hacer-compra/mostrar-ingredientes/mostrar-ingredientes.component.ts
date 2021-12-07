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
    this.obtenerCategorias()
  }

  obtenerCategorias(){
    this.servicioHttp.obtenerElementos()
    .subscribe((jsonFile:any)=>{
      this.datosCat = jsonFile;
    } ,(error)=>{
        console.log("hubo error obteniendo elementos")

    } )
  }

  actualizarCategoria(categoria:string){
    this.ingrediente = this.hacerCompraService.obtenerElementos(categoria);
    this.articulos = this.ingrediente.ListaArticulos;
    this.id=this.ingrediente.id
  }


}
