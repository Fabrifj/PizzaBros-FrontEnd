import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/servicios/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';

@Component({
  selector: 'app-turnos-empleados',
  templateUrl: './turnos-empleados.component.html',
  styleUrls: ['./turnos-empleados.component.css']
})
export class TurnosEmpleadosComponent implements OnInit {
  

  constructor(private servicioHttp: AppHttpService, public servicioModal: ModalService) { }

  datosEmp: any | undefined;

  columnasEmp = [
    {field:'Nombre',header:'Nombre'},
    {field:'ApellidoP',header:'ApellidoP'},
    {field:'ApellidoM',header:'ApellidoM'},
    {field:'CI',header:'CI'},
    {field:'Celular',header:'Celular'},
    {field:'FechaNacimineto',header:'Fecha de Nacimiento'},
    {field:'Cargo',header:'Cargo'}
  ];
  nombreBotonesEmp: string[] | undefined;


  datosTurn: any | undefined;

  columnasTurn = [
    {field:'Nombre',header:'Nombre'},
    {field:'HoraInicio',header:'Hora Inicio'},
    {field:'HoraFin',header:'Hora Fin'}
  ];


  ngOnInit(): void {
  }
  funcionBoton( nombres: any){

  }

  funcionAbrirTurnos(){
    this.servicioModal.abrir('modalProd-1');
  }

  funcionCancelarTurno(){
    
    this.servicioModal.cerrar('modalProd-1');
    (<HTMLInputElement>document.getElementById('rTurnos')).checked= false;
  }

  funcionAbrirTurnosEmpleados(){
    this.servicioModal.abrir('modalTurosEmpleados');
  }

  funcionCancelarTurnEmpleado(){
    this.servicioModal.cerrar('modalTurosEmpleados');
    (<HTMLInputElement>document.getElementById('rTEmpleados')).checked= false;
  }
}
