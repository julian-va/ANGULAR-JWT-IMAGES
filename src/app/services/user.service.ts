import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Auth, ResponAuth } from '../dtos/auth';
import { environment } from 'src/environments/environment';
import { UserBase, UserCreate } from '../dtos/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlUser = {
    create: environment.urlBackend + `users/create`,
    getUserId: environment.urlBackend + `users/userById`,
    getAllUser: environment.urlBackend + `users/allUser`,
    deleteUser: environment.urlBackend + `users/deleteUser`,
    updateUser: environment.urlBackend + `users/update`,
  };
  constructor(private httpClient: HttpClient) {}

  userCreate(user: UserCreate): Observable<UserBase> {
    return this.httpClient.post<UserBase>(this.urlUser.create, user);
  }

  getAllUser(): Observable<UserBase[]> {
    return this.httpClient.get<UserBase[]>(this.urlUser.getAllUser);
  }

  deleteUser(userId: number) {
    return this.httpClient.delete(`${this.urlUser.deleteUser}/${userId}`);
  }

  userById(userId: number): Observable<UserBase> {
    return this.httpClient.get<UserBase>(`${this.urlUser.getUserId}/${userId}`);
  }

  userUpdate(userId: number, user: UserCreate): Observable<UserBase> {
    return this.httpClient.put<UserBase>(
      `${this.urlUser.updateUser}/${userId}`,
      user
    );
  }
}
