import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Curso } from '../../models/curso';
import { AuthService } from '../../auth/auth';

@Injectable({
  providedIn: 'root',
})
export class CursosService {

  constructor(private _http: HttpClient,
    private auth: AuthService
  ) { }

  getCursosActivos(): Observable<Array<Curso>> {
    let request = "gestionevento/cursosactivos";
    let url = environment.urlApiDeportes + request;

    return this._http.get<Array<Curso>>(url);
  }
}
