import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../header/header';

@Component({
  selector: 'app-menu-actividades',
  imports: [RouterLink, Header],
  templateUrl: './menu-actividades.html',
  styleUrl: './menu-actividades.css',
})
export class MenuActividades {

}
