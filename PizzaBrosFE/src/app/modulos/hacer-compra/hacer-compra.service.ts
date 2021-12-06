import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { ArticuloListaModel } from 'src/app/modelos/articuloLista.model';
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
  jsonn:any|undefined;
  elementosFast: ElementoModel[] =[];
  elementosNombres: string[]=["salsa de tomate"];
  elementoSeleccionado: string="";
  constructor(private httpService: AppHttpService) {
    this.obtenerElementosHttp();
    this.elementos.forEach((element)=>{
      this.elementosNombres.push(element.Nombre)
    });
    
    console.log('categorias',this.elementosNombres)
   }

  ngOnInit(): void {
    this.obtenerElementosHttp();
    this.elementos.forEach((element)=>{
      this.elementosNombres.push(element.Nombre)
    });
    console.log("service init")

  }
  obtenerElementosHttp(){
    this.httpService.obtenerElementos().subscribe(
      (jsonFile) => {
        console.log(jsonFile);
        this.elementos = <ElementoModel[]>jsonFile;
        console.log('Elementos async',this.elementos)
      });
  }


  // para lista 
  addIngrediente(newOrder: ArticuloListaModel, amount: number,precio:number,id:string) {
    let newOrderComprado = new ArticuloCompradoModel(id, this.elementoSeleccionado, newOrder.Marca, newOrder.CantidadMedida, amount, precio);
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
    return this.elementos.find( (element)=> element.Nombre == ele); 
  }
  obtenerNombres(){
    
    return this.elementosNombres;
  }
  /// 
  registrarCompra(){
    
  }
}
