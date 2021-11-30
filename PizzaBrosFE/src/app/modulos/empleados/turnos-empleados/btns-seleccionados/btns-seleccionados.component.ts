import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges,AfterContentInit} from '@angular/core';

import { UnitOrderModel } from 'src/app/modelos/unitOrder.model';

@Component({
  selector: 'app-btns-seleccionados',
  templateUrl: './btns-seleccionados.component.html',
  styleUrls: ['./btns-seleccionados.component.css']
})
export class BtnsSeleccionadosComponent implements OnInit {


  @Input() datos : string[] | undefined;
  @Input() select : string[] | undefined;
  @Input() bool : boolean = false;

  @Output() vectorDatos= new EventEmitter<any>();


  

  seleccionados: string[];
  losSelect: any;


  dias:string[] =["1","2","3","4","5","6","7"];
  datos2:string[] =["A","B","C"];
  constructor() { 
    this.seleccionados = [];
    
  }





  ngOnInit(): void {    
    //console.log("ahora");
    console.log("componente inicializacido.")

   
    
  }

  ngAfterContentInit(){
    console.log("componente cargado")


  }
  ngAfterViewInit(){
    console.log("componente view cargado")

  }
 ngOnChanges() {

    console.log("en changes");
    this.seleccionados = this.select as string[];
    this.checkedElem();
  }

  /*ngDoCheck(){
    console.log("en do check");

    this.checkedElem();
  }*/
  

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


    console.log("=====Tickeando========")
    this.losSelect = this.select;
    console.log("los select son:", this.select);
    this.losSelect.forEach((elem:any) => {
      console.log("el elemento es: ",elem);
      (<HTMLInputElement>document.getElementById(elem)).checked = true;

      console.log("despeus de tiquear");
    });
  }




  funcionRespaldo(){


    this.checkedElem();
  }
}

