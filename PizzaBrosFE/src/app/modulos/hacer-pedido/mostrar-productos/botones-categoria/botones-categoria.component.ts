import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import {MostrarProductosComponent} from "../mostrar-productos.component";

@Component({
  selector: 'app-botones-categoria',
  templateUrl: './botones-categoria.component.html',
  styleUrls: ['./botones-categoria.component.css']
})
export class BotonesCategoriaComponent implements OnInit {

  datosCat: any | undefined;

  constructor(private servicioHttp: AppHttpService, public mostrarProductos: MostrarProductosComponent) { }
  
  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    this.servicioHttp.obtenerCategorias()
    .subscribe((jsonFile:any)=>{
      this.datosCat = jsonFile;

    } ,(error)=>{
        console.log("hubo error con categoria")

    } )
  }
}
