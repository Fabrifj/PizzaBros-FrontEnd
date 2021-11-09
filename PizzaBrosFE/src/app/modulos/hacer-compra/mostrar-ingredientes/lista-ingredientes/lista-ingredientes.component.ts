import { Component, Input, OnInit } from '@angular/core';
import { ingredienteModel } from 'src/app/modelos/ingrediente.model';
import { HacerCompraService } from '../../hacer-compra.service';

@Component({
  selector: 'app-lista-ingredientes',
  templateUrl: './lista-ingredientes.component.html',
  styleUrls: ['./lista-ingredientes.component.css']
})
export class ListaIngredientesComponent implements OnInit {

  
  @Input() product!: ingredienteModel;
  @Input() index=0; 
  
  constructor(private hacerCompraServicio:HacerCompraService) { }

  ngOnInit(): void {
  }
  anhadirIngrediente(){
    this.hacerCompraServicio.addIngrediente(this.product,1);
  }

}
