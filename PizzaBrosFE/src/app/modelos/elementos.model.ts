import { ArticuloListaModel } from "./articuloLista.model";

export class ElementoModel {
    public Id: number;
    public CantidadInventario: number;
    public CantidadMedida: number;
    public CostoMedia: number;
    public ListaArticulos: ArticuloListaModel[] ; 
    public Nombre: string;
    public Tipo: string;
    public TipoUnidad: string;


    constructor(id:number,caI:number,caM:number,coM:number, liA:ArticuloListaModel[], nombre:string,t:string,tU:string) {
      this.Id =id ;
      this.CantidadInventario = caI;
      this.CantidadMedida = caM;
      this.CostoMedia = coM;
      this.ListaArticulos = liA;
      this.Nombre = nombre;
      this.Tipo = t;
      this.TipoUnidad = tU;


    }
  }