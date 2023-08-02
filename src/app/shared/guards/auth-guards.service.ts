import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "../services";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard  {
    constructor(private authService:AuthService,private router:Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean| Promise<Boolean> | Observable<boolean | UrlTree> | UrlTree {
        return this.authService.userSubject.pipe(take(1),
        map(user=> {
            const isAuth = !!user;
            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/auth'])// in case it is not authenticated, redirect, it means a return type=> Observable<UrlTree>
        }))
    }

}

