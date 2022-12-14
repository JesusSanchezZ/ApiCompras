import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import * as toastr from 'toastr';

import { AlertaComponent } from '../../components/alerta/alerta.component';
import { CondPassComponent } from '../../components/cond-pass/cond-pass.component';
import { UsuarioPet } from '../../interfaces/usuarioPet.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-reestablecer',
  templateUrl: './reestablecer.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class ReestablecerComponent implements OnInit {
  restForm: FormGroup = this.fb.group({
    empleado: [''],
    contrAnterior: ['', Validators.required],
    contrNueva: ['', [Validators.required,
                      Validators.minLength(8),
                      this.validator.contenerMayMin,
                      this.validator.contenerNumeros,
                      this.validator.contenerEspeciales ]],
    repContrNueva: ['', Validators.required]
  },{
    validators: [ this.validator.camposIguales('contrNueva','repContrNueva'),
                  this.validator.camposIguales('contrAnterior','contrNueva')]
  });

  get passAntErrorMsj(): string {
    const error = this.restForm.get('contrAnterior')?.errors;

    if(error?.['required']){
      return 'Este campo es requerido';
    }

    return '';
  }

  get passNuErrorMsj(): string {
    const error = this.restForm.get('contrNueva')?.errors;

    if(error?.['required']){
      return 'Este campo es requerido';
    } else if( error?.['minlength']){
      return 'Debe de contener al menos 8 caracteres';
    } else if( error?.['mayMin'] ){
      return 'Faltan mayusculas y minusculas';
    } else if( error?.['numeros']){
      return 'Debe de contener números';
    } else if( error?.['espec']){
      return 'Debe de contener caracteres especiales';
    } else if( error?.['antNuev']){
      return 'No debe de ser igual a la anterior'
    }

    return '';
  }

  get rePassNuErrorMsj(): string {
    const error = this.restForm.get('repContrNueva')?.errors;

    if(error?.['required']){
      return 'Este campo es requerido';
    } else if( error?.['noIguales']){
      return 'Las contraseñas no coinciden';
    }

    return '';
  }

  usuario: UsuarioPet = {
    s_claveEmpleado: '',
    s_psw: '',
    s_passwordAntigua: '',
    s_passwordNueva: '',
    s_rnew_psw: ''
  }

  constructor(
    private _snack: MatSnackBar,
    private _router: Router,
    private fb: FormBuilder,
    private validator: ValidatorService,
    private login: LoginService
  ) {
    if(this.login.usuarioRestablecer === ''){
      this._router.navigate(['/login/iniciar']);
    }

    this.restForm.get('empleado')?.reset(this.login.usuarioRestablecer);
  }

  ngOnInit(): void {
    this._snack.openFromComponent(CondPassComponent,{
      horizontalPosition: 'start',
      verticalPosition: 'bottom'
    });
  }

  reestablecer(): void {
    if(this.restForm.invalid){
      return;
    }

    this.usuario.s_claveEmpleado = this.restForm.get('empleado')?.value;
    this.usuario.s_passwordAntigua = this.restForm.get('contrAnterior')?.value;
    this.usuario.s_passwordNueva = this.restForm.get('contrNueva')?.value;

    console.log(this.usuario);

    this.login.cambiaPass(this.usuario)
        .subscribe( resp =>{
          if(resp && resp.success === 'true'){
            this._snack.dismiss();
            toastr.success('Se actualizó la contraseña');
            this._router.navigate(['/login/iniciar']);
          } else {
            toastr.error(resp.mensaje);
            // this.restForm.reset();
            console.log(resp);
          }
          this.login.usuarioRestablecer = '';
        });

    // setTimeout(() => {
    //   this._router.navigate(['/login/iniciar']);
    // }, 2000);

  }

  llamarAlerta(msj: string, clase: string): void {
    this._snack.openFromComponent(AlertaComponent,{
      data: [msj, clase],
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    }).afterDismissed().subscribe(() => {
      this._snack.openFromComponent(CondPassComponent,{
        horizontalPosition: 'start',
        verticalPosition: 'bottom'
      })
    });
  }

}

