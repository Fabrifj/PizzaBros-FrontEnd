import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { FinalOrderModel } from 'src/app/models/finalOrder';
import { AppHttpService } from 'src/app/services/app-http.service';
import { ModalService } from '../modal/modal.service';




@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {


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




  constructor(public modalService:ModalService, private httpService:AppHttpService) { }
  //public static  JSON_MAPPER = new ObjectMapper();

  Orders: FinalOrderModel[]=[];
  
  
  ngOnInit() {
   
    this.buttonsNames = ['Ver Pedido'];
    this.getOrders();

    
    this.allfilter();


  }
  ////////////////////////////////////////////
  ////////////////////////////////////////
  //comunicacion con base de datos
  getOrders(){
    this.httpService.getOrders()
    .subscribe((jsonFile)=>{
      //this.Orders = this.JSON_MAPPER.readValue(jsonFile, FinalOrderModel[])
      console.log(jsonFile);
      this.datos = jsonFile;
       
      this.modificarFecha();

    } )
  }
  getOrderB2datesAll(body:any){
    this.httpService.getOrderB2datesAll(body)
    .subscribe((jsonFile)=>{
      //this.Orders = this.JSON_MAPPER.readValue(jsonFile, FinalOrderModel[])
      console.log(jsonFile);
      this.datos = jsonFile;
       
      this.modificarFecha();

    } )
  }
  getOrderB2datesCli(body:any){
    this.httpService.getOrderB2datesCli(body)
    .subscribe((jsonFile)=>{
      //this.Orders = this.JSON_MAPPER.readValue(jsonFile, FinalOrderModel[])
      console.log(jsonFile);
      this.datos = jsonFile;
       
      this.modificarFecha();

    } )
  }
  getOrder1dayClient(body:any){
    this.httpService.getOrder1dayClient(body)
    .subscribe((jsonFile)=>{
      //this.Orders = this.JSON_MAPPER.readValue(jsonFile, FinalOrderModel[])
      console.log(jsonFile);
      this.datos = jsonFile;
       
      this.modificarFecha();

    } )
  }
  getPedidosCliente(body:any){
    this.httpService.getPedidosCliente(body)
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

        //new
        this.pedidoSeleccionadoDatos = this.pedidoSeleccionado.Detalle;

        console.log(names[1])
        this.modalService.open('modal-1');
    }
    else{

      console.log("no existe boton");
      
      //this.cambiarEstado(names[1]);

    }

  }


 

  updateTable()
  {
    //document.querySelector("[name=fruit]:checked").id
    let selectedClientes =  (<HTMLInputElement>document.querySelector("[name='clientes']:checked")).id ;
    let selectedFecha =  (<HTMLInputElement>document.querySelector("[name='fechas']:checked")).id ;
    
    var NITCliente = (<HTMLInputElement>document.getElementById("nitCliente")).value;
    var fechaI = (<HTMLInputElement>document.getElementById("fechaI")).value;
    var fechaD = (<HTMLInputElement>document.getElementById("fechaD")).value;
   
    let newFechaI = fechaI + "T00:00:00";
    let newFechaD = fechaD + "T23:59:59";
    if (selectedFecha == "allfec") {

      if (selectedClientes == "allcli"){
        //todos los clientes y todas las fechas
        this.getOrders();
      }
      else{
        //solo un cliente especifico y todas las fechas
        
        this.getPedidosCliente(NITCliente);
      }


    }
    else if (selectedFecha == "soloFecha") {
      if (selectedClientes == "allcli"){
        //una fecha, todos los clientes

        console.log(fechaI);
        let body = JSON.stringify({ Inicio: newFechaI , Final: newFechaI });
        
        this.getOrderB2datesCli(JSON.parse(body));


      }
      else{
        //solo un cliente especifico y una fecha
        let body = JSON.stringify({ Fecha: newFechaI , NITCliente : NITCliente});
        
          this.getOrder1dayClient(JSON.parse(body));
      }


      
    }
    else{
      //rango de fechas

      if (selectedClientes == "allcli"){
        //todos los clientes y un rango de fechas
        let body = JSON.stringify({ Inicio: newFechaI , Final: newFechaD });
        
        this.getOrderB2datesAll(JSON.parse(body));
      }
      else{

        //solo un cliente especifico y rrango de fechas
        let body = JSON.stringify({ Inicio: newFechaI , Final: newFechaD , nit : NITCliente});
        
        this.getOrderB2datesCli(JSON.parse(body));
      }


    }
    



  }

  updateTableEverything(){

    
    var x = document.getElementById("nitCliente");
    var NITCliente = (<HTMLInputElement>document.getElementById("nitCliente")).value;
    var fecha = (<HTMLInputElement>document.getElementById("fecha")).value;

    console.log(NITCliente);
    console.log(fecha);

  }

  rangeFilter(){

    console.log("Selecciono ragno");
    (<HTMLInputElement>document.getElementById("fechaDestino")).style.display = "inline";
    (<HTMLInputElement>document.getElementById("fechaInicio")).style.display = "inline";
  }

  jdatefilter(){

    console.log("selecciono solo fecha");
    (<HTMLInputElement>document.getElementById("fechaDestino")).style.display = "none";
    (<HTMLInputElement>document.getElementById("fechaInicio")).style.display = "inline";
  }

  allfilter(){
    (<HTMLInputElement>document.getElementById("fechaDestino")).style.display = "none";
    (<HTMLInputElement>document.getElementById("fechaInicio")).style.display = "none";

  }



  //clientes
  allfiltercli(){
    (<HTMLInputElement>document.getElementById("clientCampus")).style.display = "none";



  }
  especificfiltercli(){
    (<HTMLInputElement>document.getElementById("clientCampus")).style.display = "inline";



  }
}