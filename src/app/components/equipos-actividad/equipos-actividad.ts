import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuActividades } from '../menu-actividades/menu-actividades';
import { ActividadesService } from '../../services/actividades/actividades-service';
import { EquiposService } from '../../services/equipos/equipos-service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Equipo } from '../../models/equipo';
import { Actividad } from '../../models/actividad';
import { Color } from '../../models/color';
import { UsersService } from '../../services/users/users-service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { Inscripcion } from '../../models/inscripcion';
import Swal from 'sweetalert2';
import { Header } from '../header/header';

@Component({
  selector: 'app-equipos-actividad',
  imports: [MenuActividades, FormsModule, CommonModule, Header],
  templateUrl: './equipos-actividad.html',
  styleUrl: './equipos-actividad.css',
})
export class EquiposActividad implements OnInit {
  idActividad!: number;
  idEvento!: number;
  actividad!: Actividad;
  equiposActividad!: Array<Equipo>;
  miembrosEquipo: { [key: number]: number } = {};
  plantillaEquipo: { [key: number]: User[] } = {};
  equipoDesplegado: number | null = null;
  usuarioInscrito!: Inscripcion;
  nuevoEquipo: Equipo;
  colores!: Array<Color>;
  colorSeleccionadoHex: string = '#e67e45';
  equipoAEditarColor!: Equipo;

  constructor(
    private _serviceActividad: ActividadesService,
    private _serviceEquipos: EquiposService,
    private _serviceUsers: UsersService,
    private _activeRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
  ) {
    this.nuevoEquipo = {
      idEquipo: 0,
      idEventoActividad: 0,
      nombreEquipo: '',
      minimoJugadores: 0,
      idColor: 0,
      idCurso: 0,
    };
  }

  ngOnInit(): void {
    this.loadEquiposActividad();

    this._activeRoute.params.subscribe((params: Params) => {
      let idActividad = params['idActividad'];
      this.loadActividadEvento(idActividad);
    });

    this.loadColores();

    this._serviceUsers.getUser().subscribe((result) => {
      this.nuevoEquipo.idCurso = result.idCurso;
    });

    this._activeRoute.params.subscribe((params: Params) => {
      this.nuevoEquipo.idEventoActividad = params['idEventoActividad'];
    });
  }

  loadActividadEvento(idActividad: number): void {
    this._serviceActividad.getActividadPorId(idActividad).subscribe((result) => {
      this.actividad = result;
      this._cdr.detectChanges();
    });
  }

  loadEquiposActividad(): void {
    this._activeRoute.params.subscribe((params: Params) => {
      let idEvento = params['idEvento'];
      let idActividad = params['idActividad'];
      this._serviceEquipos.getEquiposActividad(idActividad, idEvento).subscribe((result) => {
        this.equiposActividad = result;
        // Cargar el número de miembros para cada equipo
        this.equiposActividad.forEach((equipo) => {
          this._serviceEquipos.getUsuariosEquipo(equipo.idEquipo).subscribe((usuarios) => {
            this.miembrosEquipo[equipo.idEquipo] = usuarios.length;
            this._cdr.detectChanges();
          });
        });
        this._cdr.detectChanges();
      });
    });
  }

  createEquipoActividad(): void {
    this._serviceEquipos.createEquipo(this.nuevoEquipo).subscribe(() => {
      console.log('equipo insertado correctamente');
      this.loadEquiposActividad();
    });
  }

  loadColores(): void {
    this._serviceEquipos.getColores().subscribe((result) => {
      this.colores = result;
      this._cdr.detectChanges();
    });
  }

  // Función para actualizar el color visualmente al elegir en el select o modal
  cambiarColorPrevisualizacion(event: any): void {
    const colorId = event.target.value;
    const colorEncontrado = this.colores.find((c) => c.idColor == colorId);
    if (colorEncontrado) {
      this.colorSeleccionadoHex = this.obtenerHexPorNombre(colorEncontrado.nombreColor);
    }
  }

  obtenerHexPorNombre(nombre: string): string {
    const nombreFinal = nombre ? nombre.toLocaleLowerCase() : '';
    const mapaColores: { [key: string]: string } = {
      azul: '#4f58fd',
      rojo: '#d6543e',
      verde: '#28a745',
      naranja: '#e67e45',
      amarillo: '#FFFF00',
      negro: '#000000',
      morado: '#800080',
      blanco: '#FFFFFF',
      marron: '#804000',
      gris: '#808080',
      granate: '#800000',
      rosa: '#FFC0CB',
      violeta: '#EE82EE',
      lima: '#00FF00',
    };
    return mapaColores[nombreFinal] || '#e67e45';
  }

  abrirModalColores(equipo: Equipo) {
    this.equipoAEditarColor = { ...equipo };
  }

  seleccionarColorRapido(color: Color) {
    Swal.fire({
      icon: 'question',
      title: '¿Estas seguro que desea cambiar el color del equipo?',
      text: 'Se cambiará la equipación del equipo seleccionado',
      timer: 5000,
      timerProgressBar: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._serviceEquipos
          .updateEquipacionEquipo(this.equipoAEditarColor.idEquipo, color.idColor)
          .subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Color actualizado',
                text: `El equipo ahora es de color ${color.nombreColor}`,
                timer: 2000,
                showConfirmButton: false,
              });

              this.loadEquiposActividad();

              const modalElement = document.getElementById('modalSelectorColores');
              if (modalElement) {
                const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
                modalInstance?.hide();
              }
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el color del equipo.',
              });
              console.error(err);
            },
          });
      }
    });
  }

  colorEstaOcupado(idColor: number): boolean {
    return this.equiposActividad.some((equipo) => equipo.idColor === idColor);
  }

  getNombreColorPorId(idColor: number) {
    
    if (!this.colores || !idColor) {
      return '';
    }
    const color = this.colores.find((color) => color.idColor == idColor);
    let nombreColor = color?.nombreColor || '';
    return nombreColor;
  }

  loadPlantillaEquipo(idEquipo: number): void {
    if (this.equipoDesplegado === idEquipo) {
      this.equipoDesplegado = null;
      return;
    }

    this.equipoDesplegado = idEquipo;

    if (!this.plantillaEquipo[idEquipo]) {
      this._serviceEquipos.getUsuariosEquipo(idEquipo).subscribe((result) => {
        this.plantillaEquipo[idEquipo] = result;
        this._cdr.detectChanges();
      });
    }
  }

  getIniciales(usuario: string): string {
    if (!usuario) return '';
    const palabras = usuario.trim().split(' ');
    if (palabras.length === 1) {
      return palabras[0].substring(0, 2).toUpperCase();
    }
    return (palabras[0].charAt(0) + palabras[palabras.length - 1].charAt(0)).toUpperCase();
  }
}
