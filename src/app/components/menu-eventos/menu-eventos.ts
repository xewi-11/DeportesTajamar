import { Component, Input } from '@angular/core';
import { RouterLink, NavigationEnd, Router } from '@angular/router';
import { Header } from '../header/header';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu-eventos',
  imports: [RouterLink],
  templateUrl: './menu-eventos.html',
  styleUrl: './menu-eventos.css',
})
export class MenuEventos {
  opcionSeleccionada: string = 'detalles';
  @Input() eventId!: number;

  constructor(private router: Router) {}

  ngOnInit() {
    this.actualizarTabActiva(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.actualizarTabActiva(event.urlAfterRedirects);
      });
  }

  actualizarTabActiva(url: string) {
    if (url.includes('detallesEvento')) this.opcionSeleccionada = 'detalles';
    else if (url.includes('actividadesEvento')) this.opcionSeleccionada = 'actividades';
  }
}
