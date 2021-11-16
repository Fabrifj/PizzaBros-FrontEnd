import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent implements OnInit {

  
  

  ingredienteSeleccionado:any = {}
  columnaCambiar :string = "";
  valorOriginal :any;
  
  //CrearIngrediente
  //Formato del ingrediente en el Body del request:
  // {
  //   "Cantidad": 5,
  //   "CostoUnidad": 10,
  //   "Nombre": "Lechuga",
  //   "Proveedor": "348887",
  //   "UnidadMedida": "Kg."
  // }

  datos: any | undefined;
  datosRespaldo: any | undefined;
  columnas = [
    {field:'Nombre',header:'Nombre'},
    {field:'TipoUnidad',header:'Tipo de Unidad'},
    {field:'CantidadInventario',header:'Cantidad en Inventario'},
    {field:'CostoMedia',header:'Costo Media'},
    

  ];

  nombreBotones: string[] | undefined;


  constructor( private servicioHttp: AppHttpService, public servicioModal: ModalService) { }

  ngOnInit(): void {

    this.nombreBotones = ['Modificar','Comprar'];
    this.obtenerIngredientes();
    


  }

  obtenerIngredientes(){
    this.servicioHttp.obtenerIngredientes()
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
        this.ingredienteSeleccionado = names[1];

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
      this.obtenerIngredientes();

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
    var objeto =  this.ingredienteSeleccionado;
    if(!!nuevoValor.trim()){

      this.ingredienteSeleccionado[this.columnaCambiar] = nuevoValor;
    }
    
    this.desaparecerCampo();

  }
  cambiarValor(columnaC:any ){
    this.valorOriginal = this.ingredienteSeleccionado[columnaC];
    (<HTMLInputElement>document.getElementById("valorN")).value = this.valorOriginal;
    this.aparecerCampo();
    
    this.columnaCambiar = columnaC ; 
    
  }
  guardarCambios(ingSele:any){
    //post

  }



  ///crear Ingrediente
  crearIngrediente(){

    var nuevoValorNombre = (<HTMLInputElement>document.getElementById("valorNombreCrear")).value;
    var nuevoValorUnidad = (<HTMLInputElement>document.getElementById("valorUnidadCrear")).value;

    //let body = JSON.stringify({ IdPedido: pedido.id , Estado: "Entregado"})
    let ingredienteNuevo = JSON.stringify({cantidad: 0, costoTotal:0, nombre: nuevoValorNombre , ipoUnidad: nuevoValorUnidad});
    let body = JSON.parse(ingredienteNuevo)
    this.servicioHttp.crearElemento(body).subscribe((response) => {
      console.log('Response from API', response);
      this.obtenerIngredientes();
    }, (error)=>{
      console.log('Error',error);
    })
	


    this.servicioModal.cerrar('modal-4');
  }
  mandarCrearIngrediente(){
    (<HTMLInputElement>document.getElementById("valorNombreCrear")).value = "";
    (<HTMLInputElement>document.getElementById("valorUnidadCrear")).value = "";
    this.servicioModal.abrir('modal-4');

  }

}
