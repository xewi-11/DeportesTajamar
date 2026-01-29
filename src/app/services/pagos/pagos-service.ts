import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth';
import { Observable } from 'rxjs';
import { NuevoPago, Pago } from '../../models/pago';
import { environment } from '../../../environments/environment.development';
import { PrecioActividad } from '../../models/precio-actividad';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  constructor(
    private _http: HttpClient,
    private auth: AuthService,
  ) { }

  getPagosByEventId(id: number): Observable<Array<Pago>> {
    var request = 'pagos/pagosevento/' + id;
    var url = environment.urlApiDeportes + request;

    console.log('Obteniendo pagos...');

    return this._http.get<Array<Pago>>(url);
  }

  postPrecioActividad(precioActividad: PrecioActividad): Observable<any> {
    var request = "precioactividad/create";
    var url = environment.urlApiDeportes + request;

    let header = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post<any>(url, precioActividad, { headers: header });
  }

  postPago(idEventoActividad: number, idCurso: number, cantidad: number): Observable<any> {
    var request = "pagos/pagoeventoactividad/" + idEventoActividad + "/" + idCurso + "/" + cantidad;
    var url = environment.urlApiDeportes + request;

    return this._http.post<any>(url, null);
  }

  updatePago(idPago: number, cantidad: number, estado: string): Observable<any> {
    var request = "pagos/updatepago/" + idPago + "/" + cantidad + "/" + estado;
    var url = environment.urlApiDeportes + request;
    return this._http.put(url, null);
  }

}
