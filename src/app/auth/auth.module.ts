import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialLoginModule } from '../material-login/material-login.module';

import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AlertaComponent } from './components/alerta/alerta.component';
import { ReestablecerComponent } from './pages/reestablecer/reestablecer.component';
import { CondPassComponent } from './components/cond-pass/cond-pass.component';
import { SpinnerModule } from '../components/spinner/spinner.module';




@NgModule({
  declarations: [
    LoginComponent,
    AlertaComponent,
    ReestablecerComponent,
    CondPassComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialLoginModule,
    SpinnerModule,
  ]
})
export class AuthModule { }
