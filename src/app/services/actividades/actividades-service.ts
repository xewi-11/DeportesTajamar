import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth';
import { Observable } from 'rxjs';
import { ActividadEvento } from '../../models/actividad-evento';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ActividadesService {
  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {}

  getActividadesByEventId(id: number): Observable<Array<ActividadEvento>> {
    console.log('Obteniendo actividades del evento ' + id + '...');
    return this.http.get<Array<ActividadEvento>>(
      `${environment.urlApiDeportes}Actividades/ActividadesEvento/${id}`
    );
  }

  getActividadPorId(idActividad: number): Observable<ActividadEvento>{
    console.log('Obteniendo actividades del evento ' + idActividad + '...');
    return this.http.get<ActividadEvento>(
      `${environment.urlApiDeportes}Actividades/${idActividad}`
    );
  }

}
