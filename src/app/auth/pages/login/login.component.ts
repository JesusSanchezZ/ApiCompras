import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import * as toastr from 'toastr';

import { UsuarioPet } from '../../interfaces/usuarioPet.interface';

import { AlertaComponent } from '../../components/alerta/alerta.component';
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    s_claveEmpleado: ['',[Validators.required]],
    s_psw: ['',[Validators.required]]
  })

  get claveErrorMsj(): string {
    const error = this.loginForm.get('s_claveEmpleado')?.errors;

    if(error?.['required']){
      return 'La clave de empleado es requerida';
    }

    return '';
  }

  get pswErrorMsj(): string {
    const error = this.loginForm.get('s_psw')?.errors;

    if(error?.['required']){
      return 'La contraseña es requerida';
    }

    return '';
  }

  usuario: UsuarioPet = {
    s_claveEmpleado: '',
    s_psw: ''
  };

  token: string = '';
  cargando: boolean = false;

  // ctrUser: string = '';
  // ctrPass: string = '';
  // msjUser: string = '';
  // msjPass: string = '';

  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private usServ: UsuarioService,
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    if(this.loginForm.invalid){
      console.log('Formulario inválido');
      return;
    }

    this.usuario.s_claveEmpleado = this.loginForm.get('s_claveEmpleado')?.value;
    this.usuario.s_psw = this.loginForm.get('s_psw')?.value;

    //console.log(this.usuario);

    this.cargando = true;
    this.dialog.open(SpinnerComponent,{
      disableClose: true,
      minHeight: 75,
      minWidth: 75,
    });

    this.loginService.login(this.usuario)
      .subscribe({
        next: resp =>{
          //console.log(resp);
          if(resp.success === 'true'){
            toastr.success(resp.mensaje,'',{
              onShown: () => {setTimeout(() => {
                this.usServ.setUsuario = resp;
                localStorage.setItem('usuario', JSON.stringify(resp));
                //this.alerta([resp.mensaje, 'verdeT']);
                this._router.navigate(['/compras/solicitudes']);
              }, 1000);}
            });
          } else{
            if(resp.mensaje === 'Credenciales incorrectas'){
              toastr.error(resp.mensaje);
              //this.alerta([resp.mensaje, 'rojoT']);
            } else if(resp.mensaje === 'El password expiró'){
              toastr.info(resp.mensaje);
              //this.alerta([resp.mensaje, 'rojoT']);
              this.loginService.usuarioRestablecer = this.loginForm.get('s_claveEmpleado')?.value;
              this._router.navigate(['/login/restablecer']);
            } else {
              toastr.error(resp.mensaje);
            }
          }
          //console.log(resp.mensaje);
          this.cargando = false;
          this.dialog.closeAll();
        },
        error: error =>{
          toastr.error('Intente más tarde...','Error del servidor');
          this.cargando = false;
          this.dialog.closeAll();
        }
      });
  }

  obtenerToken():void {
    let tok: string = 'null';
    this.notificaciones(tok);
    console.log(tok);
    console.log(tok.split(';')[0].split('=')); // obtiene dos pares de valores
    // el primer split obtiene un arreglo de 4 elementos, el elemento 0 contiene el token,
  }

  notificaciones(msj: string):void {
    this._snackBar.open(msj,'Cerrar',{
      //duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  alerta(msj: string[]): void {
    this._snackBar.openFromComponent(AlertaComponent,{
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: msj,
      panelClass: 'azul'
    });
  }

  // limpiar(entrada: number = 0): void {
  //   if( entrada == 1){
  //     this.ctrUser = '';
  //   }
  //   else this.ctrPass = '';
  // }

  campoNoValido( campo: string ) {
    return this.loginForm.get(campo)?.invalid
        && this.loginForm.get(campo)?.touched;
  }

}
