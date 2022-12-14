import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  @Output('estado') onClick: EventEmitter<boolean> = new EventEmitter();

  menuState = true;
  year = new Date().getFullYear();
  nombre: string = '';

  constructor(private _router: Router, private usuario: UsuarioService) { }

  ngOnInit(): void {
    this.nombre = this.usuario.getUsuario?.payload?.split('.')[1] || '';
    // this.ocultaMenu();
  }

  ocultaMenu():void {
    this.menuState = ! this.menuState;
    this.onClick.emit( this.menuState );
  }

  salir():void {
    this.usuario.setUsuario = {
      mensaje: '',
      menu: '',
      payload: '',
      perfilEtapa: [],
      resc: '',
      success:'',
      token: ''
    };
    //console.log(this.usuario.getUsuario);
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
