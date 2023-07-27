import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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
    .pipe( catchError(errorRes=> {
      let errorMessage = "An unknown error ocurred";
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(()=>new Error(errorMessage));
      }
      switch (errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage= "This email already exists."
        case 'INVALID_PASSWORD':
          errorMessage = "Your password is invalid."
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = "We are sorry, you have exceeded the number of attempts available, please try again later." 
      }

      return throwError(()=>new Error(errorMessage));

    }))
  }
}
