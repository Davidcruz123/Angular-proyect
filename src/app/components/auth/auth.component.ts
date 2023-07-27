import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared';

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
    this.isLoading=true;
    if (this.isloginMode) {

    } else {
      this.authService.signup(email, password).subscribe({
        next: response => {
          console.log(response);
          this.isLoading=false;
        },
        error: response => {
          console.log(response);
          this.error = "An error ocurred"
          this.isLoading=false;
        }
      });
    }

    form.reset();



  }
}
