import { CommonModule } from '@angular/common';
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
  showPassword: boolean = false;
  constructor(private loginService: AuthService, private router: Router) {}

  get emailCompleto(): string {
    return `${this.username}@tajamar365.com`;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.loginService.login(this.emailCompleto, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/eventos']);
      },
      error: (error) => {
        console.error('Error en login:', error);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
