import { Header } from './../header/header';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-eventos',
  imports: [Header, CommonModule, FormsModule],
  templateUrl: './menu-eventos.html',
  styleUrl: './menu-eventos.css',
})
export class MenuEventos {
  activeTab: string = 'detalles';

  constructor(private router: Router) {}

  tabs = [
    { id: 'detalles', label: 'Detalles' },
    { id: 'actividades', label: 'Actividades' },
    { id: 'pagos', label: 'Pagos' },
  ];

  alumnosInscritos = [
    { inicial: 'S', nombre: 'Sofía Herrera', especialidad: 'Desarrollo' },
    { inicial: 'M', nombre: 'Miguel Ángel Torres', especialidad: 'IA' },
    { inicial: 'L', nombre: 'Lucía Méndez', especialidad: 'Sistemas' },
    { inicial: 'D', nombre: 'David Ruiz', especialidad: 'Desarrollo' },
    { inicial: 'C', nombre: 'Carlos Aranda', especialidad: 'IA' },
  ];

  eventoInfo = {
    fecha: 'Domingo, 28 De Diciembre De 2025, 19:48',
    profesor: 'Ana María González',
  };

  actividades = [
    { id: 1, nombre: 'Fútbol 7', minimoJugadores: 7 },
    { id: 2, nombre: 'Baloncesto', minimoJugadores: 5 },
    { id: 3, nombre: 'Videojuegos', minimoJugadores: 2 },
  ];

  pagos = [
    { id: 1, curso: 'Master desarrollo', cantidad: 5000, estado: 'pagado' },
    { id: 2, curso: 'Master Sistemas', cantidad: 6000, estado: 'sin-pagar' },
    { id: 3, curso: 'Master IA', cantidad: 0, estado: 'exento' },
  ];

  mostrarModal: boolean = false;
  profesorSeleccionado: string = 'Ana María González';

  profesores = ['Ana María González', 'Carlos Martínez', 'Laura Sánchez', 'Pedro López'];

  mostrarModalActividad: boolean = false;
  nuevaActividadNombre: string = '';
  nuevaActividadMinimo: number = 1;

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }

  isActive(tabId: string): boolean {
    return this.activeTab === tabId;
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
      const nuevaId = Math.max(...this.actividades.map((a) => a.id)) + 1;
      this.actividades.push({
        id: nuevaId,
        nombre: this.nuevaActividadNombre,
        minimoJugadores: this.nuevaActividadMinimo,
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
