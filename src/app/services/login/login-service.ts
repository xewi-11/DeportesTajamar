import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {}

  login(username: string, password: string) {
    this.http
      .post<any>(`${environment.urlApiDeportes}Auth/LoginEventos`, {
        username: username,
        password: password,
      })
      .subscribe({
        next: (resp) => {
          this.auth.login(resp.response, resp.role);
          this.router.navigate(['/detallesEvento']);
        },
        error: () => alert('Login incorrecto'),
      });
  }
}
