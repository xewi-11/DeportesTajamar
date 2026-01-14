import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Equipo } from '../../models/equipo';
import { User } from '../../models/user';
import { Color } from '../../models/color';

@Injectable({
  providedIn: 'root',
})
export class EquiposService {
  
  constructor(
    private _http:HttpClient
  ){}

  getEquiposActividad(idActividad: number, idEvento: number): Observable<Equipo[]>{
    let url = environment.urlApiDeportes;
    let request = "Equipos/EquiposActividadEvento/" + idActividad + "/" + idEvento;
    return this._http.get<Equipo[]>(url + request);
  }

  getUsuariosEquipo(idEquipo: number): Observable<User[]>{
    let url = environment.urlApiDeportes;
    let request = "Equipos/UsuariosEquipo/" + idEquipo;
    return this._http.get<User[]>(url + request);
  }

  createEquipo(equipo: Equipo): Observable<any>{
    let url = environment.urlApiDeportes;
    let request = "Equipos/Create";
    let header = new HttpHeaders();
    header = header.set("Content-type", "application/json");
    return this._http.post(url + request, equipo, {headers: header});    
  }

  getColores(): Observable<Color[]>{
    let url = environment.urlApiDeportes;
    let request = "Colores";
    return this._http.get<Color[]>(url + request);
  }

  inscripcionEquipo(): Observable<any>{
    let url = environment.urlApiDeportes;
    let request = "MiembroEquipos/update"
    return this._http.put(url + request, null);
  }

}
