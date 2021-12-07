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
    {field:'TipoUnidad',header:'Tipo de Unidad'}
   // {field:'Imagen',header:'Imagen'}
    

  ];

  datosProdMini: any | undefined;
  columnasProdMini = [
    {field:'NombreProducto',header:'Nombre Producto'}
   // {field:'Imagen',header:'Imagen'}
    

  ];





  nombreBotonesProd: string[]= ['Ver Receta'];
  nombreBotonesCat: string[] = ['Ver Productos'];
  constructor(private servicioHttp: AppHttpService, public servicioModal: ModalService) { }

  ngOnInit(): void {

    
    this.obtenerProductos();
    this.obtenerCategorias();
    this.filtroProd();
    
    
  }
  ngOnChanges(){
    this.obtenerProductos();
    this.obtenerCategorias();
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
  obtenerCategorias(){
    this.servicioHttp.obtenerCategorias()
    .subscribe((jsonFile:any)=>{
     
      console.log(jsonFile);
      this.datosCat = jsonFile;
      
      

    } ,(error)=>{
        console.log("hubo error con categoria")

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
      
        //this.obtenerIng();
        console.log(this.objetoSeleccionado);
        this.datosIng = this.objetoSeleccionado.ListaIngredientes;//new
        

        
        this.servicioModal.abrir('modalProd-1');
    }
    else{
      //es el boton de ver productos
      this.datosProdMini = this.objetoSeleccionado.ListaProductos
      
      this.servicioModal.abrir('modalCat-1');



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
    modificar(objetoSeleccionado:any){

        //conectar con modificar
      
    }

}
