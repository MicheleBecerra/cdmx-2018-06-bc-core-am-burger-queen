// Fichero de configuración de rutas
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importamos los componentes login y register
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

// Array de objetos json que definen las rutas
const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

