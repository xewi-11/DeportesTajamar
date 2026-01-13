import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private TOKEN = 'token';
  private ROL = 'rol';

  login(token: string, rol: string) {
    localStorage.setItem(this.TOKEN, token);
    localStorage.setItem(this.ROL, rol);
  }

  logout() {
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem(this.ROL);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN);
  }
  getRol() {
    return localStorage.getItem(this.ROL);
  }

  isLogged(): boolean {
    return !!this.getToken();
  }
}