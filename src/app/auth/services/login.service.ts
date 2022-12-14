import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioPet } from '../interfaces/usuarioPet.interface';
import { UsuarioResp } from '../interfaces/usuarioResp.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:5000';
  usuarioRestablecer: string = '';

  constructor(private http:HttpClient,
              private usuario: UsuarioService ) { }

  login(user: UsuarioPet): Observable<UsuarioResp> {
    return this.http.post<UsuarioResp>(`${this.baseUrl}/api/login`,user);
  }

  cambiaPass(user: UsuarioPet): Observable<UsuarioResp>{
    const user1 = {
      s_claveEmpleado: user.s_claveEmpleado,
      s_passwordAntigua: user.s_passwordAntigua,
      s_passwordNueva: user.s_passwordNueva
    }

    console.log(user1);
    return this.http.put<UsuarioResp>(`${this.baseUrl}/api/login`, user1);
  }

}
