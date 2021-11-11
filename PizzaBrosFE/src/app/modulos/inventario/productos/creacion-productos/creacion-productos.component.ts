import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';

@Component({
  selector: 'app-creacion-productos',
  templateUrl: './creacion-productos.component.html',
  styleUrls: ['./creacion-productos.component.css']
})
export class CreacionProductosComponent implements OnInit {

  ingredienteSeleccionado:any = {}
  nombreBotones: string[] | undefined;


  datos: any | undefined;
  datosRespaldo: any | undefined;
  columnas = [
    {field:'Nombre',header:'Nombre'},
    {field:'Cantidad',header:'Unidades Restantes'},
    {field:'UnidadMedida',header:'Medida de Unidad'},
    //{field:'CostoUnidad',header:'Costo Unidad Bs'},
    {field:'Proveedor',header:'Proveedor'}
    

  ];

  constructor(private servicioHttp: AppHttpService, public servicioModal: ModalService) { }

  ngOnInit(): void {

    this.nombreBotones = ['Modificar','Comprar'];
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.servicioHttp.obtenerIngredientes()
    .subscribe((jsonFile:any)=>{
     
      console.log(jsonFile);
      this.datos = jsonFile;
       this.datosRespaldo = jsonFile;
      

    } )
  }
   ///crear Ingrediente
   crearIngrediente( ){

    var nuevoValorNombre = (<HTMLInputElement>document.getElementById("valorNombreCrear")).value;
    var nuevoValorUnidad = (<HTMLInputElement>document.getElementById("valorUnidadCrear")).value;

    //let body = JSON.stringify({ IdPedido: pedido.id , Estado: "Entregado"})
    let ingredienteNuevo = JSON.stringify({cantidad: 0, costoTotal:0, nombre: nuevoValorNombre , ipoUnidad: nuevoValorUnidad});
    let body = JSON.parse(ingredienteNuevo)
    this.servicioHttp.crearProducto(body).subscribe((response) => {
      console.log('Response from API', response);
      this.obtenerProductos();
    }, (error)=>{
      console.log('Error',error);
    })
	


    this.servicioModal.cerrar('modal-4');
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
      this.obtenerProductos();

    }
    

    
    
    
  }

}
