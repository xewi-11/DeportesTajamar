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
  public actividades!: ActividadEvento[];

  public newEvent: Event = {
    idEvento: -1,
    fechaEvento: '',
    idProfesor: -1
  };

  public inscripcion: Inscripcion = {
    idInscripcion: -1,
    idEventoActividad: -1,
    idUsuario: -1,
    fechaInscripcion: '',
    quiereSerCapitan: false,
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


  // Inicio de pantalla
  getListaEventos() {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.eventos = data;
      this.cdr.detectChanges();
    });
  }

  // Métodos para crear un nuevo evento
  saveEvento() {
    console.log('Guardando evento:', this.newEvent);
    this.eventService.postEvent(this.newEvent.fechaEvento).subscribe((response) => {
      console.log('Evento guardado:', response);
      this.getListaEventos();
    });
  }


  // Navegación a detalles del evento seleccionado
  getDetallesEvento(id: number) {
    this.router.navigate(['/detallesEvento/', id]);
  }

  // Métodos para inscribirse a un evento
  prepararInscripcion(idEvento: number) {
    console.log("Preparando inscripción para el evento ID:", idEvento);
    this.getActividades(idEvento);
  }

  getActividades(idEvento: number) {
    this.actividadesService.getActividadesByEventId(idEvento).subscribe((data) => {
      this.actividades = data;
      this.cdr.detectChanges();
    });
  }

  /*
    public inscripcion: Inscripcion = {
      idInscripcion: -1,
      idEventoActividad: -1,
      idUsuario: -1,
      fechaInscripcion: '',
      quiereSerCapitan: false,
    };
  */

  createInscripcion() {
    this.usersService.getUser().subscribe((user) => {
      this.inscripcion.idInscripcion = 100; // Valor temporal
      // this.inscripcion.idEventoActividad ya es asignado en el select del HTML
      this.inscripcion.idUsuario = user.idUsuario;
      this.inscripcion.fechaInscripcion = new Date().toISOString();
      // quiere ser capitán ya es asignado en el checkbox del HTML

      console.log('Creando inscripción con los siguientes datos:', this.inscripcion);
      this.inscripcionesService.postInscripcion(this.inscripcion).subscribe((response) => {
        console.log('Inscripción creada:', response);
      });
    });
 
  }
}