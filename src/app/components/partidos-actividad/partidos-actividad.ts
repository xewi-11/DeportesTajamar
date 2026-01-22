import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuActividades } from '../menu-actividades/menu-actividades';
import { ActivatedRoute, Params } from '@angular/router';
import { PartidosService } from '../../services/partidos/partidos-service';
import { Partido } from '../../models/partido';
import { Equipo } from '../../models/equipo';
import { EquiposService } from '../../services/equipos/equipos-service';
import { ActividadesService } from '../../services/actividades/actividades-service';
import { Actividad } from '../../models/actividad';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';

@Component({
  selector: 'app-partidos-actividad',
  imports: [MenuActividades, FormsModule, Header],
  templateUrl: './partidos-actividad.html',
  styleUrl: './partidos-actividad.css',
})
export class PartidosActividad implements OnInit {
  idEventoActivdad!: Number;
  actividad!: Actividad;
  partidos!: Array<Partido>;
  equipos!: Array<Equipo>;

  nuevoPartido!: Partido;
  partidoSeleccionado!: Partido;

  constructor(
    private _serviceActividad: ActividadesService,
    private _servicePartidos: PartidosService,
    private _serviceEquipos: EquiposService,
    private _activeRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
  ) {
    this.nuevoPartido = {
      idPartidoResultado: 0,
      idEventoActividad: 0,
      idEquipoLocal: 0,
      idEquipoVisitante: 0,
      puntosLocal: 0,
      puntosVisitante: 0,
    };

    this.partidoSeleccionado = {
      idPartidoResultado: 0,
      idEventoActividad: 0,
      idEquipoLocal: 0,
      idEquipoVisitante: 0,
      puntosLocal: 0,
      puntosVisitante: 0,
    };
  }

  ngOnInit(): void {
    this.loadActividad();
    this.loadPartidos();
    this.loadEquipos();
    this._activeRoute.params.subscribe((params: Params) => {
      this.nuevoPartido.idEventoActividad = params['idEventoActividad'];
    });
  }

  loadActividad(): void {
    this._activeRoute.params.subscribe((params: Params) => {
      let idActividad = params['idActividad'];
      this._serviceActividad.getActividadPorId(idActividad).subscribe((result) => {
        this.actividad = result;
        this._cdr.detectChanges();
      });
    });
  }

  loadPartidos(): void {
    this._activeRoute.params.subscribe((params: Params) => {
      let idEventoActividad = params['idEventoActividad'];
      console.log(idEventoActividad);
      this._servicePartidos.getPartidosActividad(idEventoActividad).subscribe((result) => {
        console.log(result);
        this.partidos = result;
        console.log(this.partidos);
        this._cdr.detectChanges();
      });
    });
  }

  loadEquipos(): void {
    this._activeRoute.params.subscribe((params: Params) => {
      let idActividad = params['idActividad'];
      let idEvento = params['idEvento'];
      this._serviceEquipos.getEquiposActividad(idActividad, idEvento).subscribe((result) => {
        this.equipos = result;
        this._cdr.detectChanges();
        console.log(this.equipos);
      });
    });
  }

  getNombreEquipo(idEquipo: number): string {
    if(!this.equipos){
      return '';
    }
    const equipo = this.equipos.find((equipo) => equipo.idEquipo == idEquipo);
    let nombreEquipo = equipo?.nombreEquipo || '';
    return nombreEquipo;
  }

  insertarPartido(): void {
    this._servicePartidos.createPartidoActividad(this.nuevoPartido).subscribe((result) => {
      console.log('Partido guardado', result);
      this.loadPartidos();
    });
  }

  prepararEdicion(partido: Partido): void {
    this.partidoSeleccionado = { ...partido };
  }

  updatePartido(): void {
    this._servicePartidos.updatePartidoActividad(this.partidoSeleccionado).subscribe(() => {
      console.log('Partido actualizado correctamente');
      this.loadPartidos();
    });
  }
}
