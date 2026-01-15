import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, OnInit, LOCALE_ID, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';
import { MenuEventos } from '../menu-eventos/menu-eventos';
import { Event } from '../../models/event';
import { User } from '../../models/user';
import { EventService } from '../../services/event/event-service';
import { UserService } from '../../services/user/user-service';
import localeEs from '@angular/common/locales/es';
import { ActivatedRoute } from '@angular/router';

registerLocaleData(localeEs);

@Component({
  selector: 'app-detalles-evento',
  imports: [FormsModule, CommonModule, Header, MenuEventos],
  templateUrl: './detalles-evento.html',
  styleUrl: './detalles-evento.css',
})
export class DetallesEvento implements OnInit {
  public event!: Event;
  public idEvento!: number;
  public alumnosRegistrados!: Array<User>;
  public profesoresActivos!: Array<User>;

  public isDialogOpen: boolean = false;
  public profesorTemporal!: number;

  constructor(
    private _eventService: EventService,
    private _userService: UserService,
    private _cdr: ChangeDetectorRef,
    private _activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEventById();
    this.getAlumnosRegistrados();
    this.getProfesoresActivos();
  }

  getEventById() {
    this._eventService.getEventById(1).subscribe((response) => {
      this.event = response;
      this._cdr.detectChanges();
    });
  }

  getAlumnosRegistrados() {
    this._activeRoute.params.subscribe((params) => {
      this.idEvento = params['id'];
    });

    this._userService.getUsersInscritosByIdEvent(this.idEvento).subscribe((response) => {
      this.alumnosRegistrados = response;
      this._cdr.detectChanges();
    });
  }

  getProfesoresActivos() {
    this._userService.getProfesoresActivos().subscribe((response) => {
      this.profesoresActivos = response;
      this._cdr.detectChanges();
    });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  onConfirmar() {
    if (this.profesorTemporal) {
      this.event.idProfesor = Number(this.profesorTemporal);
      this.closeDialog();
    }
  }

  getNombreProfesor(id: number): string {
    if (!this.profesoresActivos || !id || id === -1) return '';
    const prof = this.profesoresActivos.find((p) => p.idUsuario === id);
    return prof ? prof.usuario : '';
  }
}
