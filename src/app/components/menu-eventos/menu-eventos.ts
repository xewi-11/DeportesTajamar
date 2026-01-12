import { Header } from './../header/header';
import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event-service';
import { Event } from '../../models/event';
import { UsersService } from '../../services/users/users-service';
import { User } from '../../models/user';
import { ActividadesService } from '../../services/actividades/actividades-service';
import { Actividad } from '../../models/actividad';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@Component({
  selector: 'app-menu-eventos',
  imports: [Header, CommonModule, FormsModule, DatePipe],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  templateUrl: './menu-eventos.html',
  styleUrl: './menu-eventos.css',
})
export class MenuEventos implements OnInit {
  activeTab: string = 'detalles';
  evento: Event | null = null;

  constructor(
    private router: Router,
    private eventService: EventService,
    private usersService: UsersService,
    private actividadesService: ActividadesService
  ) {}

  ngOnInit() {
    const eventId = 1;
    this.eventService.getEventById(eventId).subscribe({
      next: (evento) => {
        this.evento = evento;
        console.log('Evento cargado:', evento);
      },
      error: (error) => {
        console.error('Error al cargar el evento:', error);
      },
    });

    this.usersService.getProfesoresActivos().subscribe({
      next: (profesores) => {
        this.profesores = profesores;
        console.log('Profesores cargados:', profesores);
      },
      error: (error) => {
        console.error('Error al cargar profesores:', error);
      },
    });

    this.usersService.getUsersInscritosByIdEvent(eventId).subscribe({
      next: (alumnos) => {
        this.alumnosInscritos = alumnos;
        console.log('Alumnos inscritos cargados:', alumnos);
      },
      error: (error) => {
        console.error('Error al cargar alumnos inscritos:', error);
      },
    });

    this.actividadesService.getActividadesByEventId(eventId).subscribe({
      next: (actividades) => {
        this.actividades = actividades;
        console.log('Actividades cargadas:', actividades);
      },
      error: (error) => {
        console.error('Error al cargar actividades:', error);
      },
    });
  }

  tabs = [
    { id: 'detalles', label: 'Detalles' },
    { id: 'actividades', label: 'Actividades' },
    { id: 'pagos', label: 'Pagos' },
  ];

  alumnosInscritos: User[] = [];

  eventoInfo = {
    fecha: 'Domingo, 28 De Diciembre De 2025, 19:48',
    profesor: -1,
  };

  actividades: Actividad[] = [];

  pagos = [
    { id: 1, curso: 'Master desarrollo', cantidad: 5000, estado: 'pagado' },
    { id: 2, curso: 'Master Sistemas', cantidad: 6000, estado: 'sin-pagar' },
    { id: 3, curso: 'Master IA', cantidad: 0, estado: 'exento' },
  ];

  mostrarModal: boolean = false;
  profesorSeleccionado: number = -1;

  profesores: User[] = [];

  mostrarModalActividad: boolean = false;
  nuevaActividadNombre: string = '';
  nuevaActividadMinimo: number = 1;

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }

  isActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }

  getNombreProfesor(): string {
    if (!this.evento || this.evento.idProfesor === -1) {
      return 'Sin Asignar';
    }
    const profesor = this.profesores.find((p) => p.idUsuario === this.evento?.idProfesor);
    return profesor ? profesor.usuario : 'Cargando...';
  }

  asignarProfesor() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  confirmarAsignacion() {
    console.log('Profesor asignado:', this.profesorSeleccionado);
    this.eventoInfo.profesor = this.profesorSeleccionado;
    this.cerrarModal();
  }

  crearActividad() {
    this.nuevaActividadNombre = '';
    this.nuevaActividadMinimo = 1;
    this.mostrarModalActividad = true;
  }

  cerrarModalActividad() {
    this.mostrarModalActividad = false;
  }

  confirmarCrearActividad() {
    if (this.nuevaActividadNombre.trim() && this.nuevaActividadMinimo > 0) {
      const nuevaId =
        this.actividades.length > 0
          ? Math.max(...this.actividades.map((a) => a.idActividad)) + 1
          : 1;
      this.actividades.push({
        posicion: this.actividades.length + 1,
        idEvento: this.evento?.idEvento || 0,
        fechaEvento: this.evento?.fechaEvento || '',
        idProfesor: this.evento?.idProfesor || -1,
        idActividad: nuevaId,
        nombreActividad: this.nuevaActividadNombre,
        minimoJugadores: this.nuevaActividadMinimo,
        idEventoActividad: 0,
      });
      console.log('Actividad creada:', this.nuevaActividadNombre);
      this.cerrarModalActividad();
    }
  }

  verDetallesActividad(actividadId: number) {
    this.router.navigate(['/detallesActividad']);
  }

  volver() {
    this.router.navigate(['/eventos']);
  }
}
