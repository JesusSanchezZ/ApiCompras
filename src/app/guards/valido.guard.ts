import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';

import { Observable, tap } from 'rxjs';

import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ValidoGuard implements CanActivate, CanLoad {

  constructor(private usuario: UsuarioService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.usuario.verificaNoAutenticado()
                .pipe(
                  tap( autenticado => {
                    console.log(autenticado);
                    if( !autenticado ){
                      this.router.navigateByUrl('/compras/solicitudes');
                    }
                  })
                );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.usuario.verificaNoAutenticado()
              .pipe(
                tap( autenticado => {
                  if( autenticado ){
                    this.router.navigateByUrl('/compras/solicitudes');
                  }
                })
              );
  }
}
