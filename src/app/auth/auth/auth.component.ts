import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/dtos/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  formLogin: FormGroup;
  authUser: Auth = { user_email: '', user_hashed_password: '' };

  constructor(private readonly formBuilder: FormBuilder) {
    this.formLogin = this.formBuilder.group({
      loginUser: ['', Validators.required],
      userPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  signIn(): void {
    this.authUser = {
      user_hashed_password: this.formLogin.value.userPassword,
      user_email: this.formLogin.value.loginUser,
    };
    console.log(this.authUser);
  }
}
