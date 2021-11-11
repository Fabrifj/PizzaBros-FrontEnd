import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.css']
})
export class VerProductosComponent implements OnInit {

  objetoSeleccionado:any = {}

  valorOriginal :any;

  datosProd: any | undefined;
  
  columnasProd = [
    {field:'Nombre',header:'Nombre'},
    {field:'Tamano',header:'Tamano'},
    {field:'Costo',header:'Costo'},
    //{field:'CostoUnidad',header:'Costo Unidad Bs'},
    {field:'Precio',header:'Precio'}
   // {field:'Imagen',header:'Imagen'}
    

  ];

  datosCat: any | undefined;
  columnasCat = [
    {field:'Nombre',header:'Nombre'},
    {field:'Descripcion',header:'Descripcion'}
   // {field:'Imagen',header:'Imagen'}
    

  ];

  datosIng: any | undefined;
  columnasIng = [
    {field:'Nombre',header:'Nombre'},
    {field:'Cantidad',header:'Cantidad'},
    {field:'UnidadMedida',header:'Tipo de Unidad'}
   // {field:'Imagen',header:'Imagen'}
    

  ];





  nombreBotonesProd: string[]= ['Ver Receta'];
  nombreBotonesCat: string[] = ['Ver Productos'];
  constructor(private servicioHttp: AppHttpService, public servicioModal: ModalService) { }

  ngOnInit(): void {

    
    this.obtenerProductos();
    this.filtroProd();
    
  }
  obtenerProductos(){
    this.servicioHttp.obtenerProductos()
    .subscribe((jsonFile:any)=>{
     
      console.log(jsonFile);
      this.datosProd = jsonFile;
      
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }

  obtenerIng(){
    this.servicioHttp.obtenerIngredientes()
    .subscribe((jsonFile:any)=>{
     
      console.log(jsonFile);
      this.datosIng= jsonFile;
      
      

    } ,(error)=>{
        console.log("hubo error ing")

    } )
  }

  
  funcionBoton( names: any){
    this.objetoSeleccionado = names[1];
    if (names[0] == "Ver Receta"){
      
        

        //new
        

        
        this.servicioModal.abrir('modalProd-1');
    }
    else{
      //es el boton de ver productos
      this.servicioModal.abrir('modalProd-1');


    }
  }
    

  
    filtroProd(){
      (<HTMLInputElement>document.getElementById("tablaProductos")).style.display = "inline";
      (<HTMLInputElement>document.getElementById("tablaCategorias")).style.display = "none";
  
    }

    filtroCat(){
      (<HTMLInputElement>document.getElementById("tablaProductos")).style.display = "none";
      (<HTMLInputElement>document.getElementById("tablaCategorias")).style.display = "inline";
  
    }
    modificar(){


      
    }

}
