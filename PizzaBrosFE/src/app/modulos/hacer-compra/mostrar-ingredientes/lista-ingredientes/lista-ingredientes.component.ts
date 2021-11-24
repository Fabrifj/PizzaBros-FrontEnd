import { Component, Input, OnInit } from '@angular/core';
import { ArticuloModel } from 'src/app/modelos/articulo.model';
import { HacerCompraService } from '../../hacer-compra.service';

@Component({
  selector: 'app-lista-ingredientes',
  templateUrl: './lista-ingredientes.component.html',
  styleUrls: ['./lista-ingredientes.component.css']
})
export class ListaIngredientesComponent implements OnInit {

  
  @Input() product!: ArticuloModel;
  @Input() index=0; 
  
  constructor(private hacerCompraServicio:HacerCompraService) { }

  ngOnInit(): void {
  }
  anhadirIngrediente(){
    this.hacerCompraServicio.addIngrediente(this.product,1,10);
  }

}
