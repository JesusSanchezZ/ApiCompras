import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ReestablecerComponent } from './pages/reestablecer/reestablecer.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'iniciar',
        component: LoginComponent
      },
      {
        path: 'restablecer',
        component: ReestablecerComponent
      },
      {
        path: '**',
        redirectTo: 'iniciar'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
