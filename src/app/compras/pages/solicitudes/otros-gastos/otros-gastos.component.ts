import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';
import * as toastr from 'toastr';

import { MedioPago, Resp } from 'src/app/compras/interfaces/solicitudes/compras/solicitudCompra.interface';
import { Empleado, OtrosGastos } from 'src/app/compras/interfaces/solicitudes/tipoSolicitud.interface';

import { SolicitudesService } from 'src/app/compras/services/solicitudes.service';
import { Router } from '@angular/router';

interface Segmento {
  segmento: string;
  nombre:   string;
  cliente: string;
}

@Component({
  selector: 'app-otros-gastos',
  templateUrl: './otros-gastos.component.html',
  styles: [
  ]
})
export class OtrosGastosComponent implements OnInit {

  otrosFormulario: FormGroup = this.fb.group({
    monto: [0, [Validators.min(0), Validators.max(5000)]],
    descripcion: [, Validators.required],
    fecha: [new Date()],
    beneficiario: [, Validators.required],
    medioPago: [, Validators.required],
    banco: [],
    cuenta: [],
    observaciones: [],
    numSegmentos: [0, [Validators.min(0), Validators.max(10)]],
    segmentos: this.fb.array([]),
    porcentajeSeg: this.fb.array([])
  }) ;

  get segmentos() {
    return this.otrosFormulario.get('segmentos') as FormArray;
  }

  get porcentajeSeg() {
    return this.otrosFormulario.get('porcentajeSeg') as FormArray;
  }

  fechaMin = new Date();
  fechaMax = new Date();

  //beneficiario!: string;
  datosBancarios = false;
  medioPago: MedioPago[] = [];
  segm: Segmento[] = [];
  claveEmpleado = '';
  clientes: string[] = [];

  constructor(private fb: FormBuilder, private solicitudes: SolicitudesService,
              private router: Router) { }

  ngOnInit(): void {
    // Establece la fecha máxima en un año
    this.fechaMax.setFullYear(this.fechaMin.getFullYear() + 1,11,31);

    this.solicitudes.datosUsuario()
        .subscribe(datos => {
          this.otrosFormulario.controls['beneficiario'].setValue(datos[0].s_nombre);
          this.claveEmpleado = datos[0].s_claveEmpleado;
        });

    this.solicitudes.catMedioPagoFiltrado()
        .subscribe(medio => this.medioPago = medio);

    this.solicitudes.segmentos()
        .subscribe( seg => {
          seg.forEach( s => this.segm.push({segmento: s.segmento, nombre: s.nombre, cliente: s.cliente}));
          this.segm.forEach(x => {
            if(!this.clientes.includes(x.cliente))
              this.clientes.push(x.cliente);
          });
        });

    this.otrosFormulario.get('medioPago')?.valueChanges
        .subscribe(pago => {
          if(pago === 'Tarjeta de Nomina' || pago === 'Tarjeta Empresarial')
            this.datosBancarios = true;
          else {
            this.datosBancarios = false;
            this.otrosFormulario.controls['banco'].setValue('');
            this.otrosFormulario.controls['cuenta'].setValue('');
          }
        });

    this.otrosFormulario.get('numSegmentos')?.valueChanges
        .subscribe(num => {
          if(num >= 0 && num <= 10){
            if(num > this.segmentos.length)
              this._agregarSegmento();
            else if(num !== 10)
                  this._eliminarSegmento(num - 1);
          }
        });
  }

  enviarSolicitud(){
    if (this.otrosFormulario.invalid) return;

    if(this.otrosFormulario.get('monto')?.value == 0){
      toastr.error('El monto debe de ser mayor a 0','',{
        toastClass: 'mt-5'
      });

      return;
    }

    let empleado: Empleado = {
      clave_empleado: this.claveEmpleado,
      nombre_empleado: this.otrosFormulario.get('beneficiario')?.value
    }

    let solicitud: OtrosGastos = {
      d_fecharequerimiento: moment(this.otrosFormulario.get('fecha')?.value).format('DD/MM/YYYY'),
      idTipoCosto: "2",
      m_montosolicitud: this.otrosFormulario.get('monto')?.value.toString(),
      n_cantidadsegmentos: this.otrosFormulario.get('numSegmentos')?.value.toString(),
      n_NumEmpleadosBeneficiados: "1",
      s_beneficiario: this.claveEmpleado,
      s_claves_empleados: [empleado],
      s_descripcion: this.otrosFormulario.get('descripcion')?.value,
      s_mediopago: this.otrosFormulario.get('medioPago')?.value,
      s_Observaciones: this.otrosFormulario.get('observaciones')?.value,
      s_tiposolicitud: 'OtrosGastos'
    }

    this.solicitudes.generaOtrosGastos(solicitud)
        .subscribe({
          next: resp => {
            if(resp.success === 'true'){
              toastr.success(resp.mensaje, resp.payload,{
                toastClass: 'mt-5'
              });
              this.router.navigateByUrl('/compras/solicitudes');
            }
            else if(resp.success === 'false'){
              toastr.error('No se pudo generara la solicitud','',{
                toastClass: 'mt-5'
              });
            }
          },
          error: err =>{
            toastr.error('Error del servidor','',{
              toastClass: 'mt-5'
            })
          }
        });
  }

  erroresFormulario(campo: string): string {
    const error = this.otrosFormulario.get(campo)?.errors;

    if(campo === 'monto'){
      if (error?.['min']) return 'El monto mínimo es: $0.0';
      if (error?.['max']) return 'El monto máximo es: $5000.00'
    }
    if(campo === 'numSegmentos'){
      if (error?.['min']) return 'La cantidad mínima es: 0';
      if (error?.['max']) return 'La cantidad máxima es: 10';
    }
    if(error?.['required']) return 'Este campo es requerido';
    return '';
  }

  private _agregarSegmento() {
    this.segmentos.push(this.fb.control(''));
    this.porcentajeSeg.push(this.fb.control(0));

    this._porcentajes();
  }

  private _eliminarSegmento(index: number) {
    this.segmentos.removeAt(index);
    this.porcentajeSeg.removeAt(index);

    this._porcentajes();
  }

  private _porcentajes() {
    let cant = this.segmentos.length;
    let percent = 100.0 / cant;
    for(let i = 0; i < cant; i++){
      this.porcentajeSeg.controls[i].setValue(percent.toFixed(2));
    }
  }

}
