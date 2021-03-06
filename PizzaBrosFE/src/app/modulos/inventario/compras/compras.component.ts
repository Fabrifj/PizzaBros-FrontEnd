import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  nombreBotones: string[] | undefined;
  datos: any | undefined;
  datosRespaldo: any | undefined;
  columnas = [
    {field:'ID',header:'Nombre'},
    {field:'Fecha',header:'Unidades Restantes'},
    {field:'Total',header:'Medida de Unidad'},
    {field:'Detalle',header:'Proveedor'}
    

  ];
  compraSeleccionada :any = {} 
  constructor( private servicioHttp: AppHttpService, public servicioModal: ModalService) { }

  ngOnInit(): void {
  }
  
  obtenerCompras(){
    this.servicioHttp.obtenerCompras()
    .subscribe((jsonFile:any)=>{
      this.datos = jsonFile;
       this.datosRespaldo = jsonFile;
      

    } )
  }
  funcionBoton( names: any){
    this.compraSeleccionada = names[1];
        //new
    this.servicioModal.abrir('modal-3');
  }
}
