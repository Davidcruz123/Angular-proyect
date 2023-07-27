import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../models';



const USERS_AUTHENTICATION_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwvCUOsxBX0q1Pa9S-EhKcuZ50C96tnLk";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  public signup(email:string,password:string):Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(USERS_AUTHENTICATION_URL, {
      email,
      password,
      returnSecureToken:true
    } )
  }
}
