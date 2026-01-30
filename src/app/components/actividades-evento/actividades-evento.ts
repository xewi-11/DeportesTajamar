import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActividadEvento } from '../../models/actividad-evento';
import { Header } from '../header/header';
import { MenuEventos } from '../menu-eventos/menu-eventos';
import { ActividadesService } from '../../services/actividades/actividades-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagosService } from '../../services/pagos/pagos-service';
import { PrecioActividad } from '../../models/precio-actividad';

@Component({
  selector: 'app-actividades-evento',
  standalone: true,
  imports: [FormsModule, MenuEventos, CommonModule],
  templateUrl: './actividades-evento.html',
  styleUrl: './actividades-evento.css',
})
export class ActividadesEvento implements OnInit {
  public eventId!: number;
  public actividades!: Array<ActividadEvento>;
  public actividad = {
    idActividad: 0,
    nombre: '',
    minimoJugadores: 0,
    precio: 0
  };
  public isDialogOpen = false;
  idRol!: string;
  constructor(
    private _actividadesService: ActividadesService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private _pagosService: PagosService
  ) { }

  ngOnInit(): void {
    this.getActividadesByEventId();
    this.actividad = {
      idActividad: 0,
      nombre: '',
      minimoJugadores: 0,
      precio: 0
    };
    this.idRol = localStorage.getItem("idRol")!;
  }

  getActividadesByEventId() {
    this._activeRoute.params.subscribe((params) => {
      this.eventId = params['id'];
    });

    this._actividadesService.getActividadesByEventId(this.eventId).subscribe((response) => {
      this.actividades = response;
      this.cdr.detectChanges();
    });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.actividad = {
      idActividad: 0,
      nombre: '',
      minimoJugadores: 0,
      precio: 0
    };
  }

  handleCrearActividad() {
    if (!this.actividad.nombre || !this.actividad.minimoJugadores || !this.actividad.precio) {
      alert('Por favor, completa todos los campos');
      return;
    }

    let nuevaActividad = {
      idActividad: this.actividad.idActividad,
      nombre: this.actividad.nombre,
      minimoJugadores: this.actividad.minimoJugadores,
    }

    this._actividadesService.postActividad(nuevaActividad).subscribe((response) => {
      console.log('Actividad creada...');
      console.log(response);

      this._actividadesService.addActividadToEvento(this.eventId, response.idActividad).subscribe((resp) => {
        console.log('Actividad asignada al evento...');
        this.getActividadesByEventId();

        this.crearPrecioActividad(response.idActividad);
      });
    });
    this.closeDialog();
  }

  verDetallesActividad(idEvento: Number, idActividad: Number, idEventoActividad: Number) {
    this._router.navigate([
      '/partidosActividad/' + idEvento + '/' + idActividad + '/' + idEventoActividad,
    ]);
  }

  crearPrecioActividad(actividadId: number) {
    this._actividadesService.getActividadEventoByEventoIdAndActividadId(this.eventId, actividadId).subscribe((response) => {
      let idEventActividad = response.idEventoActividad;

      let precioActividad: PrecioActividad = {
        idPrecioActividad: -1,
        idEventoActividad: idEventActividad,
        precioTotal: this.actividad.precio
      }

      this._pagosService.postPrecioActividad(precioActividad).subscribe(() => {
        console.log('Precio de actividad creado...');
      });
    }
    );
  }
}
