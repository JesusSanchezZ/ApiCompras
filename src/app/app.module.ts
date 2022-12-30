import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Cambiar el idioma de la aplicacion
import localEs from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
registerLocaleData( localEs );

import { AppComponent } from './app.component';

import { ComprasRoutingModule } from './compras-routing.module';
import { HomePageModule } from './home-page/home-page.module';

import { ErrorPageComponent } from './error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ComprasRoutingModule,
    HomePageModule,
  ],
  // inyectamos en la aplicacion
  providers: [
    { provide: LOCALE_ID, useValue: 'es-Mx'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
