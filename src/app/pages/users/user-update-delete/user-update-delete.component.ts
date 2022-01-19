import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserCreate } from 'src/app/dtos/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-update-delete',
  templateUrl: './user-update-delete.component.html',
  styleUrls: ['./user-update-delete.component.css'],
})
export class UserUpdateDeleteComponent implements OnInit {
  private idUser: number = 0;
  userCreateForm: FormGroup;
  private user: UserCreate = {
    user_email: '',
    user_hashed_password: '',
    user_is_active: false,
    user_name: '',
    user_name_login: '',
  };
  constructor(
    private readonly toastrService: ToastrService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userCreateForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      userLogin: ['', [Validators.required, Validators.minLength(5)]],
      userEmail: ['', [Validators.required, Validators.email]],
      usepassword: ['', [Validators.required, Validators.minLength(6)]],
      isactive: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('userId');
    if (userId) {
      const temp = Number.parseInt(userId);
      this.idUser = temp;

      this.userService.userById(temp).subscribe((response) => {
        this.userCreateForm.controls['userEmail'].setValue(response.user_email);
        this.userCreateForm.controls['usepassword'].setValue(
          response.user_hashed_password
        );
        this.userCreateForm.controls['isactive'].setValue(
          response.user_is_active
        );
        this.userCreateForm.controls['userName'].setValue(response.user_name);
        this.userCreateForm.controls['userLogin'].setValue(
          response.user_name_login
        );
      });
    }
  }

  updateUser() {
    try {
      this.user.user_email = this.userCreateForm.value.userEmail;
      this.user.user_hashed_password = this.userCreateForm.value.usepassword;
      this.user.user_is_active = this.userCreateForm.value.isactive;
      this.user.user_name = this.userCreateForm.value.userName;
      this.user.user_name_login = this.userCreateForm.value.userLogin;
      this.userService
        .userUpdate(this.idUser, this.user)
        .subscribe((response) => {
          this.toastrService.success(
            'Usuario actualizado con exito',
            'Actualizar Usuario'
          );
        });
    } catch (error) {
      console.error(error);
    }
  }
}
