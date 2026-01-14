import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { MenuActividades } from '../menu-actividades/menu-actividades';
import { ActivatedRoute, Params } from '@angular/router';
import { PartidosService } from '../../services/partidos/partidos-service';

@Component({
  selector: 'app-partidos-actividad',
  imports: [Header, MenuActividades],
  templateUrl: './partidos-actividad.html',
  styleUrl: './partidos-actividad.css',
})
export class PartidosActividad implements OnInit {

  idEventoActivdad!: Number;

  constructor(
    private _service: PartidosService,
    private _activeRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    
  }

  loadPartidos(): void{
    this._activeRoute.params.subscribe((params: Params)=>{
      let idEventoActividad = params['ideventoactividad'];
      
    })
  }

}
