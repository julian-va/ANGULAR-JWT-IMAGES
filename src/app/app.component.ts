import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-jwt-images';

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}
  ngOnInit(): void {
    try {
      const token = this.tokenService.getToken();

      if (!!token) {
        this.authService.verifyToken().subscribe();
      }
    } catch (error) {
      console.error(error);
    }
  }
}
