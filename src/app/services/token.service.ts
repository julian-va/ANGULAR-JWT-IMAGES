import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string): void {
    try {
      localStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
    }
  }

  getToken(): string {
    let token: string = '';
    try {
      token = localStorage.getItem('token') || token;
    } catch (error) {
      console.error(error);
    }
    return token;
  }

  deleteToken(): void {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      console.error(error);
    }
  }
}
