import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActividadEvento } from '../../models/actividad-evento';
import { Header } from '../header/header';
import { MenuEventos } from '../menu-eventos/menu-eventos';
import { ActividadesService } from '../../services/actividades/actividades-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividades-evento',
  standalone: true,
  imports: [FormsModule, Header, MenuEventos, CommonModule],
  templateUrl: './actividades-evento.html',
  styleUrl: './actividades-evento.css',
})
export class ActividadesEvento implements OnInit {
  public actividades!: Array<ActividadEvento>;
  public nuevaActividad!: ActividadEvento;
  public isDialogOpen = false;
  public idEvento!: number;

  constructor(
    private _actividadesService: ActividadesService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _activeroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getActividadesByEventId();
    this.nuevaActividad = {
      posicion: 0,
      idEvento: 1,
      fechaEvento: '',
      idProfesor: 0,
      idActividad: 0,
      nombreActividad: '',
      minimoJugadores: 0,
      idEventoActividad: 0,
    };
  }

  getActividadesByEventId() {
    this._activeroute.params.subscribe((params) => {
      this.idEvento = params['id'];
    });

    this._actividadesService.getActividadesByEventId(this.idEvento).subscribe((response) => {
      this.actividades = response;
      this._cdr.detectChanges();
    });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.nuevaActividad = {
      posicion: 0,
      idEvento: 1,
      fechaEvento: '',
      idProfesor: 0,
      idActividad: 0,
      nombreActividad: '',
      minimoJugadores: 0,
      idEventoActividad: 0,
    };
  }

  handleCrearActividad() {
    if (!this.nuevaActividad.nombreActividad || !this.nuevaActividad.minimoJugadores) {
      alert('Por favor, completa todos los campos');
      return;
    }

    console.log('Crear actividad:', this.nuevaActividad);
    this.closeDialog();
  }

  verDetallesActividad(idEvento: Number, idActividad: Number, idEventoActividad: Number) {
    this._router.navigate([
      '/partidosActividad/' + idEvento + '/' + idActividad + '/' + idEventoActividad,
    ]);
  }
}
