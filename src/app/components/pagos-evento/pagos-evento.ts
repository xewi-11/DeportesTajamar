import { Component } from '@angular/core';
import { Header } from '../header/header';
import { MenuEventos } from '../menu-eventos/menu-eventos';

@Component({
  selector: 'app-pagos-evento',
  imports: [Header, MenuEventos],
  templateUrl: './pagos-evento.html',
  styleUrl: './pagos-evento.css',
})
export class PagosEvento {}
