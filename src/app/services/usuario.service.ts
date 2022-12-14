import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsuarioResp } from '../auth/interfaces/usuarioResp.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuario: UsuarioResp | undefined = {
     mensaje: '',
     menu: '',
     payload: '',
     perfilEtapa: [],
     resc: '',
     success: '',
     token: ''
  };


  public get getUsuario() : UsuarioResp | undefined {
    if(this.usuario)
      return {...this.usuario};

    return undefined;
  }


  public set setUsuario(v : UsuarioResp | undefined) {
    this.usuario = v;
  }

  verificaAutenticacion(): Observable<boolean> {
    //console.log('UsuarioServices' + JSON.stringify(this.getUsuario));
    if(!localStorage.getItem('usuario')){
      return of(false);
    }

    if( this.getUsuario?.token === ''){
      this.setUsuario = JSON.parse( localStorage.getItem('usuario')! );
    }

    return of(true);
  }

  verificaNoAutenticado(): Observable<boolean> {
    if(localStorage.getItem('usuario')){
      console.log('sin usuario')
      return of(false);
    }

    return of(true);
  }

  constructor() { }
}
