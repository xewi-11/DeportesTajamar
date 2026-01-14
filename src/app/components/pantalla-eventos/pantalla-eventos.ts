import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Event } from '../../models/event';
import { RouterLink, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { EventService } from '../../services/event/event-service';

@Component({
  selector: 'app-pantalla-eventos',
  imports: [CommonModule, Header],
  standalone: true,
  templateUrl: './pantalla-eventos.html',
  styleUrl: './pantalla-eventos.css',
})
export class PantallaEventos implements OnInit {
  public eventos!: Event[];
  public newEvent!: Event;

  constructor(private eventService: EventService, private router: Router) { }

  getListaEventos() {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.eventos = data;
    });
  }

  getDetallesEvento(id: number) {
    this.router.navigate(['/detallesEvento']);
  }

  ngOnInit() {
    this.getListaEventos();
  }
}
