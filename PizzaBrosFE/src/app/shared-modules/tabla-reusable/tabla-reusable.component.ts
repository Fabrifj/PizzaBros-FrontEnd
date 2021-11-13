import { Component, OnInit,OnChanges,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-reusable',
  templateUrl: './tabla-reusable.component.html',
  styleUrls: ['./tabla-reusable.component.css']
})
export class TablaReusableComponent implements OnInit {

  
  @Input() datos : any;
  @Input() columnas: any;
  @Input() nombreBotones : string[] | undefined;
  @Input() colorLetra : string="cornsilk";
  @Input() indice : string = "0";
  //['name','kevin']
  //bool yes, solo eso, bool no, quitar eso
  //@Input() filtros : [string, string, boolean][] = [] ;
  @Output() parentMethod = new EventEmitter<any>();
  constructor() { }
  ngOnInit()  {

    
    const elem = document.getElementsByClassName('tablaContenedora');
    var indice  = parseInt(this.indice,10);
    const e = elem[indice];
    if(e instanceof HTMLElement){
      
       e.style.color = this.colorLetra;
   }
    /*for (let i =0 ; i< elem.length ; i++){
        console.log(i);
        const e = elem[i];
        if(e instanceof HTMLElement){
           console.log("entro a cambiar el color");
            e.style.color = this.colorLetra;
        }

    }  */

  }
  
  botonPresionado(nombreFuncion:string,objecto:any){
   
    this.parentMethod.emit([nombreFuncion,objecto])
    

  }

}
