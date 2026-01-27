import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { ActivatedRoute } from '@angular/router';
import { PagosService } from '../../services/pagos/pagos-service';
import { Pago } from '../../models/pago';
import { MenuActividades } from '../menu-actividades/menu-actividades';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Curso } from '../../models/curso';
import { CursosService } from '../../services/cursos/cursos-service';

@Component({
  selector: 'app-pagos-evento',
  imports: [Header, MenuActividades, FormsModule, CommonModule],
  templateUrl: './pagos-evento.html',
  styleUrl: './pagos-evento.css',
})
export class PagosEvento implements OnInit {
  public eventId!: number;
  public actividadId!: number;
  public eventActividadId!: number;
  public pagos!: Array<Pago>;
  public nuevoPago = {
    idCurso: 0,
    cantidad: 0
  };
  public cursos!: Array<Curso>;

  public idRol!: string;

  constructor(
    private _pagosService: PagosService,
    private _activeRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _cursosService: CursosService
  ) {
    this.idRol = localStorage.getItem("idRol")!;
  }

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params) => {
      this.eventId = params['idEvento']; console.log("Evento ID:", this.eventId);
      this.actividadId = params['idActividad']; console.log("Actividad ID:", this.actividadId);
      this.eventActividadId = params['idEventoActividad']; console.log("Evento Actividad ID:", this.eventActividadId);
    });

    this.getPagosByEventId();

    this.getCursosActivos();
  }

  getPagosByEventId() {
    this._pagosService.getPagosByEventId(this.eventId).subscribe((response) => {
      this.pagos = response;
      console.log("Pagos:");
      console.log(this.pagos);
      this._cdr.detectChanges();
    });
  }

  getCursosActivos() {
    this._cursosService.getCursosActivos().subscribe((response) => {
      this.cursos = response;
      this._cdr.detectChanges();
    })
  }

  createPago() {
    this._pagosService.postPago(this.eventActividadId, this.nuevoPago.idCurso, this.nuevoPago.cantidad).subscribe((response) => {
      console.log('Pago creado correctamente...');
      this._pagosService.updatePago(response.idPago, response.cantidad, "Pendiente").subscribe((response) => {
        this.getPagosByEventId();
        this.resetForm();
        this._cdr.detectChanges();
      });
    });
  }

  resetForm() {
    this.nuevoPago = {
      idCurso: -1,
      cantidad: -1
    };
  }

  marcarPagado(pago: Pago): void {
    console.log("Marcar pago:", pago);
    let pagoUpdated = {
      idPago: pago.idPago,
      idCurso: pago.idCurso,
      idPrecioActividad: pago.idPrecioActividad,
      cantidad: pago.cantidadPagada,
      estado: "PAGADO"
    }

    this._pagosService.updatePago(pagoUpdated.idPago, pagoUpdated.cantidad, pagoUpdated.estado).subscribe((response) => {
      console.log('Pago actualizado correctamente...');
      this.getPagosByEventId();
      this._cdr.detectChanges();
    });
  }

  openDialog() {
    console.log('Abrir diálogo para crear pago');
  }
}
