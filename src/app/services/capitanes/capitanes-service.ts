import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment.development';
import { Capitan } from '../../models/capitan';
import { AuthService } from '../../auth/auth';

@Injectable({
  providedIn: 'root',
})
export class CapitanesService {
  constructor(
    private _http: HttpClient,
    private auth: AuthService,
  ) {}

  getCapitanesActividadRequest(idEvento: number, idActividad: number): Observable<User[]> {
    let url = environment.urlApiDeportes;
    let request =
      'Inscripciones/InscripcionesUsuariosEventoCapitanActividad/' +
      idEvento +
      '?idactividad=' +
      idActividad;
    return this._http.get<User[]>(url + request);
  }

  getCapitanesActividad(idEventoActividad: number): Observable<User> {
    let url = environment.urlApiDeportes;
    let request = 'CapitanActividades/FindCapitanEventoActividad/' + idEventoActividad;
    return this._http.get<User>(url + request);
  }

  getIdCapitanActividad(idUsuario: number, IdEventoActividad: number): Observable<User> {
    let url = environment.urlApiDeportes;
    let request = 'capitanactividades/getidcapitanusuario/' + idUsuario + '/' + IdEventoActividad;
    return this._http.get<User>(url + request);
  }

  createCapitan(capitan: Capitan): Observable<any> {
    let url = environment.urlApiDeportes;
    let request = 'CapitanActividades/create';
    let header = new HttpHeaders();
    header = header.set('Content-type', 'application/json');
    return this._http.post(url + request, capitan, { headers: header });
  }

  updateCapitan(capitan: Capitan): Observable<any> {
    let url = environment.urlApiDeportes;
    let request = 'capitanactividades/update';
    return this._http.put(url + request, capitan);
  }
}
