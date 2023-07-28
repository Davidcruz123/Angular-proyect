import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared';
import { AuthResponseData } from 'src/app/shared/models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {

  public isloginMode = true;
  public isLoading = false;
  public error:string = null;


  constructor(private authService: AuthService) {

  }

  public onSwitchMode() {
    this.isloginMode = !this.isloginMode;
  }
  public onSubmit(form: NgForm) {
    if (!form.valid) {
      return; //Extra validation step, user could send by using dev tools 
    }
    const { email, password } = form.value;
    let authObs:Observable<AuthResponseData>;
    this.isLoading=true;
    if (this.isloginMode) {
      authObs = this.authService.login(email,password);
    } else {
      authObs =this.authService.signup(email, password)
    }

    authObs.subscribe({
      next: response => {
        console.log(response);
        this.isLoading=false;
      },
      error: errorMessage => { // remember error had ben modified on pipe
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading=false;
      }
    })

    form.reset();

  }
  
}
