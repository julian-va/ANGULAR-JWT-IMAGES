import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserFilesService } from 'src/app/services/user-files.service';

@Component({
  selector: 'app-filesuser',
  templateUrl: './filesuser.component.html',
  styleUrls: ['./filesuser.component.css'],
})
export class FilesuserComponent implements OnInit {
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
      const file = element.files;
      if (file != null) {
        for (let index = 0; index < file.length; index++) {
          this.userFilesService.fileUpload(file[index], 1).subscribe(
            (res) => {
              console.log(res);
            },
            (error) => {
              console.log(error);
            }
          );
          console.log(file[index]);
        }
      }
    } catch (error) {}
  }

  ondeletaAllFile(): void {
    try {
      this.userFilesService.filesDeleteAll().subscribe((res) => {
        console.log(res);
      });
    } catch (error) {}
  }
}
