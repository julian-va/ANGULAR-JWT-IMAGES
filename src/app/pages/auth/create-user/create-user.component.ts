import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCreate } from 'src/app/dtos/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  userCreateForm: FormGroup;
  private user: UserCreate = {
    user_email: '',
    user_hashed_password: '',
    user_is_active: false,
    user_name: '',
    user_name_login: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.userCreateForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      userLogin: ['', [Validators.required, Validators.minLength(5)]],
      userEmail: ['', [Validators.required, Validators.email]],
      usepassword: ['', [Validators.required, Validators.minLength(6)]],
      isactive: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  createUser() {
    try {
      this.user.user_email = this.userCreateForm.value.userEmail;
      this.user.user_hashed_password = this.userCreateForm.value.usepassword;
      this.user.user_is_active = this.userCreateForm.value.isactive;
      this.user.user_name = this.userCreateForm.value.userName;
      this.user.user_name_login = this.userCreateForm.value.userLogin;
      this.userService.userCreate(this.user).subscribe((data) => {
        this.clear();
        this.router.navigate(['auth']);
      });
    } catch (error) {
      console.error(error);
    }
  }

  clear(): void {
    try {
      this.userCreateForm.reset();
    } catch (error) {
      console.error(error);
    }
  }
}
