import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-reusable',
  templateUrl: './tabla-reusable.component.html',
  styleUrls: ['./tabla-reusable.component.css']
})
export class TablaReusableComponent implements OnInit {

  
  @Input() datos : any;
  @Input() columnas: any;
  @Input() nombreBotones : string[] | undefined;

  //['name','kevin']
  //bool yes, solo eso, bool no, quitar eso
  //@Input() filtros : [string, string, boolean][] = [] ;
  @Output() parentMethod = new EventEmitter<any>();
  constructor() { }
  ngOnInit()  {
  }
  botonPresionado(nombreFuncion:string,objecto:any){
   
    this.parentMethod.emit([nombreFuncion,objecto])
    

  }

}
