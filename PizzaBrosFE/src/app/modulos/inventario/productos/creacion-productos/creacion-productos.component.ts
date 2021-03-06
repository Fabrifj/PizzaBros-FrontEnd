import { Component, OnInit, ViewChild } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';
import { TablaReusableComponent } from 'src/app/shared-modules/tabla-reusable/tabla-reusable.component';

@Component({
  selector: 'app-creacion-productos',
  templateUrl: './creacion-productos.component.html',
  styleUrls: ['./creacion-productos.component.css']
})
export class CreacionProductosComponent implements OnInit {

  objetoSeleccionado:any = {};

 

  @ViewChild(TablaReusableComponent) hijoTabla:TablaReusableComponent | undefined ;
  
  
  datosIngBackUp:any | undefined;


  datosProd: any | undefined;
  columnasProd = [
    {field:'Nombre',header:'Nombre'},
    
   // {field:'Imagen',header:'Imagen'}
    

  ];


  datosIngMini: any | undefined;
  columnasIngMini = [
    {field:'Nombre',header:'Nombre Ingrediente'},
    {field:'TipoUnidad',header:'Tipo de Unidad'},
    {field:'Costo',header:'Costo Media'}
    

  ];

  datosIng: any | undefined;

  columnasIng = [
    
    {field:'Nombre',header:'Nombre Ingrediente'},
    {field:'TipoUnidad',header:'Tipo de Unidad'},
    {field:'CostoMedia',header:'Costo Media'}
    
    

  ];



  nombreBotonesProd1: string[] = ['Seleccionar'];
  nombreBotonesIng1: string[] = ['Agregar'];
  nombreBotonesIng2: string[] = ['Quitar'];
  
  titulosIng: string[] = ['Cantidad'];

  nombreBoton :any ;


  datosIngrendientesCCantidad :any;

  constructor(private servicioHttp: AppHttpService, public servicioModal: ModalService) { }

