import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { ArticuloModel } from 'src/app/modelos/articulo.model';
import { ArticuloCompradoModel } from 'src/app/modelos/articuloComprado.model';
import { ElementoModel } from 'src/app/modelos/elementos.model';
import { AppHttpService } from 'src/app/servicios/app-http.service';

@Injectable({
  providedIn: 'root'
})
export class HacerCompraService implements OnInit{

  comprasCambio = new EventEmitter<ArticuloCompradoModel[]>();

  ingredintes:ArticuloCompradoModel[] =[] ; 
  elementos: ElementoModel[] =[];
  elementosNombres: string[]=["salsa de tomate"];
  elementoSeleccionado: string="";
  constructor(private httpService: AppHttpService) { }

  ngOnInit(): void {
    this.obtenerElementosHttp();
    this.elementos.forEach((element)=>{
      this.elementosNombres.push(element.Nombre)
    });
    console.log("service init")

    console.log(this.elementosNombres)
  }
  obtenerElementosHttp(){
    this.httpService.obtenerElementos().subscribe(
      (jsonFile) => {
        console.log(jsonFile);
        this.elementos = <ElementoModel[]>jsonFile;
      });
  }


  // para lista 
  addIngrediente(newOrder: ArticuloModel, amount: number,precio:number) {
    let newOrderComprado = new ArticuloCompradoModel(newOrder.Id, this.elementoSeleccionado, newOrder.Nombre, newOrder.CantidadMedida, amount, precio);
    this.ingredintes.push(newOrderComprado);
    console.log("add order");
    this.comprasCambio.emit(this.obtenerListaCompras());
  }

  obtenerListaCompras() {
    return this.ingredintes.slice();
  }
/// para selecionar 
  obtenerElementos(ele:string){
    this.elementoSeleccionado =ele;
    return this.elementos.find( (element)=> element.Nombre = ele); 
  }
  obtenerNombres(){
    
    return this.elementosNombres;
  }
  /// 
  registrarCompra(){
    
  }
 

}
