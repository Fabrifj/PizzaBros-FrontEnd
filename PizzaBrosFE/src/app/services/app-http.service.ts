import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {


  constructor( private http: HttpClient) { }

  defUrl = "/api/";
  getProducts() {
    return this.http.get(this.defUrl+"getProductos")
  }
  getOrders() {
    return this.http.get(this.defUrl+"getPedidos")
  }
  

}
