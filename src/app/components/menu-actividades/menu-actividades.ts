import { Component } from '@angular/core';
import { RouterLink, NavigationEnd, Router } from '@angular/router';
import { Header } from '../header/header';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu-actividades',
  imports: [RouterLink, Header],
  templateUrl: './menu-actividades.html',
  styleUrl: './menu-actividades.css',
})
export class MenuActividades {

  opcionSeleccionada: string = 'partidos';

  constructor(private router: Router) {}

  ngOnInit() {
    this.actualizarTabActiva(this.router.url);
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.actualizarTabActiva(event.urlAfterRedirects);
    });
  }

  actualizarTabActiva(url: string) {
    if (url.includes('partidosActividad')) this.opcionSeleccionada = 'partidos';
    else if (url.includes('materialesActividad')) this.opcionSeleccionada = 'materiales';
    else if (url.includes('capitanesActividad')) this.opcionSeleccionada = 'capitanes';
    else if (url.includes('equiposActividad')) this.opcionSeleccionada = 'equipos';
  }
  
}
