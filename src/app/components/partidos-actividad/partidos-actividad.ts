import { Component } from '@angular/core';
import { Header } from '../header/header';
import { MenuActividades } from '../menu-actividades/menu-actividades';

@Component({
  selector: 'app-partidos-actividad',
  imports: [Header, MenuActividades],
  templateUrl: './partidos-actividad.html',
  styleUrl: './partidos-actividad.css',
})
export class PartidosActividad {

}
