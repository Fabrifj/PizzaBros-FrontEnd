import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  today= new Date(); ;
  date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
  //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
  constructor() { }

  ngOnInit(): void {
  }

}
