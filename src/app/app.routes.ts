import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { authGuard } from './auth/auth-guard';
import { PartidosActividad } from './components/partidos-actividad/partidos-actividad';
import { MaterialesActividad } from './components/materiales-actividad/materiales-actividad';
import { CapitanesActividad } from './components/capitanes-actividad/capitanes-actividad';
import { EquiposActividad } from './components/equipos-actividad/equipos-actividad';
import { DetallesEvento } from './components/detalles-evento/detalles-evento';
import { ActividadesEvento } from './components/actividades-evento/actividades-evento';
import { PagosEvento } from './components/pagos-evento/pagos-evento';
import { PantallaEventos } from './components/pantalla-eventos/pantalla-eventos';
import { PerfilUsuario } from './components/perfil-usuario/perfil-usuario';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'eventos', component: PantallaEventos, canActivate: [authGuard] },
  { path: 'detallesEvento/:id', component: DetallesEvento, canActivate: [authGuard] },
  { path: 'actividadesEvento/:id', component: ActividadesEvento, canActivate: [authGuard] },
  { path: 'pagosEvento/:id', component: PagosEvento, canActivate: [authGuard] },
  { path: 'perfil', component: PerfilUsuario, canActivate: [authGuard] },
  {
    path: 'partidosActividad/:idEvento/:idActividad/:idEventoActividad',
    component: PartidosActividad,
    canActivate: [authGuard],
  },
  { path: 'materialesActividad', component: MaterialesActividad, canActivate: [authGuard] },
  { path: 'capitanesActividad', component: CapitanesActividad, canActivate: [authGuard] },
  { path: 'equiposActividad', component: EquiposActividad, canActivate: [authGuard] },
];
