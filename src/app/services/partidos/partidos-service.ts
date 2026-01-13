import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partido } from '../../models/partido';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartidosService {
  
  constructor(private _http:HttpClient){}

  getPartidosActividad(ideventoactividad: number): Observable<Partido[]>{
    let url = environment.urlApiDeportes;
    let request = 'PartidoResultado/PartidosResultadosActividad/' + ideventoactividad
    return this._http.get<Partido[]>(url + request);
  }

  createPartidoActividad(partidoActividad: Partido): Observable<any>{
    let url = environment.urlApiDeportes;
    let request = 'PartidoResultado/create';
    let header = new HttpHeaders();
    header = header.set("Content-type", "application/json");
    return this._http.post(url + request, partidoActividad, {headers: header});
  }

  updatePartidoActividad(partidoActividad: Partido): Observable<any>{
    let url = environment.urlApiDeportes;
    let request = 'PartidoResultado/update';
    return this._http.put(url + request, partidoActividad);
  }

  deletePartidoActivdad(idPartidoResultado: number): Observable<any>{
    let url = environment.urlApiDeportes;
    let request = 'PartidoResultado/' + idPartidoResultado;
    return this._http.delete(url + request);
  }

}
