import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';

@Component({
  selector: 'app-creacion-categorias',
  templateUrl: './creacion-categorias.component.html',
  styleUrls: ['./creacion-categorias.component.css']
})
export class CreacionCategoriasComponent implements OnInit {



  objetoSeleccionado:any = {};

 


  datosProdBackUp:any | undefined;


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


  nombreBoton :any ;
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
      this.datosProdBackUp = this.datosProd;
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }




  
  funcionBoton( names: any){
    
    if (names[0] == "Seleccionar"){
      
        
        this.objetoSeleccionado = names[1] ;

        
        this.datosProdMini = this.objetoSeleccionado.ListaProductos;

        this.datosProdMini.forEach((element:any) => {
            //quitar de lista grande
            this.datosProd = this.datosProd.filter((obj:any) => obj.id !== element.IdProducto);
        });
      

        (<HTMLInputElement>document.getElementById("objetoSeleccionadoID")).value = this.objetoSeleccionado.Nombre;
        (<HTMLInputElement>document.getElementById("nuevoNC")).value = this.objetoSeleccionado.Nombre;
        (<HTMLInputElement>document.getElementById("nuevoDC")).value = this.objetoSeleccionado.Descripcion;
        //new
        

                
        this.servicioModal.cerrar('modalCat-2');






    }
    else if(names[0]=="Agregar"){

      var elemAgregar = names[1];
      
      //console.log(elemAgregar);
     
      
      //quitar de lista grande
      this.datosProd = this.datosProd.filter((obj:any) => obj.id !== elemAgregar.id);

      //agregar a lista pequna
      var elemNuevo = JSON.stringify({IdProducto: elemAgregar.id , NombreProducto: elemAgregar.Nombre , ImgURL: elemAgregar.ImgURL});
      this.datosProdMini.push(JSON.parse(elemNuevo));
      
    }
    else{
        //quitar

        var elemQuitar = names[1];
        var productoSeleccionado :any = {};
        this.datosProdBackUp.forEach((element:any) => {
          if(element.id == elemQuitar.IdProducto){
            productoSeleccionado = element;
          }
        });

        
        //qutiar mini lista
        this.datosProdMini = this.datosProdMini.filter((obj:any) => obj.IdProducto !== elemQuitar.IdProducto);
        
       // var elemNuevo = JSON.stringify({ id: elemQuitar.IdProducto , Nombre: elemQuitar.NombreProducto , ImgURL: elemQuitar.ImgURL});
        
        

        console.log("productoseleccionado", productoSeleccionado)
        this.datosProd.push( productoSeleccionado);

    }
  }

  filtroCrear(){
    this.nombreBoton = "CREAR";
    this.objetoSeleccionado = "";
    this.datosProdMini = [];
    this.datosProd = this.datosProdBackUp;
    (<HTMLInputElement>document.getElementById("nuevoNC")).value = "";
    (<HTMLInputElement>document.getElementById("siModifico")).style.display = "none";
    (<HTMLInputElement>document.getElementById("nuevoDC")).value = "";
    (<HTMLInputElement>document.getElementById("crearC")).checked = true;
  }

  filtroModificar(){

    this.nombreBoton = "MODIFICAR";
    this.obtenerCategorias();
    this.servicioModal.abrir('modalCat-2');
    (<HTMLInputElement>document.getElementById("siModifico")).style.display = "inline";

  }
  crearCategoria(){

    var nombreC = (<HTMLInputElement>document.getElementById("nuevoNC")).value;
    var descripcionC = (<HTMLInputElement>document.getElementById("nuevoDC")).value;


   
    var categoria = JSON.stringify({ ListaProductos : this.datosProdMini , Nombre: nombreC , Descripcion: descripcionC })
    console.log(JSON.parse(categoria));

    if(this.nombreBoton == "CREAR"){

      this.servicioHttp.crearCategoria(JSON.parse(categoria))
      .subscribe((jsonFile:any)=>{
        
        console.log("creado bien");
        alert('Categoria creada correctamente');
  
      } ,(error)=>{
          console.log("hubo error con crear categoria")
  
      } )

    }
    else{
      //modificar
      console.log("id modificar:",this.objetoSeleccionado.id)
      this.servicioHttp.actualizarCategoria(this.objetoSeleccionado.id, JSON.parse(categoria) )
      .subscribe((jsonFile:any)=>{
        
        alert('Categoria modificada correctamente');
        console.log("modificado bien");
  
  
      } ,(error)=>{
          console.log("hubo error con modificar categoria")
  
      } )

    }

    
    this.filtroCrear();
    this.obtenerCategorias();
    this.obtenerProductos();

  }
  
    
   
  
  




}
