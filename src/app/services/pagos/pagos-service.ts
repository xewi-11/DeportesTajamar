import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth';
import { Observable } from 'rxjs';
import { Pago } from '../../models/pago';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  constructor(
    private _http: HttpClient,
    private auth: AuthService,
  ) {}

  getPagosByEventId(id: number): Observable<Array<Pago>> {
    var request = 'pagos/pagosevento/' + id;
    var url = environment.urlApiDeportes + request;

    console.log('Obteniendo pagos...');

    return this._http.get<Array<Pago>>(url);
  }

  postPago(eventActividadId: number, nuevoPago: any): Observable<any> {
    var request =
      'pagos/pagoeventoactividad/' +
      eventActividadId +
      '/' +
      nuevoPago.idCurso +
      '/' +
      nuevoPago.cantidad;
    var url = environment.urlApiDeportes + request;

    return this._http.post<any>(url, {});
  }
}
