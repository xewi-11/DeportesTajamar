import { Component } from '@angular/core';
import { Header } from '../header/header';
import { MenuActividades } from '../menu-actividades/menu-actividades';

@Component({
  selector: 'app-materiales-actividad',
  imports: [Header, MenuActividades],
  templateUrl: './materiales-actividad.html',
  styleUrl: './materiales-actividad.css',
})
export class MaterialesActividad {

}
