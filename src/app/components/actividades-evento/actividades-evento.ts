import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Actividad } from '../../models/actividad';
import { Header } from '../header/header';
import { MenuEventos } from '../menu-eventos/menu-eventos';
import { ActividadesService } from '../../services/actividades/actividades-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividades-evento',
  standalone: true,
  imports: [FormsModule, Header, MenuEventos, CommonModule],
  templateUrl: './actividades-evento.html',
  styleUrl: './actividades-evento.css',
})
export class ActividadesEvento implements OnInit {
  public actividades!: Array<Actividad>;
  public nuevaActividad!: Actividad;
  public isDialogOpen = false;

  constructor(private _actividadesService: ActividadesService, private _router: Router) {}

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
    this._actividadesService.getActividadesByEventId(1).subscribe((response) => {
      this.actividades = response;
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

    // Aquí iría la lógica para crear la actividad
    console.log('Crear actividad:', this.nuevaActividad);
    this.closeDialog();
  }

  verDetallesActividad(idEvento: Number) {
    this._router.navigate(['/equiposActividad']);
  }
}
