import { Component } from '@angular/core';
import { RouterLink, NavigationEnd, Router, ActivatedRoute, Params } from '@angular/router';
import { Header } from '../header/header';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-actividades',
  imports: [RouterLink, Header, FormsModule],
  templateUrl: './menu-actividades.html',
  styleUrl: './menu-actividades.css',
})
export class MenuActividades {
  opcionSeleccionada: string = 'partidos';

  idEvento!: string;
  idActividad!: string;
  idEventoActividad!: string;

  constructor(
    private router: Router,
    private _activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.extraerParams();
    this.actualizarTabActiva(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.actualizarTabActiva(event.urlAfterRedirects);
      });
  }

  private extraerParams() {
    this._activeRoute.params.subscribe((params: Params) => {
      this.idEvento = params['idEvento'];
      this.idActividad = params['idActividad'];
      this.idEventoActividad = params['idEventoActividad'];
    });
  }

  actualizarTabActiva(url: string) {
    if (url.includes('partidosActividad')) this.opcionSeleccionada = 'partidos';
    else if (url.includes('materialesActividad')) this.opcionSeleccionada = 'materiales';
    else if (url.includes('capitanesActividad')) this.opcionSeleccionada = 'capitanes';
    else if (url.includes('equiposActividad')) this.opcionSeleccionada = 'equipos';
    else if (url.includes('pagosEvento')) this.opcionSeleccionada = 'pagos';
  }
}
