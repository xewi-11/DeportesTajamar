import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';
import { Event } from '../../models/event';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event-service';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@Component({
  selector: 'app-pantalla-eventos',
  // 2. AGREGAR FormsModule AQUÍ
  imports: [CommonModule, Header, FormsModule], 
  standalone: true,
  templateUrl: './pantalla-eventos.html',
  styleUrl: './pantalla-eventos.css',
})
export class PantallaEventos implements OnInit {
  public eventos!: Event[];
  
  public newEvent: Event = {
    idEvento: -1,
    fechaEvento: '',
    idProfesor: -1
  };

  constructor(private eventService: EventService, private router: Router, private cdr: ChangeDetectorRef) { }

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

  getDetallesEvento(id: number) {
    this.router.navigate(['/detallesEvento/', id]);
  }
}