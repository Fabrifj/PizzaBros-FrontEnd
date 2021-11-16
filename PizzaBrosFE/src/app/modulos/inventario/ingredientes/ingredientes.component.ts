import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent implements OnInit {

  
  objetoSeleccionado:any = {};
  
  ingSeleccionado:any = {}
  columnaCambiar :string = "";
  valorOriginal :any;
  datosIng: any | undefined;
  datosIngRespaldo: any | undefined;
  columnasIng = [
    {field:'Nombre',header:'Nombre'},
    {field:'TipoUnidad',header:'Tipo de Unidad'},
    {field:'CantidadInventario',header:'Cantidad en Inventario'},
    {field:'CostoMedia',header:'Costo Media'}
    
    
    
    

  ];

  nombreBotonesIng: string[] = ['Comprar'];
  nombreBotonesIng2 = ['Seleccionar'];
  nombreBoton :any; 


  constructor( private servicioHttp: AppHttpService, public servicioModal: ModalService) { }

  ngOnInit(): void {

    
    this.obtenerIngredientes();
    (<HTMLInputElement>document.getElementById("siModifico")).style.display = "o";
    this.filtroCrear();

  }

  obtenerIngredientes(){
    this.servicioHttp.obtenerIngredientes()
    .subscribe((jsonFile:any)=>{
     
      console.log(jsonFile);
       this.datosIng = jsonFile;
       this.datosIngRespaldo = jsonFile;
      

    } )
  }
 
  
  funcionBoton( names: any){
    if(names[0] == "Seleccionar")
    {
      this.obtenerIngredientes();
      this.objetoSeleccionado = names[1] ;

      

    

      (<HTMLInputElement>document.getElementById("objetoSeleccionadoID")).value = this.objetoSeleccionado.Nombre;
      (<HTMLInputElement>document.getElementById("valorNombreCrear")).value = this.objetoSeleccionado.Nombre;
      (<HTMLInputElement>document.getElementById("valorUnidadCrear")).value = this.objetoSeleccionado.TipoUnidad;
      (<HTMLInputElement>document.getElementById("valorCantidad")).value = this.objetoSeleccionado.CantidadInventario;
      (<HTMLInputElement>document.getElementById("valorCostoU")).value = this.objetoSeleccionado.CostoMedia;
      (<HTMLInputElement>document.getElementById("valorCantidadMedida")).value = this.objetoSeleccionado.CantidadMedida;
      

              
      this.servicioModal.cerrar('modalIng-2');

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
      this.datosIngRespaldo.forEach((dato:any) => {
        
        var nombreD = dato.Nombre.toLowerCase();
        if(nombreD.includes(varBuscar.trim())){
          datosAux.push(dato);

        }
        
      });
      
      this.datosIng = datosAux;

    }
    else{

      console.log("no valores");
      this.obtenerIngredientes();

    }
    

    
    
    
  }




  mandarCrearIng(){
    (<HTMLInputElement>document.getElementById("valorNombreCrear")).value = "";
    (<HTMLInputElement>document.getElementById("valorUnidadCrear")).value = "";
    this.servicioModal.abrir('modalIng-01');

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
    (<HTMLInputElement>document.getElementById("crearI")).checked = true;



  }

  filtroModificar(){
    ///(<HTMLInputElement>document.getElementById("modB")).checked = true;
    this.nombreBoton = "MODIFICAR";
    this.obtenerIngredientes();
    this.servicioModal.abrir('modalIng-2');
    (<HTMLInputElement>document.getElementById("siModifico")).style.display = "inline";

  }
  crearIng(){

    var nombreB = (<HTMLInputElement>document.getElementById("valorNombreCrear")).value;
    var tipoB = (<HTMLInputElement>document.getElementById("valorUnidadCrear")).value;
    var cantidadB = (<HTMLInputElement>document.getElementById("valorCantidad")).value ;
    var costoU= (<HTMLInputElement>document.getElementById("valorCostoU")).value ;
    var cantidadMedidaB = (<HTMLInputElement>document.getElementById("valorCantidadMedida")).value ;

   
    var ings = JSON.stringify({ ListaArticulos : [] , Nombre: nombreB , TipoUnidad: tipoB , CantidadInventario:cantidadB, CostoMedia : costoU, CantidadMedida: cantidadMedidaB , Tipo:"Ingrediente"})
  

    if(this.nombreBoton == "CREAR"){

      this.servicioHttp.crearElemento(JSON.parse(ings))
      .subscribe((jsonFile:any)=>{
        
       
        alert('ingrediente creada correctamente');
  
      } ,(error)=>{
          console.log("hubo error con crear bien")
  
      } )

    }
    else{
      //modificar
      console.log("id modificar:",this.objetoSeleccionado.id)
      this.servicioHttp.actualizarElemento(this.objetoSeleccionado.id, JSON.parse(ings) )
      .subscribe((jsonFile:any)=>{
        
        alert('ingrediente modificadp correctamente');
        
  
      } ,(error)=>{
          console.log("hubo error con modificar ing")
  
      } )

    }

    
    this.filtroCrear();
    this.obtenerIngredientes();
  }

}
