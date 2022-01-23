import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TypeImages } from 'src/app/dtos/user-files';
import { TokenService } from 'src/app/services/token.service';
import { UserFilesService } from 'src/app/services/user-files.service';
import { ResponTokenVerify } from 'src/app/dtos/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  filesUrl: (ArrayBuffer | string | null)[] = [];
  private userSesion: ResponTokenVerify = {
    creation_date: new Date(),
    exp: 0,
    user_email: '',
    user_hashed_password: '',
    user_id: 0,
    user_is_active: false,
    user_name: '',
    user_name_login: '',
  };
  constructor(
    private readonly userFilesService: UserFilesService,
    private readonly tokenService: TokenService,
    private readonly router: Router,
    private readonly toastrService: ToastrService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((res) => {
      if (res != null) {
        this.userSesion = res;
      }
    });
  }

  logout(): void {
    try {
      this.tokenService.deleteToken();
      this.router.navigate(['auth']);
    } catch (error) {
      console.error(error);
    }
  }

  onUpload(event: Event): void {
    try {
      const element = event.target as HTMLInputElement;
      let file = element.files;
      let vrf = this.onValidateTypeImg(file);
      if (file != null && vrf) {
        this.filesUrl = [];
        for (let index = 0; index < file.length; index++) {
          const reader = new FileReader();
          let temp!: string | ArrayBuffer | null;

          reader.onload = (e) => {
            temp = reader.result;
            this.filesUrl.push(temp);
          };

          reader.readAsDataURL(file[index]);

          this.userFilesService
            .fileUpload(file[index], this.userSesion.user_id)

            .subscribe(
              (res) => {},
              (error) => {
                console.log(error);
              }
            );
        }
        this.toastrService.success(
          'images uploaded with success',
          'images upload'
        );
        file = null;
      }
    } catch (error) {
      console.error(error);
    }
  }

  onClear(): void {
    this.filesUrl = [];
  }
  onValidateTypeImg(file: FileList | null): boolean {
    let temp: boolean = false;
    if (file != null) {
      for (let index = 0; index < file.length; index++) {
        if (
          file[index].type === (TypeImages[0] || TypeImages[1] || TypeImages[2])
        ) {
          temp = true;
        } else {
          this.toastrService.error(
            `the type of the images must be: ${TypeImages[0]}, ${TypeImages[1]}, ${TypeImages[2]}`,
            'bug uploading'
          );
          temp = false;
        }
      }
    }
    return temp;
  }
}
