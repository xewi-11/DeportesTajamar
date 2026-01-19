import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { MenuEventos } from '../menu-eventos/menu-eventos';
import { ActivatedRoute } from '@angular/router';
import { PagosService } from '../../services/pagos/pagos-service';
import { Pago } from '../../models/pago';

@Component({
  selector: 'app-pagos-evento',
  imports: [Header, MenuEventos],
  templateUrl: './pagos-evento.html',
  styleUrl: './pagos-evento.css',
})
export class PagosEvento implements OnInit {
  public eventId!: number;
  public pagos!: Array<Pago>;

  constructor(
    private _pagosService: PagosService,
    private _activeRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params) => {
      this.eventId = params['id'];
    });

    this.getPagosByEventId();
  }

  getPagosByEventId() {
    this._pagosService.getPagosByEventId(this.eventId).subscribe((response) => {
      this.pagos = response;
      this._cdr.detectChanges();
    });
  }

  openDialog() {
    // TODO: Implementar diálogo para crear pago
    console.log('Abrir diálogo para crear pago');
  }
}
