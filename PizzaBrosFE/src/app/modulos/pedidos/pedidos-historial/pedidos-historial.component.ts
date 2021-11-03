import { Component, OnInit } from '@angular/core';
import { FinalOrderModel } from 'src/app/modelos/finalOrder';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from '../modal/modal.service';



@Component({
  selector: 'app-pedidos-historial',
  templateUrl: './pedidos-historial.component.html',
  styleUrls: ['./pedidos-historial.component.css']
})
export class PedidosHistorialComponent implements OnInit {

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

  
    nombreBotones: string[] | undefined;


    



  constructor( public modalServicio:ModalService, private servicioHttp: AppHttpService) { }

  ngOnInit() {

    this.nombreBotones = ['Ver Pedido'];
    this.obtenerPedido();
    this.filtroTodos();
  }

 ////////////////////////////////////////////
  ////////////////////////////////////////
  //comunicacion con base de datos
  obtenerPedido(){
    this.servicioHttp.obtenerPedidos()
    .subscribe((jsonFile)=>{
      //this.Orders = this.JSON_MAPPER.readValue(jsonFile, FinalOrderModel[])
      console.log(jsonFile);
      this.datos = jsonFile;
       
      this.modificarFecha();

    } )
  }
  obtenerPedido2DiasT(body:any){
    console.log("vector",body);
    this.servicioHttp.obtenerPedido2DiasT(body)
    .subscribe((jsonFile)=>{
      //this.Orders = this.JSON_MAPPER.readValue(jsonFile, FinalOrderModel[])
      console.log(jsonFile);
      this.datos = jsonFile;
       
      this.modificarFecha();

    } )
  }
  obtenerPedido2DiasCli(body:any){
    this.servicioHttp.obtenerPedido2DiasCli(body)
    .subscribe((jsonFile)=>{
      //this.Orders = this.JSON_MAPPER.readValue(jsonFile, FinalOrderModel[])
      console.log(jsonFile);
      this.datos = jsonFile;
       
      this.modificarFecha();

    } )
  }
  obtenerPedido1DiaCli(body:any){
    this.servicioHttp.obtenerPedido1DiaCli(body)
    .subscribe((jsonFile)=>{
      //this.Orders = this.JSON_MAPPER.readValue(jsonFile, FinalOrderModel[])
      console.log(jsonFile);
      this.datos = jsonFile;
       
      this.modificarFecha();

    } )
  }
  obtenerPedidosCli(body:any){
    this.servicioHttp.obtenerPedidosCliente(body)
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
        this.modalServicio.abrir('modal-1');
    }
    else{

      console.log("no existe boton");
      
      //this.cambiarEstado(names[1]);

    }

  }


 

  actualizarTabla()
  {
    //document.querySelector("[name=fruit]:checked").id
    let selectedClientes =  (<HTMLInputElement>document.querySelector("[name='clientes']:checked")).id ;
    let selectedFecha =  (<HTMLInputElement>document.querySelector("[name='fechas']:checked")).id ;
    
    var NITCliente = (<HTMLInputElement>document.getElementById("nitCliente")).value;
    var fechaI = (<HTMLInputElement>document.getElementById("fechaI")).value;
    var fechaD = (<HTMLInputElement>document.getElementById("fechaD")).value;
   
    let newFechaI = fechaI + "T00:00:00";
    let newFechaD = fechaD + "T23:59:59";
    if (selectedFecha == "tfec") {

      if (selectedClientes == "todosCli"){
        //todos los clientes y todas las fechas
        this.obtenerPedido();
      }
      else{
        //solo un cliente especifico y todas las fechas
        
        this.obtenerPedidosCli(NITCliente);
      }


    }
    else if (selectedFecha == "soloFecha") {
      if (selectedClientes == "todosCli"){
        //una fecha, todos los clientes

        console.log(fechaI);
        newFechaD = fechaI + "T23:59:59";
       
        var body2:string[]; 
        body2 = [newFechaI , newFechaD ];
        this.obtenerPedido2DiasT(body2);


      }
      else{
        //solo un cliente especifico y una fecha
        
        var body2:string[]; 
        body2 = [newFechaI , NITCliente ];
        
        this.obtenerPedido1DiaCli(body2);
      }


      
    }
    else{
      //rango de fechas

      if (selectedClientes == "todosCli"){
        //todos los clientes y un rango de fechas
        
        var body2:string[]; 
        body2 = [newFechaI , newFechaD ];
        this.obtenerPedido2DiasT(body2);
      }
      else{

        //solo un cliente especifico y rrango de fechas
      
        var body2:string[]; 
        body2 = [newFechaI , newFechaD,NITCliente ];
        this.obtenerPedido2DiasCli(body2);
      }


    }
    



  }

 

  rangoFechaFiltro(){

    console.log("Selecciono ragno");
    (<HTMLInputElement>document.getElementById("fechaDestino")).style.display = "inline";
    (<HTMLInputElement>document.getElementById("fechaInicio")).style.display = "inline";
  }

  soloFechaFiltro(){

    console.log("selecciono solo fecha");
    (<HTMLInputElement>document.getElementById("fechaDestino")).style.display = "none";
    (<HTMLInputElement>document.getElementById("fechaInicio")).style.display = "inline";
  }

  filtroTodos(){
    (<HTMLInputElement>document.getElementById("fechaDestino")).style.display = "none";
    (<HTMLInputElement>document.getElementById("fechaInicio")).style.display = "none";

  }



  //clientes
  todosFiltrosCli(){
    (<HTMLInputElement>document.getElementById("clienteCampus")).style.display = "none";



  }
  filtroEspecificoCli(){
    (<HTMLInputElement>document.getElementById("clienteCampus")).style.display = "inline";



  }



}
