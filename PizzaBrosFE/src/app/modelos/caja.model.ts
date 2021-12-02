export class CajaModel {
    Fecha:Date;
    Tipo: string;
    Descripcion:string;
    Cantidad:number;
    constructor(fecha:Date, tipo:string, des:string, cantidad:number){
        this.Fecha = fecha;
        this.Tipo = tipo;
        this.Descripcion = des;
        this.Cantidad =  cantidad;
    }

}

