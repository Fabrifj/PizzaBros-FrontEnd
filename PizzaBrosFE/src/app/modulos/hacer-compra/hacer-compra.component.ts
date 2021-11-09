import { Component, OnInit } from '@angular/core';
import { HacerCompraService } from './hacer-compra.service';

@Component({
  selector: 'app-hacer-compra',
  templateUrl: './hacer-compra.component.html',
  styleUrls: ['./hacer-compra.component.css']
})
export class HacerCompraComponent implements OnInit {

  constructor(private hacerCompraServicio : HacerCompraService) { }

  ngOnInit(): void {
  }
  registrarCompra(){
    this.hacerCompraServicio.registrarCompra()
  }
}
