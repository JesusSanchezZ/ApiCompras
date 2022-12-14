import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  contenerMayMin( control: FormControl): ValidationErrors | null {
    const valor = control.value;

    if(!(/^(?=.*?[A-Z])(?=.*?[a-z])/).test(valor)){
      return {
        mayMin: true,
      };
    }

    return null;
  }

  contenerNumeros( control: FormControl ): ValidationErrors | null {
    const valor = control.value;

    if( !(/^(?=.*?[0-9])/).test(valor) ){
      return {
        numeros: true,
      }
    }

    return null;
  }

  contenerEspeciales( control: FormControl ): ValidationErrors | null {
    const valor = control.value;

    if(!(/^(?=.*?[!"#$%&/\(\)<>:;-?¿+¡.,*])/).test(valor)){
      return {
        espec: true,
      }
    }

    return null;
  }

  camposIguales( campo1: string, campo2: string){
    return ( formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if(campo1 === 'contrAnterior'){
        if(pass1 === pass2){
          formGroup.get(campo2)?.setErrors({ antNuev: true });
          return { antNuev: true };
        }
      }else {
        if( pass1 !== pass2){
          formGroup.get(campo2)?.setErrors({ noIguales: true });
          return { noIguales: true }
        }
      }

      formGroup.get(campo2)?.setErrors(null);
      return null;
    }
  }
}
