import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class NewproductService {

  constructor(private http:HttpClient) { }

  addOrder(body:any){
    const url = GlobalConstants.apiURL+"/products";
    return this.http.post(url,body);
  }
  getAllProducts(){
    const url = GlobalConstants.apiURL+"/products";
    return this.http.get(url);
  }
  deleteOrder(id:any){
    const url = GlobalConstants.apiURL+"/products/"+id;
    return this.http.delete(url);
  }
  updateOrder(id:any,body:any){
    const url = GlobalConstants.apiURL+"/products/"+id;
    return this.http.put(url,body);
  }
}
