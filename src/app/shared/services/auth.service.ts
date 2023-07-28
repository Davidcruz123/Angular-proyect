import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { AuthResponseData, User } from '../models';


const SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwvCUOsxBX0q1Pa9S-EhKcuZ50C96tnLk";
const SIGN_IN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwvCUOsxBX0q1Pa9S-EhKcuZ50C96tnLk";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new Subject<User>;

  constructor(private http:HttpClient) { }

  public signup(email:string,password:string):Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(SIGN_UP_URL, {
      email,
      password,
      returnSecureToken:true
    } )
    .pipe( catchError(this.handleError),
    tap(response => {
      this.createNewUser(response.email,response.localId,response.idToken,+response.expiresIn);
    })
    )
  }

  public login(email:string,password:string) {
    return this.http.post<AuthResponseData >(SIGN_IN_URL, {
      email,
      password,
      returnSecureToken:true
    })
    .pipe( catchError(this.handleError),
    tap(response => {
      this.createNewUser(response.email,response.localId,response.idToken,+response.expiresIn);
    })
    )
  }

  private handleError(errorResp:HttpErrorResponse){
    let errorMessage = "An unknown error ocurred";
    if (!errorResp.error || !errorResp.error.error) {
      return throwError(()=>new Error(errorMessage));
    }
    console.log(errorResp.error.error.message);
    switch (errorResp.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage= "This email already exists."
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = "Password sign-in is disabled for this project"
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = "We are sorry, you have exceeded the number of attempts available, please try again later." 
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted"
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "The password is invalid or the user does not have a password."
        break;
      case 'USER_DISABLED':
        errorMessage = "The user account has been disabled by an administrator."
        break;
    }

    return throwError(()=>new Error(errorMessage));
  }
  private createNewUser(email:string,id:string,token:string, expirationTime:number){
    const expirationDate = new Date(new Date().getTime()+ expirationTime*1000)
    const user = new User(email,id,token,expirationDate )
    this.userSubject.next(user);
  }
}
