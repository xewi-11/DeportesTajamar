import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { MenuActividades } from '../menu-actividades/menu-actividades';
import { ActivatedRoute } from '@angular/router';
import { ActividadesService } from '../../services/actividades/actividades-service';
import { Actividad } from '../../models/actividad';
import { User } from '../../models/user';
import { CapitanesService } from '../../services/capitanes/capitanes-service';
import { Capitan } from '../../models/capitan';

@Component({
  selector: 'app-capitanes-actividad',
  imports: [MenuActividades, Header],
  templateUrl: './capitanes-actividad.html',
  styleUrl: './capitanes-actividad.css',
})
export class CapitanesActividad implements OnInit {
  idActividad!: number;
  idEvento!: number;
  idEventoActividad!: number;
  actividad!: Actividad;
  usuariosDisponibles: Array<User> = [];
  selectedCapitan: number | null = null;
  capitanData: Capitan | null = null;
  capitanExistente: boolean = false;

  constructor(
    private _serviceActividad: ActividadesService,
    private _serviceCapitanes: CapitanesService,
    private _activeRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params) => {
      this.idActividad = Number(params['idActividad']);
      this.idEvento = Number(params['idEvento']);
      this.idEventoActividad = Number(params['idEventoActividad']);
      this.loadActividadEvento();
      this.getUsuariosDisponibles();
      this.getCapitan();
    });
  }

  loadActividadEvento(): void {
    this._serviceActividad.getActividadPorId(this.idActividad).subscribe((result) => {
      this.actividad = result;
      this._cdr.detectChanges();
    });
  }

  getUsuariosDisponibles() {
    this._serviceCapitanes
      .getCapitanesActividadRequest(this.idEvento, this.idActividad)
      .subscribe((response) => {
        this.usuariosDisponibles = response;
        this._cdr.detectChanges();
      });
  }

  getCapitan() {
    this._serviceCapitanes
      .getCapitanesActividad(this.idEventoActividad)
      .subscribe((response: User) => {
        if (response && response.idUsuario) {
          this._serviceCapitanes
            .getIdCapitanActividad(response.idUsuario, this.idEventoActividad)
            .subscribe((capitanResponse: any) => {
              const idCapitan = capitanResponse.idCapitanActividad || capitanResponse;

              if (idCapitan && idCapitan !== -1) {
                this.capitanExistente = true;
                this.selectedCapitan = response.idUsuario;

                this.capitanData = {
                  idCapitanActividad: idCapitan,
                  idEventoActividad: this.idEventoActividad,
                  idUsuario: response.idUsuario,
                };
              } else {
                this.capitanExistente = false;
                this.selectedCapitan = null;
                this.capitanData = null;
              }

              this._cdr.detectChanges();
            });
        } else {
          this.capitanExistente = false;
          this.selectedCapitan = null;
          this.capitanData = null;
          this._cdr.detectChanges();
        }
      });
  }

  onSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const idUsuario = parseInt(select.value);

    if (!isNaN(idUsuario) && idUsuario > 0) {
      this.selectedCapitan = idUsuario;

      // Verificar si existe un capitán en esta actividad (puede ser otro usuario)
      const idCapitanExistente = this.capitanData?.idCapitanActividad;

      if (idCapitanExistente && idCapitanExistente !== -1) {
        const capitanUpdate: Capitan = {
          idCapitanActividad: idCapitanExistente,
          idEventoActividad: this.idEventoActividad,
          idUsuario: idUsuario,
        };

        this._serviceCapitanes.updateCapitan(capitanUpdate).subscribe(
          (response) => {
            this.capitanData = capitanUpdate;
            this.capitanExistente = true;
            this._cdr.detectChanges();
          },
          (error) => {
            console.error('Error al actualizar capitán:', error);
          },
        );
      } else {
        const capitanCreate: Capitan = {
          idCapitanActividad: 0,
          idEventoActividad: this.idEventoActividad,
          idUsuario: idUsuario,
        };

        this._serviceCapitanes.createCapitan(capitanCreate).subscribe(
          (response) => {
            this.capitanData = {
              idCapitanActividad: response.idCapitanActividad || response.id || 1,
              idEventoActividad: this.idEventoActividad,
              idUsuario: idUsuario,
            };
            this.capitanExistente = true;
            this._cdr.detectChanges();
          },
          (error) => {
            console.error('Error al crear capitán:', error);
          },
        );
      }
    }
  }

  getSelectedUser(): User | undefined {
    return this.usuariosDisponibles.find((u) => u.idUsuario === this.selectedCapitan);
  }

  getInitials(nombre: string): string {
    const palabras = nombre.trim().split(' ');
    if (palabras.length >= 2) {
      return (palabras[0][0] + palabras[1][0]).toUpperCase();
    }
    return nombre.substring(0, 2).toUpperCase();
  }
}
