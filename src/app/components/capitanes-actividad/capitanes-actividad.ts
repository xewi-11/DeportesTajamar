import { Component } from '@angular/core';
import { Header } from '../header/header';
import { MenuActividades } from '../menu-actividades/menu-actividades';

@Component({
  selector: 'app-capitanes-actividad',
  imports: [Header, MenuActividades],
  templateUrl: './capitanes-actividad.html',
  styleUrl: './capitanes-actividad.css',
})
export class CapitanesActividad {

}
