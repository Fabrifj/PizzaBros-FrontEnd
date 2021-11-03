import { Component, OnInit,Input, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-tabla-reusable',
  templateUrl: './tabla-reusable.component.html',
  styleUrls: ['./tabla-reusable.component.css']
})
export class TablaReusableComponent implements OnInit {

  @Input() datos : any;
  @Input() columnas: any;
  @Input() nombreBotones : string[] =[];
  @Output() parentMethod = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  botonPresionado(nombreFuncion:string,objecto:any){
   
    this.parentMethod.emit([nombreFuncion,objecto])
    

  }
}
