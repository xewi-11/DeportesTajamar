import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from './auth.interface';
import { Router } from '@angular/router';
import { Perfil } from '../models/perfil';


@Injectable({providedIn: 'root'})
export class AuthService {
  
    private apiurl = environment.urlApiDeportes;

    private http = inject(HttpClient);
    private isAuthenticated = false;
    private route = inject(Router);


    private _token = signal<string | null>(localStorage.getItem('token'));
    private _isLoading = signal<boolean>(false);
    private _rol = signal<string | null>(localStorage.getItem('rol'));
    private _idRol = signal<string | null>(localStorage.getItem('idRol'));

    constructor() {
        window.addEventListener('storage', (event) => {
            if (event.key === 'token' && !event.newValue) {
                this.logout();
            }
        });
        
        const token = this._token();
        if (token) {
            this.isAuthenticated = true;
            this._isLoading.set(true);
        } else {
            this.isAuthenticated = false;
        }
    }

    token = computed(() => this._token());
    isLoading = computed(() => this._isLoading());
    rol = computed(() => this._rol());
    idRol = computed(() => this._idRol());

    login(userName: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiurl}Auth/LoginEventos`, {userName, password})
            .pipe(
                tap(response => {
                    console.log(response);
                    localStorage.setItem('token', response.response);
                    localStorage.setItem('rol', response.role);
                    localStorage.setItem('idRol', response.idrole.toString());
                    this._token.set(response.response);
                    this._rol.set(response.role);
                    this._idRol.set(response.idrole.toString());
                    this.isAuthenticated = true;
                })
            );
    }
   
    clearSession() {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('idRol');
        this._token.set(null);
        this._rol.set(null);
        this._idRol.set(null);
        this.isAuthenticated = false;
    }

    logout() {
        this.clearSession();
        this.route.navigate(['']);
    }
}