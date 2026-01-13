import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../../models/user';
import { Perfil } from '../../models/perfil';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  /***
   * Obtiene la información del usuario actual autenticado.
   * @returns Observable<User>
   **/
  getUser(): Observable<Perfil> {
    const token = this.auth.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Perfil>(`${environment.urlApiDeportes}/UsuariosDeportes/Perfil`, { headers });
  }

  getProfesoresActivos(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.urlApiDeportes}ProfesEventos/ProfesActivos`);
  }

  getUsersInscritosByIdEvent(id: number): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.urlApiDeportes}Inscripciones/InscripcionesUsuariosEvento/${id}`
    );
  }
}
