export class productModel {
    public id: string;
    public Nombre: string;
    // public lengt: string
    public Tamano: string;
    public Precio: number;
    public Costo: number;
    public ImgURL: string;

  
    constructor(id: string, name: string, tam: string, precio:number,costo: number,  image: string) {
      this.id = id;
      this.Nombre = name;
      this.Tamano = tam;
      this.Precio = precio;
      this.Costo = costo;
      this.ImgURL = image;

    }
  }