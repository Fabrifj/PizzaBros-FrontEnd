import { Component, OnInit } from '@angular/core';

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

  pedidoSeleccionado:any = {name: "",descripcion:"",estado:""}
    datos: any | undefined;

    columnas = [
      {field:'id',header:'NroId'},
      {field:'name',header:'Nombre'},
      {field:'username',header:'Usuario'},
      {field:'email',header:'Correo'},

    ];

  
    buttonsNames: string[] | undefined;


    filtros : [string,string,boolean][] = [['username','Bret',true], ['username','Antonette',true]];


  constructor(public modalService:ModalService, private userservice:UserService) { }

  ngOnInit() {
      
      this.cargarDatos();
      this.buttonsNames = ['Ver Pedido','Cambiar Estado'];
  }

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
        console.log(names[1])
        this.modalService.open('modal-1');
    }
    else{

      console.log("papa: cambiar estado");
      this.pedidoSeleccionado = names[1];
      this.modalService.open('modal-2');
      //this.cambiarEstado(names[1]);

    }

  }

  cambiarEstado(obj : any){

    
    this.modalService.close('modal-2');
    

    //delete




  }

}
