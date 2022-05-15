import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  getUsers(){
    const url = GlobalConstants.apiURL+"/signupUsers";
    return this.http.get(url);
  }
}
