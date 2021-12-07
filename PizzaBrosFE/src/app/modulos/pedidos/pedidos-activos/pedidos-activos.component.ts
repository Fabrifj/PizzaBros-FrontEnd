import { Component, OnInit } from '@angular/core';

import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from '../../../shared-modules/modal/modal.service';



@Component({
  selector: 'app-pedidos-activos',
  templateUrl: './pedidos-activos.component.html',
  styleUrls: ['./pedidos-activos.component.css']
})
export class PedidosActivosComponent implements OnInit {


  public fecha : string = '';

  
  pedidoNum:any;
  pedidoDescripcion:any;
  pedidoEstado: any;

  pedidoSeleccionado:any = {}
  pedidoSeleccionadoDatos : any | undefined;
  pedidoSeleccionadoColumnas = [
    {field:'Cantidad',header:'Cantidad'},
    {field:'Nombre',header:'Nombre'},
    {field:'Precio',header:'Precio'}

  ]; 



    datos: any | undefined;

    columnas = [
      {field:'NITCliente',header:'NIT de Cliente'},
      {field:'NombreCliente',header:'Nombre de Cliente'},
      {field:'Precio',header:'Total Bs.'},
      {field:'Fecha',header:'Fecha'},
      {field:'Estado',header:'Estado'}

    ];

  
    nombreBotones: string[] | undefined;


    filtros : [string,string,boolean][] = [['username','Bret',true], ['username','Antonette',true]];

  constructor(public modalServicio:ModalService, private httpServicio:AppHttpService) { }

  ngOnInit() {

    this.nombreBotones = ['Ver Pedido','Cambiar Estado'];

    this.obtenerPedidosP();
  }
  

  obtenerPedidosP(){
    this.httpServicio.obtenerPedidoEstadoPr()
    .subscribe((jsonFile)=>{
      this.datos = jsonFile;

      this.modificarFecha();
    },(error)=>{

      console.log("hubo un error")

    } )
  }

  
  modificarFecha(){

    
    this.datos.forEach((elemento:any) => {
     let fecha = elemento.Fecha.seconds;
     let date ;
     date = new Date(fecha * 1000);
     
     elemento.Fecha = date;
    });

    

  }

  


  funcionBoton( nombres: any){
    if(nombres[0] == "Ver Pedido")
    {
        this.pedidoSeleccionado = nombres[1];
        this.modalServicio.abrir('modal-1');

        this.pedidoSeleccionadoDatos = this.pedidoSeleccionado.Detalle;
        
    }
    else{
      this.pedidoSeleccionado = nombres[1];
      this.modalServicio.abrir('modal-2');

    }

  }

  cambiarEstado(pedido : any){ 

    let body = JSON.stringify({ IdPedido: pedido.id , Estado: "Entregado"})
    
    this.httpServicio.actualizarPedidoEstado(JSON.parse(body)).subscribe((response) => {
      console.log('Response from API', response);
      this.obtenerPedidosP();
    }, (error)=>{
      console.log('Error',error);
    })
    
    
    
    this.modalServicio.cerrar('modal-2');
    

  }

}
