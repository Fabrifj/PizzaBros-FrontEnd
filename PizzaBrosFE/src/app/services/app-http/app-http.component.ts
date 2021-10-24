import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-app-http',
  templateUrl: './app-http.component.html',
  styleUrls: ['./app-http.component.css']
})
export class AppHttpComponent implements OnInit {

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
  }

}
