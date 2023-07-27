import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {

  isloginMode = true;

  constructor(private authService: AuthService) {

  }

  public onSwitchMode() {
    this.isloginMode = !this.isloginMode;
  }
  public onSubmit(form: NgForm) {
    if (!form.valid) {
      return; //Extra validation step, user could send by using dev tools 
    }
    if (this.isloginMode) {

    } else {
      const { email, password } = form.value;
      this.authService.signup(email, password).subscribe({
        next: response => console.log(response),
        error: response => console.log(response)
      });
    }



  }
}
