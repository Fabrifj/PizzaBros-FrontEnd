import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';

@Component({
  selector: 'app-bienes',
  templateUrl: './bienes.component.html',
  styleUrls: ['./bienes.component.css']
})
export class BienesComponent implements OnInit {

  objetoSeleccionado:any = {};
  
  bienSeleccionado:any = {}
  columnaCambiar :string = "";
  valorOriginal :any;
  datosBien: any | undefined;
  datosBienesRespaldo: any | undefined;
  columnasBien = [
    {field:'Nombre',header:'Nombre'},
    {field:'TipoUnidad',header:'Tipo de Unidad'},
    {field:'CantidadInventario',header:'Cantidad en Inventario'},
    {field:'CostoMedia',header:'Costo Media'}
  ];

  
  nombreBotonesBien2 = ['Seleccionar'];
  nombreBoton :any; 
  constructor( private servicioHttp: AppHttpService, public servicioModal: ModalService) { }

  ngOnInit(): void {
   this.filtroCrear();
    this.obtenerBien();
    
  }

  obtenerBien(){
    this.servicioHttp.obtenerBien()
    .subscribe((jsonFile:any)=>{
      this.datosBien = jsonFile;
       this.datosBienesRespaldo = jsonFile;
      

    } )
  }
 
  funcionBoton( names: any){
    if(names[0] == "Seleccionar")
    {
      this.obtenerBien();
      this.objetoSeleccionado = names[1] ;
      (<HTMLInputElement>document.getElementById("objetoSeleccionadoID")).value = this.objetoSeleccionado.Nombre;
      (<HTMLInputElement>document.getElementById("valorNombreCrear")).value = this.objetoSeleccionado.Nombre;
      (<HTMLInputElement>document.getElementById("valorUnidadCrear")).value = this.objetoSeleccionado.TipoUnidad;
      (<HTMLInputElement>document.getElementById("valorCantidad")).value = this.objetoSeleccionado.CantidadInventario;
      (<HTMLInputElement>document.getElementById("valorCostoU")).value = this.objetoSeleccionado.CostoMedia;
      (<HTMLInputElement>document.getElementById("valorCantidadMedida")).value = this.objetoSeleccionado.CantidadMedida;
      

              
      this.servicioModal.cerrar('modalBien-2');

    }
    else{

      console.log("comprar ingrediente");
      
      
    }

  }
  buscar(){
    
    var varBuscar   = (<HTMLInputElement>document.getElementById("txtBuscar")).value.toLowerCase();
    
    if(!!varBuscar.trim()){

     
      var datosAux:Array<Object> =[];
      this.datosBienesRespaldo.forEach((dato:any) => {
        
        var nombreD = dato.Nombre.toLowerCase();
        if(nombreD.includes(varBuscar.trim())){
          datosAux.push(dato);

        }
        
      });
      
      this.datosBien = datosAux;

    }
    else{

      console.log("no valores");
      this.obtenerBien();

    }
    
  }






  mandarCrearBien(){
    (<HTMLInputElement>document.getElementById("valorNombreCrear")).value = "";
    (<HTMLInputElement>document.getElementById("valorUnidadCrear")).value = "";
    this.servicioModal.abrir('modalBien-01');

  }


  filtroCrear(){
    this.nombreBoton = "CREAR";
    this.objetoSeleccionado = "";
    
    
    
    (<HTMLInputElement>document.getElementById("siModifico")).style.display = "none";
    (<HTMLInputElement>document.getElementById("valorNombreCrear")).value = "";
    (<HTMLInputElement>document.getElementById("valorUnidadCrear")).value = "";
    (<HTMLInputElement>document.getElementById("valorCantidad")).value = "0";
    (<HTMLInputElement>document.getElementById("valorCostoU")).value = "0";
    (<HTMLInputElement>document.getElementById("valorCantidadMedida")).value = "0";
    (<HTMLInputElement>document.getElementById("crearB")).checked = true;
  }

  filtroModificar(){
    this.nombreBoton = "MODIFICAR";
    this.obtenerBien();
    this.servicioModal.abrir('modalBien-2');
    (<HTMLInputElement>document.getElementById("siModifico")).style.display = "inline";

  }
  crearBien(){

    var nombreB = (<HTMLInputElement>document.getElementById("valorNombreCrear")).value;
    var tipoB = (<HTMLInputElement>document.getElementById("valorUnidadCrear")).value;
    var cantidadB = (<HTMLInputElement>document.getElementById("valorCantidad")).value ;
    var costoU= (<HTMLInputElement>document.getElementById("valorCostoU")).value ;
    var cantidadMedidaB = (<HTMLInputElement>document.getElementById("valorCantidadMedida")).value ;

   
    

    if(this.nombreBoton == "CREAR"){
      var bienes = JSON.stringify({ ListaArticulos :[] , Nombre: nombreB , TipoUnidad: tipoB , CantidadInventario:cantidadB, CostoMedia : costoU, CantidadMedida: cantidadMedidaB , Tipo:"Bien"})
  

      this.servicioHttp.crearElemento(JSON.parse(bienes))
      .subscribe((jsonFile:any)=>{
        alert('bien creada correctamente');
  
      } ,(error)=>{
          console.log("hubo error con crear bien")
  
      } )

    }
    else{
      //modificar
      var bienes = JSON.stringify({ ListaArticulos : this.objetoSeleccionado.ListaArticulos , Nombre: nombreB , TipoUnidad: tipoB , CantidadInventario:cantidadB, CostoMedia : costoU, CantidadMedida: cantidadMedidaB , Tipo:"Bien"})
  
      this.servicioHttp.actualizarElemento(this.objetoSeleccionado.id, JSON.parse(bienes) )
      .subscribe((jsonFile:any)=>{
        
        alert('Categoria modificada correctamente');
  
  
      } ,(error)=>{
          console.log("hubo error con modificar bien")
  
      } )

    }

    
    this.filtroCrear();
    this.obtenerBien();
  }



}
