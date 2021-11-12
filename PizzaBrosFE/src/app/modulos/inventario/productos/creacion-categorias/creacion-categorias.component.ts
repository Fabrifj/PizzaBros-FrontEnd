import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';

@Component({
  selector: 'app-creacion-categorias',
  templateUrl: './creacion-categorias.component.html',
  styleUrls: ['./creacion-categorias.component.css']
})
export class CreacionCategoriasComponent implements OnInit {



  objetoSeleccionado:any = {}

  productoSeleccionado:any={}

  datosCat: any | undefined;
  columnasCat = [
    {field:'Nombre',header:'Nombre'},
    {field:'Descripcion',header:'Descripcion'}
   // {field:'Imagen',header:'Imagen'}
    

  ];


  datosProdMini: any | undefined;
  columnasProdMini = [
    {field:'NombreProducto',header:'Nombre Producto'}
   // {field:'Imagen',header:'Imagen'}
    

  ];

  datosProd: any | undefined;
  columnasProd = [
    {field:'Nombre',header:'Nombre Producto'}
   // {field:'Imagen',header:'Imagen'}
    

  ];





  nombreBotonesCat1: string[] = ['Seleccionar'];
  nombreBotonesProd1: string[] = ['Agregar'];
  nombreBotonesProd2: string[] = ['Quitar'];
  constructor(private servicioHttp: AppHttpService, public servicioModal: ModalService) { }



  ngOnInit(): void {

    this.filtroCrear();
    this.obtenerProductos();
    
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


  obtenerProductos(){
    this.servicioHttp.obtenerProductos()
    .subscribe((jsonFile:any)=>{
     
      console.log(jsonFile);
      this.datosProd = jsonFile;
      
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }
  obtenerProductoId(id:any){
    this.servicioHttp.obtenerProductoId(id)
    .subscribe((jsonFile:any)=>{
     
      console.log(jsonFile);
      this.productoSeleccionado = jsonFile;
      
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }
  funcionBoton( names: any){
    this.objetoSeleccionado = names[1];
    if (names[0] == "Seleccionar"){
      
        this.obtenerCategorias();
        this.objetoSeleccionado = names[1] ;
        this.datosProdMini = this.objetoSeleccionado.ListaProductos;
        (<HTMLInputElement>document.getElementById("objetoSeleccionadoID")).value = this.objetoSeleccionado.Nombre;
        //new
        

        
        this.servicioModal.cerrar('modalCat-2');
    }
    else if(names[0]=="Agregar"){

      var elemAgregar = names[1];
      
      console.log(elemAgregar);
      this.datosProd = this.datosProd.filter((obj:any) => obj.id !== elemAgregar.id);

      var elemNuevo = JSON.stringify({IdProducto: elemAgregar.id , NombreProducto: elemAgregar.Nombre , ImgURL: elemAgregar.ImgURL});
      this.datosProdMini.push(JSON.parse(elemNuevo));

    }
    else{
        //quitar

        var elemQuitar = names[1];
      
        console.log(elemAgregar);
        this.datosProdMini = this.datosProdMini.filter((obj:any) => obj.IdProducto !== elemQuitar.IdProducto);
  
        var elemNuevo = JSON.stringify({ id: elemQuitar.IdProducto , Nombre: elemQuitar.NombreProducto , ImgURL: elemQuitar.ImgURL});
        this.obtenerProductoId(elemQuitar.IdProducto);
        this.datosProd.push(elemNuevo);

    }
  }

  filtroCrear(){
    this.objetoSeleccionado = "";
    this.datosProdMini = [];
    (<HTMLInputElement>document.getElementById("siModifico")).style.display = "none";
    (<HTMLInputElement>document.getElementById("crearC")).checked = true;
  }

  filtroModificar(){


    this.obtenerCategorias();
    this.servicioModal.abrir('modalCat-2');
    (<HTMLInputElement>document.getElementById("siModifico")).style.display = "inline";

  }

  




}
