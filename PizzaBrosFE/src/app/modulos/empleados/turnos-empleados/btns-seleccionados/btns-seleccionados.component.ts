import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
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
  constructor() { 
    this.seleccionados = [];
    
  }

  ngOnInit(): void {    
    //console.log("ahora");
    this.seleccionados = this.select as string[];
  }
  ngOnChanges(bool:boolean, select:string[]) {

    if(this.bool == true){
      console.log("HACEEEEEEEEEE A parte no esta agarrando los select");
      this.checkedElem();
    }
    /*
    console.log("los select son :", this.select);
    */
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
    console.log("los select son:", this.seleccionados);
    this.losSelect.forEach((elem:any) => {
      console.log("el elemento es: ",elem);
      (<HTMLInputElement>document.getElementById(elem)).checked = true;
    });
  }
}

