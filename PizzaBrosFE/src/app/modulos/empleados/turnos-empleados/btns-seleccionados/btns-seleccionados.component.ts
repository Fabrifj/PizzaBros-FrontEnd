import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges,AfterContentInit} from '@angular/core';

import { UnitOrderModel } from 'src/app/modelos/unitOrder.model';

@Component({
  selector: 'app-btns-seleccionados',
  templateUrl: './btns-seleccionados.component.html',
  styleUrls: ['./btns-seleccionados.component.css']
})
export class BtnsSeleccionadosComponent implements OnInit,OnChanges {


  @Input() datos : string[] =[];
  @Input() select : string[] | undefined;
  @Input() bool : boolean = false;

  @Output() vectorDatos= new EventEmitter<any>();


  

  seleccionados: string[] = [];
  losSelect: any;


  dias:string[] =["1","2","3","4","5","6","7"];
  diasSemana:any = 
    {"1":"Lunes",
    '2':"Martes",
    '3':'Miercoles',
    '4':'Jueves',
    '5':'Viernes',
    '6':'Sabado',
    '7':'Domingo'};
  
  constructor() { 
   
    
  }


  ngOnInit(): void {    
  }
 ngOnChanges() {
    this.seleccionados = this.select as string[];
    this.checkedElem();
  }

  
  

  chbOn(elem:any){

    if((<HTMLInputElement>document.getElementById(elem)).checked == true)
    {
      this.seleccionados.push(elem);
    }else
    {
      this.eliminar(elem);
    }
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

  checkedElem(){
    this.losSelect = this.select;
    this.losSelect.forEach((elem:any) => {
      (<HTMLInputElement>document.getElementById(elem)).checked = true;
    });
  }


  destiquear(){

    for (let i = 1 ; i <= 7; i++){
    this.datos.forEach((dato:any) => {
        var elem = dato + i ; 
        (<HTMLInputElement>document.getElementById(elem)).checked = false;
    });
  }
  this.select = [];


  }

  
  
}

