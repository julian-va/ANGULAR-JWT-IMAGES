import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Auth, ResponAuth, ResponTokenVerify } from '../dtos/auth';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData = new BehaviorSubject<ResponTokenVerify | null>(null);
  userData$ = this.userData.asObservable();
  private urlAuth = {
    loginUser: environment.urlBackend + `auth/login`,
    tokenVerify: environment.urlBackend + `auth/token/verify`,
  };
  constructor(
    private httpClient: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  auth(userLogin: Auth): Observable<ResponAuth> {
    return this.httpClient
      .post<ResponAuth>(this.urlAuth.loginUser, userLogin)
      .pipe(
        tap((response) => {
          if (response.token) {
            this.validateToken();
            this.tokenService.saveToken(response.token);
            this.verifyToken();
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.InternalServerError) {
            return throwError('salio algo mal en el backenf');
          }
          return throwError('mail o login equivocado');
        })
      );
  }
  /*verifyToken(token: string): Observable<ResponTokenVerify> {
    let headers = new HttpHeaders();
    const ll = {};
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<ResponTokenVerify>(
      this.urlAuth.verifyToken,
      ll,
      {
        headers,
      }
    );
  }*/

  verifyToken(): Observable<ResponTokenVerify> {
    const ll = {};
    return this.httpClient
      .post<ResponTokenVerify>(this.urlAuth.tokenVerify, ll)
      .pipe(tap((user) => this.userData.next(user)));
  }

  validateToken(): void {
    try {
      const tokenTemp: string = this.tokenService.getToken();
      if (!!tokenTemp) {
        this.tokenService.deleteToken();
      }
    } catch (error) {
      console.error(error);
    }
  }
}
