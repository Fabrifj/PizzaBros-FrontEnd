import { Component, OnInit } from '@angular/core';

import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from '../modal/modal.service';



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
      //this.Orders = this.JSON_MAPPER.readValue(jsonFile, FinalOrderModel[])
      console.log(jsonFile);
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
      //element.Fecha = fecha.toDate().toDateString();
    });

    

  }

  


  funcionBoton( nombres: any){
    if(nombres[0] == "Ver Pedido")
    {
        console.log("boton: ver pedido");
        this.pedidoSeleccionado = nombres[1];
        console.log(nombres[1])
        this.modalServicio.abrir('modal-1');

        this.pedidoSeleccionadoDatos = this.pedidoSeleccionado.Detalle;

    }
    else{

      console.log("papa: cambiar estado");
      this.pedidoSeleccionado = nombres[1];
      this.modalServicio.abrir('modal-2');
      //this.cambiarEstado(names[1]);

    }

  }

  cambiarEstado(pedido : any){

    //let stringBody = "'{\"IdPedido\":\"" +pedido.id + ",\"Estado\" : \"Entregado\"";  



    let body = JSON.stringify({ IdPedido: pedido.id , Estado: "Entregado"})
    
    console.log(JSON.parse(body));
    
    this.httpServicio.actualizarPedidoEstado(JSON.parse(body)).subscribe((response) => {
      console.log('Response from API', response);
      this.obtenerPedidosP();
    }, (error)=>{
      console.log('Error',error);
    })
    
    
    
    this.modalServicio.cerrar('modal-2');
    

  }

}
