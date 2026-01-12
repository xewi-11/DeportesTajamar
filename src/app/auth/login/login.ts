import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.http.post<any>('https://apideportestajamar.azurewebsites.net/api/Auth/LoginEventos', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: resp => {
        this.auth.login(resp.token);
        this.router.navigate(['/home']);
      },
      error: () => alert('Login incorrecto')
    });
  }
}
