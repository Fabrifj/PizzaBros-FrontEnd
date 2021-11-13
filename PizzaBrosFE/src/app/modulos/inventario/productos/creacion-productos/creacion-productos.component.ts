import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';

@Component({
  selector: 'app-creacion-productos',
  templateUrl: './creacion-productos.component.html',
  styleUrls: ['./creacion-productos.component.css']
})
export class CreacionProductosComponent implements OnInit {

  objetoSeleccionado:any = {};

 


  datosIngBackUp:any | undefined;


  datosProd: any | undefined;
  columnasProd = [
    {field:'Nombre',header:'Nombre'},
    {field:'Descripcion',header:'Descripcion'}
   // {field:'Imagen',header:'Imagen'}
    

  ];


  datosIngMini: any | undefined;
  columnasIngMini = [
    {field:'NombreProducto',header:'Nombre Producto'}
   // {field:'Imagen',header:'Imagen'}
    

  ];

  datosIng: any | undefined;
  columnasIng = [
    {field:'Nombre',header:'Nombre Producto'}
   // {field:'Imagen',header:'Imagen'}
    

  ];





  nombreBotonesProd1: string[] = ['Seleccionar'];
  nombreBotonesIng1: string[] = ['Agregar'];
  nombreBotonesIng2: string[] = ['Quitar'];


  nombreBoton :any ;

  constructor(private servicioHttp: AppHttpService, public servicioModal: ModalService) { }

  ngOnInit(): void {

    this.filtroCrear();
    this.obtenerIngredientes();
  }
  obtenerIngredientes(){
    this.servicioHttp.obtenerIngredientes()
    .subscribe((jsonFile:any)=>{
     
      console.log(jsonFile);

      this.datosIng = jsonFile;
      this.datosIngBackUp = this.datosIng;
      

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




  
  funcionBoton( names: any){
    
    if (names[0] == "Seleccionar"){
      
        this.obtenerIngredientes();
        this.objetoSeleccionado = names[1] ;

        console.log("objetoseleccion:",this.objetoSeleccionado)
        this.datosIngMini = this.objetoSeleccionado.ListaProductos;

        this.datosIngMini.forEach((element:any) => {
            //quitar de lista grande
            this.datosProd = this.datosProd.filter((obj:any) => obj.id !== element.IdProducto);
        });
      

        (<HTMLInputElement>document.getElementById("objetoSeleccionadoID")).value = this.objetoSeleccionado.Nombre;
        (<HTMLInputElement>document.getElementById("nuevoNP")).value = this.objetoSeleccionado.Nombre;
        (<HTMLInputElement>document.getElementById("nuevoDP")).value = this.objetoSeleccionado.Descripcion;
        //new
        

                
        this.servicioModal.cerrar('modalProd-2');






    }
    else if(names[0]=="Agregar"){

      var elemAgregar = names[1];
      
      //console.log(elemAgregar);
     
      
      //quitar de lista grande
      this.datosIng = this.datosIng.filter((obj:any) => obj.id !== elemAgregar.id);

      //agregar a lista pequna
      var elemNuevo = JSON.stringify({IdProducto: elemAgregar.id , NombreProducto: elemAgregar.Nombre , ImgURL: elemAgregar.ImgURL});
      this.datosIngMini.push(JSON.parse(elemNuevo));
      
    }
    else{
        //quitar

        var elemQuitar = names[1];
        var ingSeleccionado :any = {};
        this.datosIngBackUp.forEach((element:any) => {
          if(element.id == elemQuitar.IdProducto){
            ingSeleccionado = element;
          }
        });

        
        //qutiar mini lista
        this.datosIngMini = this.datosIngMini.filter((obj:any) => obj.IdProducto !== elemQuitar.IdProducto);
        
       // var elemNuevo = JSON.stringify({ id: elemQuitar.IdProducto , Nombre: elemQuitar.NombreProducto , ImgURL: elemQuitar.ImgURL});
        
        

        console.log("ingseleccionado", ingSeleccionado)
        this.datosIng.push( ingSeleccionado);

    }
  }

  filtroCrear(){
    this.nombreBoton = "CREAR";
    this.objetoSeleccionado = "";
    this.datosIngMini = [];
    this.datosProd = this.datosIngBackUp;
    (<HTMLInputElement>document.getElementById("nuevoNP")).value = "";
    (<HTMLInputElement>document.getElementById("siModifico")).style.display = "none";
    (<HTMLInputElement>document.getElementById("nuevoDP")).value = "";
    (<HTMLInputElement>document.getElementById("crearP")).checked = true;
  }

  filtroModificar(){

    this.nombreBoton = "MODIFICAR";
    this.obtenerProductos();
    
    this.servicioModal.abrir('modalProd-2');
    (<HTMLInputElement>document.getElementById("siModifico")).style.display = "inline";

  }
  crearProducto(){

    var nombreC = (<HTMLInputElement>document.getElementById("nuevoNP")).value;
    var descripcionC = (<HTMLInputElement>document.getElementById("nuevoDP")).value;


   
    var categoria = JSON.stringify({ ListaProductos : this.datosIngMini , Nombre: nombreC , Descripcion: descripcionC })
    console.log(JSON.parse(categoria));

    if(this.nombreBoton == "CREAR"){

      this.servicioHttp.crearProducto(JSON.parse(categoria))
      .subscribe((jsonFile:any)=>{
        
        console.log("creado bien");
        alert('producto creada correctamente');
  
      } ,(error)=>{
          console.log("hubo error con crear producto")
  
      } )

    }
    else{
      //modificar
      
      /*console.log("id modificar:",this.objetoSeleccionado.id)
      this.servicioHttp.actualizarProducto(this.objetoSeleccionado.id, JSON.parse(categoria) )
      .subscribe((jsonFile:any)=>{
        
        alert('Categoria modificada correctamente');
        console.log("modificado bien");
  
  
      } ,(error)=>{
          console.log("hubo error con modificar categoria")
  
      } )
*/
    }

    
    this.filtroCrear()

  }
  
    

}
