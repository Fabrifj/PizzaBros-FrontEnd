
export class EmpleadoModel {
    public Nombre: string;
    public ApellidoP:string ;
    public ApellidoM:string ;
    public CI:number;
    public Celular:number;
    public FechaNacimiento:Date;
    public Cargo:string;
    public HorarioSemanal:EmpleadoHModel[] | any;
    public ListaTurnos: EmpleadoTModel[] | any;
  
    constructor(name: string, apep : string, apem:string, ci:number, num: number, fecha:Date, cargo: string) {
      this.Nombre = name;
      this.ApellidoP = apep;
      this.ApellidoM = apem;
      this.CI=ci;
      this.Celular = num;
      this.FechaNacimiento = fecha;
      this.Cargo = cargo;

    
    }
  }
export class EmpleadoTModel {
    public Fecha : Date;
    public Turnos: Turno[];


  
    constructor(fecha: Date, turnos: Turno[]) {
      this.Fecha = fecha;
      this.Turnos = turnos;
    
    }
  }

export class Turno{
    public Id: string;
    public Estado: string;

    constructor(id:string, estado:string){
        this.Id = id;
        this.Estado = estado;
    }
}
export class EmpleadoHModel {
    public Dia: string;
    public Turnos: string[];


  
    constructor(dia: string, turnos: string[]) {
      this.Dia = dia;
      this.Turnos = turnos;
    
    }
  }