export class TransaccionModel {
    public Cantidad: number;
    public Descripcion: string;
    public Fecha : Date;
    public Tipo : string;
  
    constructor(c: number, des: string,f:Date,t:string) {
      this.Cantidad = c;
      this.Descripcion = des;
      this.Fecha=f;
      this.Tipo=t;

    }
  }
