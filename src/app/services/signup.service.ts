import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ GlobalConstants } from '../constants'
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  signUp(body:any){
    const url = GlobalConstants.apiURL+"/signupUsers";
    return this.http.post(url,body);
  }
}
