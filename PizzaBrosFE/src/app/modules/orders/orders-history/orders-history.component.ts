import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { FinalOrderModel } from 'src/app/models/finalOrder';
import { AppHttpService } from 'src/app/services/app-http.service';
import { ModalService } from '../modal/modal.service';
import { UserService } from '../servicesPrueba/user.service';



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




  constructor(public modalService:ModalService, private userservice:UserService, private httpService:AppHttpService) { }
  //public static  JSON_MAPPER = new ObjectMapper();

  Orders: FinalOrderModel[]=[];
  ngOnInit() {
    this.cargarDatos();
    this.buttonsNames = ['Ver Pedido'];
    this.getOrders();

  }
  // Este es el metodo andy
  getOrders(){
    this.httpService.getOrders()
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
  
  //Terminar 
  cargarDatos(){

    this.userservice.getUser().subscribe((data) =>  {
      console.log("cargo datos")
      this.datos = data
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


  salta(Sel:any){
    if (Sel.ad.selectedIndex != 0){
    document.location=Sel.ad.options[Sel.ad.selectedIndex].value
    }}

}