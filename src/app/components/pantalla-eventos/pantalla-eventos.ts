import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event-service';
import { Event } from '../../models/event';
import localeEs from '@angular/common/locales/es';
import { InscripcionesService } from '../../services/inscripciones/inscripciones-service';
import { UsersService } from '../../services/users/users-service';
import { Inscripcion } from '../../models/inscripcion';
import { ActividadesService } from '../../services/actividades/actividades-service';
import { ActividadEvento } from '../../models/actividad-evento';
import { Actividad } from '../../models/actividad';


registerLocaleData(localeEs);

@Component({
  selector: 'app-pantalla-eventos',
  imports: [CommonModule, Header, FormsModule],
  standalone: true,
  templateUrl: './pantalla-eventos.html',
  styleUrl: './pantalla-eventos.css',
})

export class PantallaEventos implements OnInit {
  public eventos!: Event[];
  public actividades!: Actividad[];

  public inscripcion: Inscripcion = {
    idInscripcion: -1,
    idEventoActividad: -1,
    idUsuario: -1,
    fechaInscripcion: '',
    quiereSerCapitan: false,
  };

  public prepararInscripcion(idEvento: number) {
    this.inscripcion.fechaInscripcion = new Date().toISOString();

    this.usersService.getUser().subscribe((perfil) => {
      this.inscripcion.idUsuario = perfil.idUsuario;
    });


  }

  public newEvent: Event = {
    idEvento: -1,
    fechaEvento: '',
    idProfesor: -1
  };

  constructor(
    private eventService: EventService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private inscripcionesService: InscripcionesService,
    private usersService: UsersService,
    private actividadesService: ActividadesService) { }

  ngOnInit() {
    this.getListaEventos();
  }

  getListaEventos() {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.eventos = data;
      this.cdr.detectChanges();
    });
  }

  saveEvento() {
    console.log('Guardando evento:', this.newEvent);
    this.eventService.postEvent(this.newEvent.fechaEvento).subscribe((response) => {
      console.log('Evento guardado:', response);
      this.getListaEventos();
    });
  }

  getActividades(idEvento: number) {
    this.actividadesService.getActividadesEventoById(idEvento).subscribe((data: Actividad[]) => {
      console.log('Actividades obtenidas:', data);
      this.cdr.detectChanges();
    });
  }

  createInscripcion() {

  }

  getDetallesEvento(id: number) {
    this.router.navigate(['/detallesEvento/', id]);
  }
}