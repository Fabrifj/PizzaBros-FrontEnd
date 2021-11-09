import { Component, OnInit } from '@angular/core';
import { ingredienteModel } from 'src/app/modelos/ingrediente.model';
import { AppHttpService } from 'src/app/servicios/app-http.service';

@Component({
  selector: 'app-mostrar-ingredientes',
  templateUrl: './mostrar-ingredientes.component.html',
  styleUrls: ['./mostrar-ingredientes.component.css']
})
export class MostrarIngredientesComponent implements OnInit {

  ingredientes: ingredienteModel[]=[]; 
  categoria ="Ingredientes";

  constructor(private httpService: AppHttpService) { }

  ngOnInit(): void {
    this.httpService.obtenerIngredientes()
      .subscribe((jsonFile) => {
        console.log(jsonFile);
        this.ingredientes = <ingredienteModel[]>jsonFile;
        console.log(this.ingredientes[0]);

      });
  }
  cambiarCategoria(newCategory:string){
    this.categoria= newCategory;
  }

}
