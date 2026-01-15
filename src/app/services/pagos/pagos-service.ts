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
  constructor(private _http: HttpClient, private auth: AuthService) {}

  getPagosByEventId(id: number): Observable<Array<Pago>> {
    var request = 'pagos/pagosevento/' + id;
    var url = environment.urlApiDeportes + request;

    console.log('Obteniendo pagos...');

    return this._http.get<Array<Pago>>(url);
  }
}
