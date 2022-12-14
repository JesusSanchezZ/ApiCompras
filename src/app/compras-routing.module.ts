import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';

import { AutenticadoGuard } from './guards/autenticado.guard';
import { ValidoGuard } from './guards/valido.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
    canActivate: [ ValidoGuard ]
  },
  {
    path: 'compras',
    component: HomePageComponent,
    loadChildren: () => import('./compras/compras.module').then( m => m.ComprasModule),
    canActivate: [ AutenticadoGuard],
    canLoad: [ AutenticadoGuard ]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class ComprasRoutingModule { }
