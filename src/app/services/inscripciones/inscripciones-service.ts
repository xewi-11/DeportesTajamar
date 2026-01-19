import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inscripcion } from '../../models/inscripcion';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  constructor(private _http: HttpClient) {}

  postInscripcion(inscripcion: Inscripcion): Observable<any>  {
    let url = environment.urlApiDeportes;
    let request = 'Inscripciones/create';

    return this._http.post(url + request, inscripcion);
  }
}
