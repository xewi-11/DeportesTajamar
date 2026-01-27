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
  public eventId!: number;
  public actividades!: Array<ActividadEvento>;
  public nuevaActividad = {
    idActividad: 0,
    nombre: '',
    minimoJugadores: 0,
  };
  public isDialogOpen = false;
  idRol!:string;
  constructor(
    private _actividadesService: ActividadesService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getActividadesByEventId();
    this.nuevaActividad = {
      idActividad: 0,
      nombre: '',
      minimoJugadores: 0,
    };
    this.idRol=localStorage.getItem("idRol")!;
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
    this.nuevaActividad = {
      idActividad: 0,
      nombre: '',
      minimoJugadores: 0,
    };
  }

  handleCrearActividad() {
    if (!this.nuevaActividad.nombre || !this.nuevaActividad.minimoJugadores) {
      alert('Por favor, completa todos los campos');
      return;
    }

    this._actividadesService.postActividad(this.nuevaActividad).subscribe((response) => {
      console.log('Actividad creada...');
      this._actividadesService
        .addActividadToEvento(this.eventId, response.idActividad)
        .subscribe((response) => {
          console.log('Actividad asignada al evento...');
          this.getActividadesByEventId();
        });
    });
    this.closeDialog();
  }

  verDetallesActividad(idEvento: Number, idActividad: Number, idEventoActividad: Number) {
    this._router.navigate([
      '/partidosActividad/' + idEvento + '/' + idActividad + '/' + idEventoActividad,
    ]);
  }
}
