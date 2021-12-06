import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArticuloCompradoModel } from 'src/app/modelos/articuloComprado.model';
import { HacerCompraService } from '../hacer-compra.service';

@Component({
  selector: 'app-lista-armada-compras',
  templateUrl: './lista-armada-compras.component.html',
  styleUrls: ['./lista-armada-compras.component.css']
})
export class ListaArmadaComprasComponent implements OnInit {

  @ViewChild('amountInput', { static: false }) amount: ElementRef ;

  ingredientes:ArticuloCompradoModel[]=[];
  catidadIngredientes:number=0;
  totalCompra:number=0;
  constructor(public hacerCompraServicio:HacerCompraService) { }

  ngOnInit(): void {
    this.hacerCompraServicio.comprasCambio.subscribe(
      (newOrders:  ArticuloCompradoModel[])=>{
        this.hacerCompraServicio.ingredintes = newOrders;
        this.calcularActualizacion();

      }
    )
  }
  calcularActualizacion(){
    this.catidadIngredientes = 0;
    this.totalCompra =0; 
    this.catidadIngredientes = this.hacerCompraServicio.ingredintes.length;
    for (let index = 0; index < this.catidadIngredientes; index++) {
      this.totalCompra += this.hacerCompraServicio.ingredintes[index].Precio;  
    }
  }


  eliminarPedido(i:number){
    let foo_object  = this.hacerCompraServicio.ingredintes[i]// Item to remove
    this.hacerCompraServicio.ingredintes = this.hacerCompraServicio.ingredintes.filter(obj => obj !== foo_object);
    alert('Elimino un elemento');
    this.calcularActualizacion();
  }

}
