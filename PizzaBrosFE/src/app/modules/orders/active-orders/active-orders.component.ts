import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {

  public fecha : string = '';


  constructor() { }

  ngOnInit() {
      this.fecha = "22 de octubre del 2021";
  }

}
