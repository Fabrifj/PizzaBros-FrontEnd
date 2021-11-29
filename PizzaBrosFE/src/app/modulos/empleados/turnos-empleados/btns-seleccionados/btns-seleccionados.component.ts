import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UnitOrderModel } from 'src/app/modelos/unitOrder.model';

@Component({
  selector: 'app-btns-seleccionados',
  templateUrl: './btns-seleccionados.component.html',
  styleUrls: ['./btns-seleccionados.component.css']
})
export class BtnsSeleccionadosComponent implements OnInit {


  @Input() datos : string[] | undefined;

  @Output() vectorDatos= new EventEmitter<any>();

  seleccionados: string[];
  constructor() { 
    this.seleccionados = [];
  }

  ngOnInit(): void {
    this.datos = ["uno","dos","tres"];


  }

  chbOn(elem:any){
    console.log(elem);
    if(this.seleccionados.includes(elem)==true){
      this.eliminar(elem);
      //console.log("array despues de eliminar",this.seleccionados);
    }else{
      this.seleccionados.push(elem);
      //console.log("array despues de agregar",this.seleccionados);
    }
    
    //console.log(this.seleccionados);
    this.vectorDatos.emit(this.seleccionados);
  }

  eliminar(elemento:any) {
    var resultado = []
    for (var i = 0; i < this.seleccionados.length; i++) {
      if (this.seleccionados[i] !== elemento) {
        resultado.push(this.seleccionados[i]);
      }
    }

    this.seleccionados = resultado;
  }
  
  

}
