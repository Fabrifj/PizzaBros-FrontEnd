export class productCatModel {
    public IdProducto: string;
    public NombreProducto: string;
    public ImgURL: string;


    constructor(id: string, name: string,  image: string) {
      this.IdProducto = id;
      this.NombreProducto = name;
      this.ImgURL = image;

    }
  }