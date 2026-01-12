import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { HomeComponent } from './components/header/header';
import { authGuard } from './auth/auth-guard';
import { MenuEventos } from './components/menu-eventos/menu-eventos';
import { MenuActividades } from './components/menu-actividades/menu-actividades';


    export const routes: Routes = [
    { path: '', component: LoginComponent },
    {path: 'eventos', component: EventSource, canActivate: [authGuard]},
    {path: 'detallesEvento', component: MenuEventos,canActivate: [authGuard]},
    {path: 'detallesActividad', component: MenuActividades,canActivate: [authGuard]},
    {path: 'perfil', component: PerformanceObserverEntryList,canActivate: [authGuard]},
];
