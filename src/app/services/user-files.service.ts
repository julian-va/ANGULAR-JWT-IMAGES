import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserFiles, FilesUrl } from '../dtos/user-files';

@Injectable({
  providedIn: 'root',
})
export class UserFilesService {
  private urlFile = {
    uploadMultipleFiles: environment.urlBackend + `files/uploadMultipleFiles/`,
    getfile: environment.urlBackend + `files/getfile/`,
    downloadFile: environment.urlBackend + `files/downloadFile/`,
    getAllFile: environment.urlBackend + `files/getAllFile`,
    deleteFileById: environment.urlBackend + `files/deleteFile/`,
    deleteAllFiles: environment.urlBackend + `files/deleteAllFiles`,
  };
  constructor(private readonly httpClient: HttpClient) {}

  fileUpload(file: Blob, userId: number): Observable<FilesUrl[]> {
    const temp = new FormData();
    temp.append('files', file);
    return this.httpClient
      .post<FilesUrl[]>(`${this.urlFile.uploadMultipleFiles}${userId}`, temp)
      .pipe(
        map((res) =>
          res.map((item) => {
            let temp: FilesUrl = {
              ...item,
              url: `${this.urlFile.getfile}${item.user_file_id}`,
            };
            return temp;
          })
        )
      );
  }

  filesDeleteAll() {
    return this.httpClient.delete(this.urlFile.deleteAllFiles);
  }
}
