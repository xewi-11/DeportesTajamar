import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { environment } from '../../../environments/environment.development';
import { LoginService } from '../../services/login/login-service';

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
  constructor(private loginService: LoginService) {}

  get emailCompleto(): string {
    return `${this.username}@tajamar365.com`;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.loginService.login(this.emailCompleto, this.password);
  }
}
