import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/dtos/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  formLogin: FormGroup;
  authUser: Auth = { user_email: '', user_hashed_password: '' };
  private token: string = '';

  constructor(
    private readonly authService: AuthService,
    private formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      loginUser: ['', Validators.required],
      userPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  signIn(): void {
    try {
      const userLogin = (this.authUser = {
        user_hashed_password: this.formLogin.value.userPassword,
        user_email: this.formLogin.value.loginUser,
      });
      this.authService.auth(userLogin).subscribe((response) => {
        if (response.token) {
          this.formLogin.reset();
          this.router.navigate(['users/userAll']);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  createUser(): void {
    try {
      this.router.navigate(['authUserCreate']);
    } catch (error) {
      console.error(error);
    }
  }
}
