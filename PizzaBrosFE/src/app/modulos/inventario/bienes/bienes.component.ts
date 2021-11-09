import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';

@Component({
  selector: 'app-bienes',
  templateUrl: './bienes.component.html',
  styleUrls: ['./bienes.component.css']
})
export class BienesComponent implements OnInit {


  
  bienSeleccionado:any = {}
  columnaCambiar :string = "";
  valorOriginal :any;
  datos: any | undefined;
  datosRespaldo: any | undefined;
  columnas = [
    {field:'Nombre',header:'Nombre'},
    {field:'Cantidad',header:'Unidades Restantes'},
    {field:'UnidadMedida',header:'Medida de Unidad'},
    {field:'Descripcion',header:'Descripcion'}
    //{field:'CostoUnidad',header:'Costo Unidad Bs'},
    
    

  ];

  nombreBotones: string[] | undefined;
  constructor( private servicioHttp: AppHttpService, public servicioModal: ModalService) { }

  ngOnInit(): void {
    this.nombreBotones = ['Modificar','Comprar'];
    this.obtenerBien();
    
  }

  obtenerBien(){
    this.servicioHttp.obtenerBien()
    .subscribe((jsonFile:any)=>{
     
      console.log(jsonFile);
      this.datos = jsonFile;
       this.datosRespaldo = jsonFile;
      

    } )
  }
 
  funcionBoton( names: any){
    if(names[0] == "Modificar")
    {
        console.log("boton:modificar");
        this.bienSeleccionado = names[1];

        //new
        

        console.log(names[1])
        this.servicioModal.abrir('modal-3');
    }
    else{

      console.log("comprar ingrediente");
      
      
    }

  }
  buscar(){
    
    var varBuscar   = (<HTMLInputElement>document.getElementById("txtBuscar")).value.toLowerCase();
    console.log(varBuscar);
    
    if(!!varBuscar.trim()){

      
      
      var datosAux:Array<Object> =[];
      this.datosRespaldo.forEach((dato:any) => {
        
        var nombreD = dato.Nombre.toLowerCase();
        if(nombreD.includes(varBuscar.trim())){
          datosAux.push(dato);

        }
        
      });
      
      this.datos = datosAux;

    }
    else{

      console.log("no valores");
      this.obtenerBien();

    }
    

    
    
    
  }



  //modificar ingrediente
  desaparecerCampo(){

    (<HTMLElement>document.getElementsByClassName("nuevoValorC")[0]).style.display = "none";
    
  }
  aparecerCampo(){

    (<HTMLElement>document.getElementsByClassName("nuevoValorC")[0]).style.display = "inline";
    
  }

  guardarValor(){

    var nuevoValor = (<HTMLInputElement>document.getElementById("valorN")).value;
    var objeto =  this.bienSeleccionado;
    if(!!nuevoValor.trim()){

      this.bienSeleccionado[this.columnaCambiar] = nuevoValor;
    }
    
    this.desaparecerCampo();

  }
  cambiarValor(columnaC:any ){
    this.valorOriginal = this.bienSeleccionado[columnaC];
    (<HTMLInputElement>document.getElementById("valorN")).value = this.valorOriginal;
    this.aparecerCampo();
    
    this.columnaCambiar = columnaC ; 
    
  }
  guardarCambios(ingSele:any){
    //post

  }



  ///crear Ingrediente
  crearBien(){

    var nuevoValorNombre = (<HTMLInputElement>document.getElementById("valorNombreCrear")).value;
    var nuevoValorUnidad = (<HTMLInputElement>document.getElementById("valorUnidadCrear")).value;
    var nuevoValorDescripcion = (<HTMLInputElement>document.getElementById("valorDescripcion")).value;

    //let body = JSON.stringify({ IdPedido: pedido.id , Estado: "Entregado"})
    let bienNuevo = JSON.stringify({Cantidad: 0, PrecioUnidad:0, Nombre: nuevoValorNombre , UnidadMedida: nuevoValorUnidad , Descripcion: nuevoValorDescripcion});
    let body = JSON.parse(bienNuevo)
    this.servicioHttp.crearBien(body).subscribe((response) => {
      console.log('Response from API', response);
      this.obtenerBien();
    }, (error)=>{
      console.log('Error',error);
    })
	


    this.servicioModal.cerrar('modal-4');
  }
  mandarCrearBien(){
    (<HTMLInputElement>document.getElementById("valorNombreCrear")).value = "";
    (<HTMLInputElement>document.getElementById("valorUnidadCrear")).value = "";
    this.servicioModal.abrir('modal-4');

  }
}
