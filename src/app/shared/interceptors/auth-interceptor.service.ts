import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return this.authService.userSubject.pipe(take(1), //user is a behavior subject, this allows us to extract the value, even when we are not in the next statement
    exhaustMap(user => {
      if (!user) {
        return next.handle(req)  //the token is addes just if it exists
      }
      const modifiedRequest = req.clone({params: new HttpParams().set('auth',user.token)})
      return next.handle(modifiedRequest);
   }),
  )

  }
}
