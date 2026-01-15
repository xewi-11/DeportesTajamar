import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth';
import { Observable } from 'rxjs';
import { Actividad } from '../../models/actividad';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ActividadesService {
  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {}

  getActividadesByEventId(id: number): Observable<Array<Actividad>> {
    console.log('Obteniendo actividades del evento ' + id + '...');
    return this.http.get<Array<Actividad>>(
      `${environment.urlApiDeportes}Actividades/ActividadesEvento/${id}`
    );
  }
}
