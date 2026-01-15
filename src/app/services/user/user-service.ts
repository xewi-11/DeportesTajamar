import { HttpClient } from '@angular/common/http';
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
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {}

  getProfesoresActivos(): Observable<User[]> {
    console.log('Obteniendo profesores activos...');
    return this.http.get<User[]>(`${environment.urlApiDeportes}ProfesEventos/ProfesActivos`);
  }

  getUsersInscritosByIdEvent(id: number): Observable<User[]> {
    console.log('Obteniendo alumnos inscritos...');
    return this.http.get<User[]>(
      `${environment.urlApiDeportes}Inscripciones/InscripcionesUsuariosEvento/${id}`
    );
  }
}
