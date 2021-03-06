import { Component, OnInit,OnChanges,Input, Output, EventEmitter } from '@angular/core';
import { TablaReusableService } from './tabla-reusable.service';

@Component({
  selector: 'app-tabla-reusable',
  templateUrl: './tabla-reusable.component.html',
  styleUrls: ['./tabla-reusable.component.css']
})
export class TablaReusableComponent implements OnInit {

  
  @Input() datos : any ;
  @Input() columnas: any;
  @Input() nombreBotones : string[] | undefined;
  @Input() colorLetra : string="cornsilk";
  @Input() indice : string = "0";

  //no usado
  @Input() espacioTexto : string = "0";

  @Input() titulosTextos :string[] = [];

  @Input() botonGuardarDatos : string="no";
  
  @Output() parentMethod = new EventEmitter<any>();

  espacioCantidadI :any ;
  
  lenDatos :any;
  lenTitulos : any; 


  misDatos :any;
  constructor( private servicioTabla : TablaReusableService ) { }
  ngOnInit()  {
    
    this.espacioCantidadI = parseInt(this.espacioTexto);
    const elem = document.getElementsByClassName('tablaContenedora');
    var indice  = parseInt(this.indice,10);
    const e = elem[indice];
    if(e instanceof HTMLElement){
      
       e.style.color = this.colorLetra;
   }


   this.servicioTabla.cambioTabla.subscribe(
      (nuevosDatos:any)=>{


   });
  }

  
 
  botonPresionado(nombreFuncion:string,objecto:any){
   
    this.parentMethod.emit([nombreFuncion,objecto])
    

  }
  
  guardarDT(){
    this.misDatos = this.datos;
    
    var indice1 = 0 ;
     
    this.misDatos.forEach((element:any) => {
      var indice2 = 0 ;
      this.titulosTextos.forEach((titulo:any) => {

        var nombreCC  = 'textoCantidad' + indice1 + indice2 ; 
        var valor = (<HTMLInputElement>document.getElementById(nombreCC)).value ;

        element[titulo] = valor
        indice2 = indice2 +1;
      });
      

      indice1= indice1+1;
    });

    this.parentMethod.emit(['GuardarTodo',this.misDatos,this.indice])
  }

  getId(j:any,i:any){
    var nombre = "textoCantidad";
    nombre = nombre + i + j ;  
    return nombre  ;

  }

}
