import { Component, Input, OnInit } from '@angular/core';

import { HistoEtapaSolicitud } from '../../interfaces/solicitudes/historicoEtapaSolicitud.interface';
import { ComboVehiculos, DetalleVehiculo, TarjetaGas, TarjetaTag } from '../../interfaces/vehiculos/vehiculos.interface';

import { SolicitudesService } from '../../services/solicitudes.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle-vehiculos',
  templateUrl: './detalle-vehiculos.component.html',
  styles: [
  ]
})
export class DetalleVehiculosComponent implements OnInit {

  @Input() solicitud: string[] = [];

  formValidacion: FormGroup = this.fb.group({
    marca: [],
    submarca: [],
    placa: [],
    gasolina: [],
    tag: [],
    saldo: [],
    observaciones: []
  });

  historicos: HistoEtapaSolicitud[]   = [];
  detalleSolicitud: DetalleVehiculo[] = [];

  private _detalle   = false;
  private _historico = false;
  private _vehiculo  = false;

  private _vehiculos: ComboVehiculos[] = [];
  private _tarjGas: TarjetaGas[] = [];
  private _tarjTag: TarjetaTag[] = [];

  marca:    string[] = [];
  submarca: string[] = [];
  placa:    string[] = [];
  gasolina: string[] = [];
  tag:      string[] = [];

  constructor(private fb: FormBuilder, private solicitudes: SolicitudesService,
              private usuario: UsuarioService) { }

  ngOnInit(): void {
    this.solicitudes.loader('Cargando');

    console.log(this.usuario.getUsuario);

    this.solicitudes.comboVehiculos()
        .subscribe({
          next: vehiculos => {
            this._vehiculos = vehiculos;

            this._vehiculos.forEach(x => {
              if(!this.marca.includes(x.s_Marca))
                this.marca.push(x.s_Marca);
            });
          },
          complete: () => {
            this._vehiculo = true;
            this.cerrarLoader();
          }
        });

    this.solicitudes.historicoEtapaSolicitud(this.solicitud[0])
        .subscribe({
          next: historicos => this.historicos = historicos,
          complete: () => {
            this._historico = true;
            this.cerrarLoader();
          }
        });

    this.solicitudes.detalleVehiculo(this.solicitud)
        .subscribe({
          next: detalle => {
            console.log(detalle);
            this.detalleSolicitud = detalle;
            console.log(this.detalleSolicitud);
          },
          complete: () => {
            this._detalle = true;
            this.cerrarLoader();
          }
        });

    this.solicitudes.tarjetaGasolina()
        .subscribe({
          next: g => {
            this._tarjGas = g;
            this._tarjGas.forEach(x => {
              if(x.n_saldo > 0)
                this.gasolina.push(x.s_tarjetagasolina);
            })
          }
        });

    this.solicitudes.tarjetaTag()
        .subscribe({
          next: t => {
            this._tarjTag = t;
            this._tarjTag.forEach(x => this.tag.push(x.s_tag))
          }
        });

    this.formValidacion.controls['gasolina'].valueChanges
        .subscribe( v => {
          this._tarjGas.forEach(g => {
            if(g.s_tarjetagasolina === v)
              this.formValidacion.controls['saldo'].setValue(g.n_saldo);
          })
        })

    this.formValidacion.controls['marca'].valueChanges
        .subscribe( m => {
          this.submarca = [];
          this.placa    = [];
          this.formValidacion.controls['submarca'].setValue('');
          this.formValidacion.controls['placa'].setValue('');

          this._vehiculos.forEach(v => {
            if(v.s_Marca === m)
              if(!this.submarca.includes(v.s_Submarca))
                this.submarca.push(v.s_Submarca)
          });
        });

    this.formValidacion.controls['submarca'].valueChanges
        .subscribe(sm => {
          this.placa = [];
          this.formValidacion.controls['placa'].setValue('');

          this._vehiculos.forEach(v => {
            if(v.s_Submarca === sm)
              this.placa.push(v.s_PlacaVehicular);
          })
        })
  }

  cerrarLoader() {
    if(this._detalle && this._historico && this._vehiculo)
      this.solicitudes.closeLoader();
  }

}
