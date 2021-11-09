import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ingredienteModel } from 'src/app/modelos/ingrediente.model';
import { HacerCompraService } from '../hacer-compra.service';

@Component({
  selector: 'app-lista-armada-compras',
  templateUrl: './lista-armada-compras.component.html',
  styleUrls: ['./lista-armada-compras.component.css']
})
export class ListaArmadaComprasComponent implements OnInit {

  @ViewChild('amountInput', { static: false }) amount: ElementRef ;

  ingredientes:ingredienteModel[]=[];
  catidadIngredientes:number=0;
  totalCompra:number=0;
  constructor(private hacerCompraServicio:HacerCompraService) { }

  ngOnInit(): void {
    this.hacerCompraServicio.comprasCambio.subscribe(
      (newOrders:  ingredienteModel[])=>{
        this.ingredientes = newOrders;
        this.calcularActualizacion();

      }
    )
  }
  calcularActualizacion(){
    this.catidadIngredientes = 0;
    this.totalCompra =0; 
    this.catidadIngredientes = this.ingredientes.length;
    for (let index = 0; index < this.ingredientes.length; index++) {
      this.totalCompra += this.ingredientes[index].CostoUnidad;  
    }
  }


  eliminarPedido(i:number){
    let foo_object  = this.ingredientes[i]// Item to remove
    this.ingredientes = this.ingredientes.filter(obj => obj !== foo_object);
    alert('Elimino un elemento');
    this.calcularActualizacion();
  }

}
