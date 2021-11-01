import { Component, OnInit } from '@angular/core';
import { FinalOrderModel } from 'src/app/modelos/finalOrder';
import { AppHttpService } from 'src/app/servicios/app-http.service';

import { ModalService } from '../modal/modal.service';
import { UserService } from '../servicesPrueba/user.service';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {

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
      {field:'Precio',header:'Total'},
      {field:'Fecha',header:'Fecha'},
      {field:'Estado',header:'Estado'}

    ];

  
    buttonsNames: string[] | undefined;


    filtros : [string,string,boolean][] = [['username','Bret',true], ['username','Antonette',true]];

    Orders: FinalOrderModel[]=[];
  constructor(public modalService:ModalService, private httpService:AppHttpService) { }

  ngOnInit() {
      
      
      this.buttonsNames = ['Ver Pedido','Cambiar Estado'];

      this.getOrdersP();
      
  }


  getOrdersP(){
    this.httpService.getOrderStatePreparing()
    .subscribe((jsonFile)=>{
      //this.Orders = this.JSON_MAPPER.readValue(jsonFile, FinalOrderModel[])
      console.log(jsonFile);
      this.datos = jsonFile;

      this.modificarFecha();
    } )
  }

  
  modificarFecha(){

    
    this.datos.forEach((element:any) => {
     let fecha = element.Fecha.seconds;
     let date ;
     date = new Date(fecha * 1000);
     
     element.Fecha = date;
      //element.Fecha = fecha.toDate().toDateString();
    });

    

  }

  


  funcionBoton( names: any){
    if(names[0] == "Ver Pedido")
    {
        console.log("boton: ver pedido");
        this.pedidoSeleccionado = names[1];
        console.log(names[1])
        this.modalService.open('modal-1');

        this.pedidoSeleccionadoDatos = this.pedidoSeleccionado.Detalle;

    }
    else{

      console.log("papa: cambiar estado");
      this.pedidoSeleccionado = names[1];
      this.modalService.open('modal-2');
      //this.cambiarEstado(names[1]);

    }

  }

  cambiarEstado(pedido : any){

    //let stringBody = "'{\"IdPedido\":\"" +pedido.id + ",\"Estado\" : \"Entregado\"";  

   

    let body = JSON.stringify({ IdPedido: pedido.id , Estado: "Entregado"})
    console.log(body);
    this.httpService.updateOrderState(body);
    this.modalService.close('modal-2');
    

    //delete




  }

}
