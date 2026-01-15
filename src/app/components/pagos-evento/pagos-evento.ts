import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { MenuEventos } from '../menu-eventos/menu-eventos';
import { ActivatedRoute } from '@angular/router';
import { PagosService } from '../../services/pagos/pagos-service';

@Component({
  selector: 'app-pagos-evento',
  imports: [Header, MenuEventos],
  templateUrl: './pagos-evento.html',
  styleUrl: './pagos-evento.css',
})
export class PagosEvento implements OnInit {
  idEvento!: number;

  constructor(private _pagosService: PagosService, private _activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadPagos();
  }

  loadPagos() {
    this._activeRoute.params.subscribe((params) => {
      this.idEvento = params['id'];
    });
  }
}
