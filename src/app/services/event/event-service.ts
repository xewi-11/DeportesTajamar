import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Event } from '../../models/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.urlApiDeportes}Eventos`);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${environment.urlApiDeportes}Eventos/${id}`);
  }

  postEvent(fecha: string): Observable<any> {
    return this.http.post(`${environment.urlApiDeportes}Eventos/create/${fecha}`, {});
  }
}
