import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesUrl } from 'src/app/dtos/user-files';
import { TokenService } from 'src/app/services/token.service';
import { UserFilesService } from 'src/app/services/user-files.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  filesUrl: FilesUrl[] = [];
  constructor(
    private readonly userFilesService: UserFilesService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

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
      if (file != null) {
        this.filesUrl = [];
        for (let index = 0; index < file.length; index++) {
          this.userFilesService.fileUpload(file[index], 1).subscribe(
            (res) => {
              this.filesUrl = res;
              console.log(this.filesUrl);
            },
            (error) => {
              console.log(error);
            }
          );
          //console.log(file[index]);
        }
        file = null;
      }
    } catch (error) {}
  }
}
