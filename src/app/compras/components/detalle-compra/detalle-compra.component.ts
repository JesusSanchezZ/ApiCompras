import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as toastr from 'toastr';

import { Autorizacion, Empresa, MotivosRechazo } from '../../interfaces/compras/detalleCompra/detalleCompra.interface';
import { HistoEtapaSolicitud } from '../../interfaces/solicitudes/historicoEtapaSolicitud.interface';
import { TipoSolicitud as DetalleSolicitud } from '../../interfaces/solicitudes/detalleCompra/tipoSolicitud.interface';

import { ComprasService } from '../../services/compras.service';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styles: [
  ]
})
export class DetalleCompraComponent implements OnInit {

  @Input() solicitud: string = '';
  @Input() tipo: string = '';

  @Output() actualizaGen: EventEmitter<void> = new EventEmitter();

  autorizaUnoForm: FormGroup = this.fb.group({
    status: ['', [Validators.required]],
    empresa: ['',[Validators.required]],
    motivo: [0, [Validators.required]],
    observaciones: ['', [Validators.required]]
  });

  historicos: HistoEtapaSolicitud[] = [];
  detalleSolicitud: DetalleSolicitud[] = [];

  empresas: Empresa[] = [];
  motivos: MotivosRechazo[] = [];

  constructor(private compras: ComprasService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.compras.historicos(this.solicitud)
        .subscribe( historicos => this.historicos = historicos );

    this.compras.detalleSolicitud(this.solicitud, this.tipo)
        .subscribe( detalle => {
          this.detalleSolicitud = detalle;
          //console.log(!!this.detalleSolicitud[0].Productos);
        });

    this.autorizaUnoForm.get('status')?.valueChanges
        .subscribe(
          value => {
            this.autorizaUnoForm.get('empresa')?.reset('');
            this.autorizaUnoForm.get('motivo')?.reset(0);

            if( value === 'Autoriza'){
              this.compras.catEmpresas()
                  .subscribe(
                    empresas => {
                      this.empresas = empresas;
                      this.motivos = [];
                    }
                  );
            } else {
              this.compras.catMotRechazo()
                  .subscribe(
                    rechazos => {
                      this.motivos = rechazos;
                      this.empresas = [];
                    }
                  );
            }
          }
        );

    this.compras.cotizaciones(this.solicitud)
        .subscribe( resp => console.log(resp));
  }

  autoriza1(): void {
    if(this.autorizaUnoForm.invalid) return;

    const autoriza: Autorizacion = {
      b_Rechazo: this.autorizaUnoForm.get('motivo')?.value,
      idsolicitud: this.detalleSolicitud[0].idsolicitud,
      Productos: this.detalleSolicitud[0].Productos,
      s_empresa: this.autorizaUnoForm.get('empresa')?.value,
      s_Observaciones: this.autorizaUnoForm.get('observaciones')?.value,
      s_tiposolicitud: this.detalleSolicitud[0].s_tiposolicitud,
    }

    this.compras.autorizaRechaza(autoriza)
        .subscribe( resp => {
          if(resp.success === 'true'){
            toastr.success('Solicitud actualizada','' ,{
              toastClass: 'mt-5'
            });

            this.historicos = [];
            this.detalleSolicitud = [];

            this.compras.historicos(this.solicitud)
                .subscribe( historicos => this.historicos = historicos );

            this.compras.detalleSolicitud(this.solicitud, this.tipo)
                .subscribe( detalle => {
                  this.detalleSolicitud = detalle;
                  // console.log(detalle);
                });

            this.actualizaGen.emit();

          } else {
            toastr.error('No se pudo actualizar','',{
              toastClass: 'mt-5'
            })
          }
        });

    //console.log(autoriza);
  }

  statusError(campo: string) : string {
    const error = this.autorizaUnoForm.get(campo)?.errors;

    if( error?.['required']) return 'Este campo es requerido';

    return '';
  }

}
