import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { MenuActividades } from '../menu-actividades/menu-actividades';
import { ActividadesService } from '../../services/actividades/actividades-service';
import { EquiposService } from '../../services/equipos/equipos-service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Equipo } from '../../models/equipo';
import { Actividad } from '../../models/actividad';

@Component({
  selector: 'app-equipos-actividad',
  imports: [Header, MenuActividades, FormsModule],
  templateUrl: './equipos-actividad.html',
  styleUrl: './equipos-actividad.css',
})
export class EquiposActividad implements OnInit{

  idActividad!: number;
  idEvento!: number;
  actividad!: Actividad;
  equiposActividad!: Array<Equipo>

  constructor(
    private _serviceActividad: ActividadesService,
    private _serviceEquipos: EquiposService,
    private _activeRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this._activeRoute.params.subscribe((params: Params)=>{
      let idEvento = params['idEvento'];
      let idActividad = params['idActividad'];
      this.loadEquiposActividad(idEvento, idActividad);
    })

    this._activeRoute.params.subscribe((params: Params)=>{
      let idActividad = params['idActividad'];
      this.loadActividadEvento(idActividad);
    })

  }

  loadActividadEvento(idActividad: number): void{
    this._serviceActividad.getActividadPorId(idActividad).subscribe(result=>{
      this.actividad = result;
      this._cdr.detectChanges();
    })
  }

  loadEquiposActividad(idActividad: number, idEvento:number): void{
    this._serviceEquipos.getEquiposActividad(idActividad, idEvento).subscribe(result=>{
      console.log(result);
      this.equiposActividad = result;
      this._cdr.detectChanges();
    })
  }

}
