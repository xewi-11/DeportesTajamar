import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
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
  actividad!: Actividad;
  materialesActividad!: Array<Material>;
  nuevoMaterial: Material;
  aportaMaterial: boolean = false;

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
      pendiente: false,
      fechaSolicitud: '',
      idUsuarioAportacion: -1
    }
  }

  ngOnInit(): void {
    this.loadMaterialesActividad();
    this.activeRoute.params.subscribe((params: Params) => {
      let idActividad = params['idActividad'];
      this.nuevoMaterial.idEventoActividad = params['idEventoActividad'];
      console.log("idEventoActividad:" + this.nuevoMaterial.idEventoActividad);
      this.loadActividadEvento(idActividad);
    })

    this.usersService.getUser().subscribe(response => {
      this.nuevoMaterial.idUsuario = response.idUsuario;
    })
  }

  loadMaterialesActividad(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      let idActividad = params['idActividad'];
      this.materialesService.getMaterialesActividad(idActividad).subscribe(response => {
        this.materialesActividad = response;
        this.cdr.detectChanges();
      });
    });
  }

  loadActividadEvento(idActividad: number): void {
    this.actividadService.getActividadPorId(idActividad).subscribe(result => {
      this.actividad = result;
      this.cdr.detectChanges();
    })
  }

  createMaterialActividad(): void {
    this.nuevoMaterial.fechaSolicitud = new Date().toISOString();

    if (this.aportaMaterial) {
      this.nuevoMaterial.idUsuarioAportacion = this.nuevoMaterial.idUsuario;
      this.nuevoMaterial.pendiente = false;
    } else {
      this.nuevoMaterial.idUsuarioAportacion = -1;
      this.nuevoMaterial.pendiente = true;
    }

    this.materialesService.createMaterialActividad(this.nuevoMaterial).subscribe(response => {
      this.loadMaterialesActividad();
    });

    console.log("Solicitud creada:", this.nuevoMaterial);
    console.log("Aporta material:", this.aportaMaterial);

    // Resetear el formulario
    this.aportaMaterial = false;
    this.nuevoMaterial.nombreMaterial = '';
  }

  aportarMaterial(): void {
    this.materialesService.getMaterialById(39).subscribe(response => {
      let material = response;
      console.log(material);
    });
  }
}