import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuActividades } from '../menu-actividades/menu-actividades';
import { ActividadesService } from '../../services/actividades/actividades-service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Actividad } from '../../models/actividad';
import { UsersService } from '../../services/users/users-service';
import { Material } from '../../models/material';
import { MaterialesService } from '../../services/materiales/materiales-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-materiales-actividad',
  imports: [MenuActividades, FormsModule, CommonModule],
  templateUrl: './materiales-actividad.html',
  styleUrl: './materiales-actividad.css',
})
export class MaterialesActividad implements OnInit {
  idActividad!: number;
  idEvento!: number;
  idEventoActividad!: number;
  idUsuario!: number;
  actividad!: Actividad;
  materialesActividad!: Array<Material>;
  nuevoMaterial: Material;

  constructor(
    private actividadService: ActividadesService,
    private usersService: UsersService,
    private materialesService: MaterialesService,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.nuevoMaterial = {
      idMaterial: 0, // valor provisional, se asignará desde el backend
      idEventoActividad: 0,
      idUsuario: 0,
      nombreMaterial: '',
      pendiente: true,
      fechaSolicitud: '',
      idUsuarioAportacion: -1
    }
  }

  ngOnInit(): void {

    this.activeRoute.params.subscribe((params: Params) => {
      this.idActividad = params['idActividad'];
      this.idEventoActividad = params['idEventoActividad'];
      this.loadActividadEvento(this.idActividad);
    })

    this.usersService.getUser().subscribe(response => {
      this.idUsuario = response.idUsuario;
    })

    this.loadMaterialesActividad();
  }

  loadMaterialesActividad(): void {
    this.materialesService.getMaterialesActividad(this.idEventoActividad).subscribe(response => {
      this.materialesActividad = response;
      this.cdr.detectChanges();
    });

  }

  loadActividadEvento(idActividad: number): void {
    this.actividadService.getActividadPorId(idActividad).subscribe(result => {
      this.actividad = result;
      this.cdr.detectChanges();
    })
  }

  createMaterialActividad(): void {

    this.nuevoMaterial.idEventoActividad = this.idEventoActividad;
    this.nuevoMaterial.idUsuario = this.idUsuario;
    this.nuevoMaterial.nombreMaterial = this.nuevoMaterial.nombreMaterial.trim();

    this.nuevoMaterial.fechaSolicitud = new Date().toISOString();

    this.materialesService.createMaterialActividad(this.nuevoMaterial).subscribe(response => {
      this.loadMaterialesActividad();
    });

    console.log("Solicitud creada:", this.nuevoMaterial);

    // Resetear el formulario
    this.nuevoMaterial = {
      idMaterial: 0, // valor provisional, se asignará desde el backend
      idEventoActividad: 0,
      idUsuario: 0,
      nombreMaterial: '',
      pendiente: true,
      fechaSolicitud: '',
      idUsuarioAportacion: -1
    };
  }

  aportarMaterial(idMaterial: number): void {
    this.materialesService.getMaterialById(idMaterial).subscribe(response => {
      let material = response;
      material.idUsuarioAportacion = this.idUsuario;
      material.pendiente = false;
      this.materialesService.updateMaterialActividad(material).subscribe(() => {
        this.loadMaterialesActividad();
      });
    });
  }

  cancelarAportacionMaterial(idMaterial: number): void {
    this.materialesService.getMaterialById(idMaterial).subscribe(response => {
      let material = response;
      material.idUsuarioAportacion = -1;
      material.pendiente = true;
      this.materialesService.updateMaterialActividad(material).subscribe(() => {
        this.loadMaterialesActividad();
      });
    });
  }
}