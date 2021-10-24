import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url :string;
  constructor( private httpClient: HttpClient) {
      this.url = 'https://jsonplaceholder.typicode.com/users';
   }

   getUser(){

      return this.httpClient.get(this.url)
      
   }
}
