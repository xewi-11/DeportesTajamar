import { Component } from '@angular/core';
import { MenuActividades } from '../menu-actividades/menu-actividades';
import { Header } from '../header/header';

@Component({
  selector: 'app-materiales-actividad',
  imports: [MenuActividades, Header],
  templateUrl: './materiales-actividad.html',
  styleUrl: './materiales-actividad.css',
})
export class MaterialesActividad {}
