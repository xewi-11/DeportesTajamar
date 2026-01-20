import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { ActivatedRoute } from '@angular/router';
import { PagosService } from '../../services/pagos/pagos-service';
import { Pago } from '../../models/pago';
import { MenuActividades } from '../menu-actividades/menu-actividades';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagos-evento',
  imports: [Header, MenuActividades, FormsModule],
  templateUrl: './pagos-evento.html',
  styleUrl: './pagos-evento.css',
})
export class PagosEvento implements OnInit {
  public eventId!: number;
  public actividadId!: number;
  public eventActividadId!: number;
  public pagos!: Array<Pago>;
  public nuevoPago: { idCurso: number | null; cantidad: number } = {
    idCurso: null,
    cantidad: 0,
  };

  constructor(
    private _pagosService: PagosService,
    private _activeRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params) => {
      this.eventId = params['idEvento'];
      this.actividadId = params['idActividad'];
      this.eventActividadId = params['idEventoActividad'];
    });

    this.getPagosByEventId();
  }

  getPagosByEventId() {
    this._pagosService.getPagosByEventId(this.eventId).subscribe((response) => {
      this.pagos = response;
      this._cdr.detectChanges();
    });
  }

  createPago() {
    this._pagosService.postPago(this.eventActividadId, this.nuevoPago).subscribe((response) => {
      console.log('Pago creado correctamente...');
      this.getPagosByEventId();
    });
  }

  resetForm() {
    this.nuevoPago = {
      idCurso: null,
      cantidad: 0,
    };
  }

  openDialog() {
    console.log('Abrir diálogo para crear pago');
  }
}
