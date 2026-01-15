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

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'eventos', component: EventSource, canActivate: [authGuard] },
  { path: 'detallesEvento', component: DetallesEvento, canActivate: [authGuard] },
  { path: 'actividadesEvento', component: ActividadesEvento, canActivate: [authGuard] },
  { path: 'pagosEvento', component: PagosEvento, canActivate: [authGuard] },
  { path: 'perfil', component: PerformanceObserverEntryList, canActivate: [authGuard] },
  { path: 'partidosActividad', component: PartidosActividad, canActivate: [authGuard] },
  { path: 'materialesActividad', component: MaterialesActividad, canActivate: [authGuard] },
  { path: 'capitanesActividad', component: CapitanesActividad, canActivate: [authGuard] },
  { path: 'equiposActividad', component: EquiposActividad, canActivate: [authGuard] },
];