  ngOnInit(): void {

    this.filtroCrear();
    this.obtenerIngredientes();
  }
  
  
  obtenerIngredientes(){
    this.servicioHttp.obtenerIngredientes()
    .subscribe((jsonFile:any)=>{

      this.datosIng = jsonFile;
      this.datosIngBackUp = jsonFile;
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }


  obtenerProductos(){
    this.servicioHttp.obtenerProductos()
    .subscribe((jsonFile:any)=>{
      this.datosProd = jsonFile;
     
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }




  
  funcionBoton( names: any){
    
    if (names[0] == "Seleccionar"){
      
        this.objetoSeleccionado = names[1] ;
        this.datosIngMini = this.objetoSeleccionado.ListaIngredientes;

        console.log('datosINGmini', this.datosIngMini);
        this.datosIngMini.forEach((element:any) => {
            //quitar de lista grande
            this.datosIng = this.datosIng.filter((obj:any) => obj.id !== element.IdIngrediente);
        });
      

        //rellenamos los valores
        (<HTMLInputElement>document.getElementById("objetoSeleccionadoID")).value = this.objetoSeleccionado.IdIngrediente;
        (<HTMLInputElement>document.getElementById("nuevoNP")).value = this.objetoSeleccionado.Nombre;
        (<HTMLInputElement>document.getElementById("nuevoTP")).value = this.objetoSeleccionado.Tamano;
        (<HTMLInputElement>document.getElementById("nuevoPP")).value = this.objetoSeleccionado.Precio;
        (<HTMLInputElement>document.getElementById("nuevoCP")).value = this.objetoSeleccionado.Costo;
        (<HTMLInputElement>document.getElementById("nuevoIP")).value = this.objetoSeleccionado.ImgURL;

        var indice1 = 0 ;
     
        this.datosIngMini.forEach((element:any) => {
          var indice2 = 0 ;
          this.titulosIng.forEach((titulo:any) => {
    
            var nombreCC  = 'textoCantidad' + indice1 + indice2 ; 
            
            (<HTMLInputElement>document.getElementById(nombreCC)).value = element.Cantidad ;
    
            
            indice2 = indice2 +1;
          });
          
    
          indice1= indice1+1;
        });



        //new
        

                
        this.servicioModal.cerrar('modalProd-2');






    }
    else if(names[0]=="Agregar"){

      var elemAgregar = names[1];
    
      
      //quitar de lista grande
      this.datosIng = this.datosIng.filter((obj:any) => obj.id !== elemAgregar.id);

      //agregar a lista pequna
      var elemNuevo = JSON.stringify({IdIngrediente: elemAgregar.id , Nombre: elemAgregar.Nombre , Costo: elemAgregar.CostoMedia , Cantidad: elemAgregar.CantidadInventario , TipoUnidad:elemAgregar.TipoUnidad});
      this.datosIngMini.push(JSON.parse(elemNuevo));
      


      var costo = 0 ;
      this.datosIngMini.forEach((element:any) => {
         costo = costo + parseInt(element.Costo);
      });

      (<HTMLInputElement>document.getElementById("nuevoCP")).value = String(costo);

      var indice1 = 0 ;
     
      this.datosIngMini.forEach((element:any) => {
        var indice2 = 0 ;
        this.titulosIng.forEach((titulo:any) => {

          var nombreCC  = 'textoCantidad' + String(indice1) + String(indice2) ;
          (<HTMLInputElement>document.getElementById(nombreCC)).value = "0" ;
  
          
          indice2 = indice2 +1;
        });
        
  
        indice1= indice1+1;
      });
    }
    else if(names[0]=="Quitar"){
        //quitar

        var elemQuitar = names[1];
        var ingSeleccionado :any = {};
        this.datosIngBackUp.forEach((element:any) => {
          if(element.id == elemQuitar.IdIngrediente){
            ingSeleccionado = element;
          }
        });

        
        //qutiar mini lista
        this.datosIngMini = this.datosIngMini.filter((obj:any) => obj.IdIngrediente !== elemQuitar.IdIngrediente);
        
       // var elemNuevo = JSON.stringify({ id: elemQuitar.IdProducto , Nombre: elemQuitar.NombreProducto , ImgURL: elemQuitar.ImgURL});
       var costo = 0 ;
       this.datosIngMini.forEach((element:any) => {
          costo = costo + parseInt(element.Costo);
       });
 
       (<HTMLInputElement>document.getElementById("nuevoCP")).value = String(costo);
        this.datosIng.push( ingSeleccionado);

    }
    else{
      //Guardar todo
      if(names[2] == "0") {
        this.datosIngrendientesCCantidad = names[1];
        var costo = 0 ;
        this.datosIngrendientesCCantidad.forEach((element:any) => {
           costo = costo + parseInt(element.Costo);
        });
  
        (<HTMLInputElement>document.getElementById("nuevoCP")).value = String(costo);


      }
     
    }



  }

  filtroCrear(){
    this.nombreBoton = "CREAR";
    this.objetoSeleccionado = "";
    this.datosIngMini = [];
    this.datosProd = this.datosIngBackUp;

    (<HTMLInputElement>document.getElementById("crearP")).checked = true;
    (<HTMLInputElement>document.getElementById("siModifico")).style.display = "none";
    
    
    
    (<HTMLInputElement>document.getElementById("nuevoNP")).value = "";
    (<HTMLInputElement>document.getElementById("nuevoTP")).value = "";
    (<HTMLInputElement>document.getElementById("nuevoPP")).value = "0";
    (<HTMLInputElement>document.getElementById("nuevoCP")).value = "0";
    (<HTMLInputElement>document.getElementById("nuevoIP")).value = "";
     this.obtenerIngredientes();
  }

  filtroModificar(){

    this.nombreBoton = "MODIFICAR";
    this.obtenerProductos();
    
    this.servicioModal.abrir('modalProd-2');
    (<HTMLInputElement>document.getElementById("siModifico")).style.display = "inline";

  }
  crearProducto(){

    this.hijoTabla?.guardarDT();
    

    
    
    var nombreP = (<HTMLInputElement>document.getElementById("nuevoNP")).value ;
    var tamanoP = (<HTMLInputElement>document.getElementById("nuevoTP")).value ;
    var precioP = (<HTMLInputElement>document.getElementById("nuevoPP")).value ;
    var costoP = (<HTMLInputElement>document.getElementById("nuevoCP")).value ;
    var imgP = (<HTMLInputElement>document.getElementById("nuevoIP")).value ;

    var producto = JSON.stringify({ ListaIngredientes : this.datosIngrendientesCCantidad , Nombre: nombreP , Tamano : tamanoP , Costo: costoP , Precio:precioP ,ImgURL:imgP })
    

    if(this.nombreBoton == "CREAR"){

      this.servicioHttp.crearProducto(JSON.parse(producto))
      .subscribe((jsonFile:any)=>{
        alert('producto creada correctamente');
  
      } ,(error)=>{
          console.log("hubo error con crear producto")
  
      } )

    }
    else{
      //modificar
      
      this.servicioHttp.actualizarProducto(this.objetoSeleccionado.id, JSON.parse(producto) )
      .subscribe((jsonFile:any)=>{
        
        alert('producto modificada correctamente');
  
  
      } ,(error)=>{
          console.log("hubo error con modificar prodcuto")
  
      } )

    }

    
    this.filtroCrear();
    this.obtenerIngredientes();

  }
  
    

}
