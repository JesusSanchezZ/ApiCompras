import { ContentObserver } from '@angular/cdk/observers';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';

import { Observable, pipe, tap } from 'rxjs';

import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanActivate, CanLoad {

  constructor( private usuario: UsuarioService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.usuario.verificaAutenticacion()
            .pipe(
              tap( autenticado => {
                if(!autenticado){
                  this.router.navigate(['/login/iniciar']);
                }
              })
            );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.usuario.verificaAutenticacion()
            .pipe(
              tap( autenticado => {
                //console.log(autenticado);
                if(!autenticado){
                  this.router.navigate(['/login/iniciar']);
                }
              })
            );
  }
}
