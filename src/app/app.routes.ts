import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { authGuard } from './auth/auth-guard';
import { MenuEventos } from './components/menu-eventos/menu-eventos';
import { PartidosActividad } from './components/partidos-actividad/partidos-actividad';
import { MaterialesActividad } from './components/materiales-actividad/materiales-actividad';
import { CapitanesActividad } from './components/capitanes-actividad/capitanes-actividad';
import { EquiposActividad } from './components/equipos-actividad/equipos-actividad';
import { PantallaEventos } from './components/pantalla-eventos/pantalla-eventos';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'eventos', component: PantallaEventos, canActivate: [authGuard]},
  // { path: 'eventos', component: EventSource, canActivate: [authGuard] },
  { path: 'detallesEvento', component: MenuEventos, canActivate: [authGuard] },
  { path: 'perfil', component: PerformanceObserverEntryList, canActivate: [authGuard] },
  { path: 'partidosActividad', component: PartidosActividad, canActivate: [authGuard] },
  { path: 'materialesActividad', component: MaterialesActividad, canActivate: [authGuard] },
  { path: 'capitanesActividad', component: CapitanesActividad, canActivate: [authGuard] },
  { path: 'equiposActividad', component: EquiposActividad, canActivate: [authGuard] },
];
