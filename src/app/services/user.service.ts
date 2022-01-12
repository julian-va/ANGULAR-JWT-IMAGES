import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Auth, ResponAuth } from '../dtos/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  login(auth: Auth): Observable<ResponAuth> {
    return this.httpClient.post<ResponAuth>('ddd', auth);
  }
}
