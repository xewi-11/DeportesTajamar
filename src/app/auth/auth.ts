import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private TOKEN = 'token';

  login(token: string) {
    localStorage.setItem(this.TOKEN, token);
  }

  logout() {
    localStorage.removeItem(this.TOKEN);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN);
  }

  isLogged(): boolean {
    return !!this.getToken();
  }
}