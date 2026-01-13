import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Material } from '../../models/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaterialesService {
  
  constructor(private _http:HttpClient){}

  getMaterialesActividad(ideventoactividad: number): Observable<Material[]>{
    let url = environment.urlApiDeportes;
    let request = 'Materiales/MaterialesActividad/' + ideventoactividad;
    return this._http.get<Material[]>(url + request);
  }

  createMaterialActividad(materialActividad: Material): Observable<any>{
    let url = environment.urlApiDeportes;
    let request = 'Materiales/create';
    let header = new HttpHeaders();
    header = header.set('Content-type', "application/json");
    return this._http.post(url +  request, materialActividad, {headers: header})
  }

  updateMaterialActividad(materialActividad: Material): Observable<any>{
      let url = environment.urlApiDeportes;
      let request = 'Materiales/update';
      return this._http.put(url + request, materialActividad);
    }

}
