import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Header } from '../header/header';
import { MenuActividades } from '../menu-actividades/menu-actividades';
import { ActivatedRoute, Params } from '@angular/router';
import { PartidosService } from '../../services/partidos/partidos-service';
import { Partido } from '../../models/partido';
import { Equipo } from '../../models/equipo';
import { EquiposService } from '../../services/equipos/equipos-service';
import { ActividadesService } from '../../services/actividades/actividades-service';
import { Actividad } from '../../models/actividad';

@Component({
  selector: 'app-partidos-actividad',
  imports: [Header, MenuActividades],
  templateUrl: './partidos-actividad.html',
  styleUrl: './partidos-actividad.css',
})
export class PartidosActividad implements OnInit {

  idEventoActivdad!: Number;
  actividad!: Actividad;
  partidos!: Array<Partido>;
  equipos!: Array<Equipo>;

  constructor(
    private _serviceActividad: ActividadesService,
    private _servicePartidos: PartidosService,
    private _serviceEquipos: EquiposService,
    private _activeRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.loadActividad();
    this.loadPartidos();
    this.loadEquipos();
  }

  loadActividad(): void{
    this._activeRoute.params.subscribe((params: Params)=>{
      let idActividad = params['idActividad'];
      this._serviceActividad.getActividadPorId(idActividad).subscribe(result => {
        this.actividad = result;
        this._cdr.detectChanges();
      })
    })
  } 

  loadPartidos(): void{
    this._activeRoute.params.subscribe((params: Params)=>{
      let idEventoActividad = params['idEventoActividad'];
      console.log(idEventoActividad);
      this._servicePartidos.getPartidosActividad(idEventoActividad).subscribe(result=>{
        console.log(result);
        this.partidos = result;
        console.log(this.partidos);
        this._cdr.detectChanges();
      })
    })
  }

  loadEquipos(): void{
    this._activeRoute.params.subscribe((params: Params)=>{
      let idActividad = params['idActividad'];
      let idEvento = params['idEvento'];
      this._serviceEquipos.getEquiposActividad(idActividad, idEvento).subscribe(result=>{
        this.equipos = result;
        this._cdr.detectChanges();
        console.log(this.equipos);
      })
    })
  }

  getNombreEquipo(idEquipo: number): string{
    const equipo = this.equipos.find(equipo => equipo.idEquipo == idEquipo);
    let nombreEquipo = equipo?.nombreEquipo || '';
    return nombreEquipo;
  }

}
