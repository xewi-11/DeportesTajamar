import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { MenuActividades } from '../menu-actividades/menu-actividades';
import { ActivatedRoute } from '@angular/router';
import { ActividadesService } from '../../services/actividades/actividades-service';
import { Actividad } from '../../models/actividad';
import { User } from '../../models/user';
import { CapitanesService } from '../../services/capitanes/capitanes-service';

@Component({
  selector: 'app-capitanes-actividad',
  imports: [MenuActividades, Header],
  templateUrl: './capitanes-actividad.html',
  styleUrl: './capitanes-actividad.css',
})
export class CapitanesActividad implements OnInit {
  idActividad!: number;
  idEvento!: number;
  actividad!: Actividad;
  usuariosDesarrollo: Array<User> = [];
  usuariosSistemas: Array<User> = [];
  usuariosIA: Array<User> = [];
  expandedStates: { [key: string]: boolean } = {
    desarrollo: false,
    sistemas: false,
    ia: false,
  };
  selectedCapitanes: { [key: string]: number | null } = {
    desarrollo: null,
    sistemas: null,
    ia: null,
  };
  dropdownOpen: { [key: string]: boolean } = {
    desarrollo: false,
    sistemas: false,
    ia: false,
  };

  constructor(
    private _serviceActividad: ActividadesService,
    private _serviceCapitanes: CapitanesService,
    private _activeRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params) => {
      this.idActividad = params['idActividad'];
      this.idEvento = params['idEvento'];
      this.loadActividadEvento();
      this.getUsuariosCapitanes();
    });
  }

  loadActividadEvento(): void {
    this._serviceActividad.getActividadPorId(this.idActividad).subscribe((result) => {
      this.actividad = result;
      this._cdr.detectChanges();
    });
  }

  getUsuariosCapitanes() {
    this._serviceCapitanes
      .getCapitanesActividad(this.idEvento, this.idActividad)
      .subscribe((response) => {
        this.usuariosDesarrollo = [];
        this.usuariosSistemas = [];
        this.usuariosIA = [];

        response.forEach((usuario) => {
          if (usuario.idCurso === 3430) {
            this.usuariosDesarrollo.push(usuario);
          }
          if (usuario.idCurso === 3431) {
            this.usuariosSistemas.push(usuario);
          }
          if (usuario.idCurso === 304158642) {
            this.usuariosIA.push(usuario);
          }
        });
        this._cdr.detectChanges();
      });
  }

  toggleMaster(master: string): void {
    this.expandedStates[master] = !this.expandedStates[master];
  }

  toggleDropdown(master: string): void {
    this.dropdownOpen[master] = !this.dropdownOpen[master];
  }

  seleccionarCapitan(master: string, idUsuario: number): void {
    this.selectedCapitanes[master] = idUsuario;
    this.dropdownOpen[master] = false; // Cerrar el dropdown al seleccionar
  }

  onSelectChange(master: string, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const idUsuario = parseInt(select.value);
    if (!isNaN(idUsuario)) {
      this.selectedCapitanes[master] = idUsuario;
    }
  }

  getSelectedUser(master: string, usuarios: User[]): User | undefined {
    return usuarios.find((u) => u.idUsuario === this.selectedCapitanes[master]);
  }

  getInitials(nombre: string): string {
    const palabras = nombre.trim().split(' ');
    if (palabras.length >= 2) {
      return (palabras[0][0] + palabras[1][0]).toUpperCase();
    }
    return nombre.substring(0, 2).toUpperCase();
  }

  getAvatarColor(index: number): string {
    const colors = ['#FFA726', '#EF5350', '#AB47BC', '#42A5F5', '#66BB6A', '#FFA726'];
    return colors[index % colors.length];
  }
}
