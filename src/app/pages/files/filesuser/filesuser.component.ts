import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilesUrl } from 'src/app/dtos/user-files';
import { TokenService } from 'src/app/services/token.service';
import { UserFilesService } from 'src/app/services/user-files.service';

@Component({
  selector: 'app-filesuser',
  templateUrl: './filesuser.component.html',
  styleUrls: ['./filesuser.component.css'],
})
export class FilesuserComponent implements OnInit {
  imgAll: FilesUrl[] = [];

  constructor(
    private readonly userFilesService: UserFilesService,
    private readonly tokenService: TokenService,
    private readonly router: Router,
    private readonly toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.ongetFiles();
  }

  logout(): void {
    try {
      this.tokenService.deleteToken();
      this.router.navigate(['auth']);
    } catch (error) {
      console.error(error);
    }
  }

  ondeletaAllFile(): void {
    try {
      this.userFilesService.filesDeleteAll().subscribe((res) => {
        this.ongetFiles();
        this.toastrService.success('all images were deleted', 'image deleted');
      });
    } catch (error) {
      console.error(error);
    }
  }

  ongetFiles(): void {
    try {
      this.userFilesService.fileGetAll().subscribe(
        (res) => {
          this.imgAll = res;
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  onDeleteById(fileId: number): void {
    try {
      this.userFilesService.fileDeleteById(fileId).subscribe((res) => {
        this.toastrService.success(
          'image deleted successfully',
          'image deleted'
        );
        this.ongetFiles();
      });
    } catch (error) {
      console.error(error);
    }
  }
}
