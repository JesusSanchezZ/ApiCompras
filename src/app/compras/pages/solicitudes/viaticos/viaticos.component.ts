import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { Colonia, Estado, MedioPago, Municipio, Resp, Usuario } from 'src/app/compras/interfaces/solicitudes/compras/solicitudCompra.interface';

import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

import { ComprasService } from 'src/app/compras/services/compras.service';
import { SolicitudesService } from 'src/app/compras/services/solicitudes.service';

interface Segmento {
  segmento: string;
  nombre:   string;
  cliente:  string;
}

@Component({
  selector: 'app-viaticos',
  templateUrl: './viaticos.component.html',
  styles: [
    `
      .radio-group{
        display: flex;
        flex-direction: column;
        margin: 15px 0;
        align-items: flex-start;
      }
      .radio {
        margin-bottom: 4.75em;
      }
    `
  ]
})
export class ViaticosComponent implements OnInit {

  // @HostListener('click',['$event'])
  // onClick = (e: any) => {
  //   console.log(e.target);
  // }

  formViaticos: FormGroup = this.fb.group({
    gastoOperativo: [false],
    origen: [],
    estadoOrigen: [],
    municipioOrigen: [],
    coloniaOrigen: [],
    destino: [],
    estadoDestino: [],
    municipioDestino: [],
    coloniaDestino: [],
    empleadosBeneficiados: [0, [Validators.min(0), Validators.max(10)]],
    importe: [0],
    medioPago: [],
    cantSegmentos: [0, [Validators.min(0), Validators.max(10)]],
    observaciones: [],
    fechaSalida: [new Date()],
    horaSalida: ['00:00'],
    fechaRegreso: [new Date()],
    horaRegreso: ['00:00'],
    motivoViaje: [],
    tipoTransporte: [],
    tarjetaGas: [false],
    TAG: [false],
    tTNumTaxis: [0],
    tTTransPublico: [0],
    hospedaje: [0],
    alimentos: [220],
    otrosDesc: [],
    otrosCant: [],
    empleados: this.fb.array([]),
    empleadosBeneficiario: this.fb.array([]),
    segmentos: this.fb.array([]),
    segmentosPorcentaje: this.fb.array([]),
    beneficiario: [],
    banco: [],
    cuenta: []
  });


   get empleados() {
    return this.formViaticos.get('empleados') as FormArray;
  }

  get empleadosBeneficiario() {
    return this.formViaticos.get('empleadosBeneficiario') as FormArray;
  }

  get segmentos() {
    return this.formViaticos.get('segmentos') as FormArray;
  }

  get segmentosPorcentaje() {
    return this.formViaticos.get('segmentosPorcentaje') as FormArray;
  }

  fechaMin = new Date();
  fechaMax = new Date();


  plazas: Resp[] = [];
  centros: Resp[] = [];
  estados: Estado[] = [];
  municipioOrigen: Municipio[] = [];
  municipioDestino: Municipio[] = [];
  coloniaOrigen: Colonia[] = [];
  coloniaDestino: Colonia[] = [];

  medioPago: MedioPago[] = [];
  transporte: Resp[] = [];
  datosBancarios = false;
  transportePublico = false;
  transportePrivado = false;
  segm: Segmento[] = [];
  emple: Usuario[] = [];
  clientes: string[] = [];

  prueba: Colonia[] = [];

  centrosRef = false;
  plazasRef = false;
  estadosRef = false;
  mediPagoRef = false;
  tipoTransRef = false;
  usuariosRef = false;
  segmentosRef = false;

  constructor(private dialog: MatDialog,
              private compras: ComprasService,
              private fb: FormBuilder,
              private solicitudes: SolicitudesService) { }

  ngOnInit(): void {
    this.fechaMax.setFullYear(this.fechaMin.getFullYear() + 1, 11, 31);

    this.abrirDialog('Cargando');

    this.compras.catCentro()
        .subscribe({
          next: centros => this.centros = centros,
          complete: () => {
            this.centrosRef = true;
            this.cerrarDialog();
          }
        });

    this.compras.catPlazasMc()
        .subscribe({
          next: plazas => this.plazas = plazas,
          complete: () => {
            this.plazasRef = true;
            this.cerrarDialog();
          }
        });

    this.compras.estados()
        .subscribe({
          next: estados => this.estados = estados,
          complete: () => {
            this.estadosRef = true;
            this.cerrarDialog();
          }
        });

    this.solicitudes.catMedioPagoFiltrado()
        .subscribe({
          next: medioPago => this.medioPago = medioPago,
          complete: () => {
            this.mediPagoRef = true;
            this.cerrarDialog();
          }
        });

    this.compras.catTipoTransporte()
        .subscribe({
          next: transporte => this.transporte = transporte,
          complete: () => {
            this.tipoTransRef = true;
            this.cerrarDialog();
          }
        });

    this.compras.usuarios()
        .subscribe({
          next: usuarios => this.emple = usuarios,
          complete: () => {
            this.usuariosRef = true;
            this.cerrarDialog();
          }
        });

    this.solicitudes.segmentos()
        .subscribe({
          next: seg => {
            seg.forEach(x => this.segm.push({segmento: x.segmento, nombre: x.nombre, cliente: x.cliente}));
            this.segm.forEach(x => {
              if(!this.clientes.includes(x.cliente))
                this.clientes.push(x.cliente);
            });
          },
          complete: () => {
            this.segmentosRef = true;
            this.cerrarDialog();
          }
        });

    this.formViaticos.get('gastoOperativo')?.valueChanges
        .subscribe(v => {
          let empleados = this.formViaticos.get('empleadosBeneficiados')?.value;
          let importe;

          if(v)
            importe = 180;
          else
            importe = 220;

          this.formViaticos.get('alimentos')?.setValue(importe);

          if(empleados < 0)
            this.formViaticos.get('importe')?.setValue(0);
          else if(empleados > 10)
            this.formViaticos.get('importe')?.setValue(10 * importe);
          else
            this.formViaticos.get('importe')?.setValue(empleados * importe);
        });

    this.formViaticos.get('cantSegmentos')?.valueChanges
        .subscribe(v => {
          if(v >= 0 && v < 11){
            if (v > this.segmentos.length) this.agregarSegmento()
            else if(v !=10) this.eliminarSegmento(v - 1);
            console.log(v);
          }
        });

    this.formViaticos.get('empleadosBeneficiados')?.valueChanges
        .subscribe( v => {
          if(v >= 0)
            {
              if(v > 10)
                this.formViaticos.get('importe')?.setValue(10 * this.formViaticos.get('alimentos')?.value);
              else {
                this.formViaticos.get('importe')?.setValue(v * this.formViaticos.get('alimentos')?.value);
                if(v > this.empleados.length) this.agregarEmpleado();
                else if(v != 10) this.elimiarEmpleado(v - 1);
              }
            }
          else this.formViaticos.get('importe')?.setValue(0);
        });

    this.formViaticos.get('origen')?.valueChanges
        .subscribe(v => {
          this.compras.colonias(v).subscribe(colonias => {
            this.prueba = colonias;
            console.log(this.prueba);
          });
        });

    this.formViaticos.get('medioPago')?.valueChanges
        .subscribe(medio => {
          if( medio === 'Tarjeta de Nomina' || medio === 'Tarjeta Empresarial')
            this.datosBancarios = true;
          else {
            this.datosBancarios = false;
            this.formViaticos.controls['banco'].setValue('');
            this.formViaticos.controls['cuenta'].setValue('');
          }
        });

    this.formViaticos.get('estadoOrigen')?.valueChanges
        .subscribe(v => {
          this.municipioOrigen = [];
          this.coloniaOrigen = [];
          this.formViaticos.get('municipioOrigen')?.reset('');
          this.formViaticos.get('coloniaOrigen')?.reset('');

          this.compras.municipios(v)
              .subscribe( municipios => this.municipioOrigen = municipios);
        });

    this.formViaticos.get('estadoDestino')?.valueChanges
        .subscribe(v =>{
          this.municipioDestino = [];
          this.coloniaDestino = [];
          this.formViaticos.get('municipioDestino')?.reset('');
          this.formViaticos.get('coloniaDestino')?.reset('');

          this.compras.municipios(v)
              .subscribe( municipios => this.municipioDestino = municipios);
        });

    this.formViaticos.get('municipioOrigen')?.valueChanges
        .subscribe(v =>{
          this.coloniaOrigen = [];
          this.formViaticos.get('coloniaOrigen')?.reset('');

          this.compras.colonias(v)
              .subscribe(colonias => this.coloniaOrigen = colonias);
        });

    this.formViaticos.get('municipioDestino')?.valueChanges
        .subscribe(v => {
          this.coloniaDestino = [];
          this.formViaticos.get('coloniaDestino')?.reset('');

          this.compras.colonias(v)
              .subscribe(colonias => this.coloniaDestino = colonias);
        });

    this.formViaticos.get('tipoTransporte')?.valueChanges
        .subscribe(v => {
          if(v === 'Auto de la empresa' || v === 'Auto propio'){
            this.transportePrivado = true;
            this.transportePublico = false;

            this.formViaticos.controls['tTNumTaxis'].setValue(0);
            this.formViaticos.controls['tTHospedaje'].setValue(0);
          }
          else {
            this.transportePrivado = false;
            this.transportePublico = true;

            this.formViaticos.controls['tarjetaGas'].setValue(false);
            this.formViaticos.controls['TAG'].setValue(false);
          }
        });
  }

  abrirDialog(texto: string) {
    this.dialog.open(SpinnerComponent,{
      disableClose: true,
      minHeight: '125px',
      minWidth: '125px',
      data: {
        msg: texto
      }
    });
  }

  cerrarDialog() {
    if(this.centrosRef && this.centrosRef && this.mediPagoRef && this.plazasRef
        && this.segmentosRef && this.tipoTransRef && this.usuariosRef)
      this.dialog.closeAll();
  }

  errores(campo: string): string {
    let error = this.formViaticos.get(campo)?.errors;

    if(campo === 'empleadosBeneficiados' || campo ==='cantSegmentos'){
      if(error?.['min']) return 'El valor mínimo es: 0';
      if(error?.['max']) return 'El valor máximo es: 10';
    }

    return '';
  }

  generaViatico(){
    let ben = this.formViaticos.get('beneficiario')?.value;
    console.log(this.empleados.controls[ben].value);
    console.log(this.formViaticos);
  }

  private agregarEmpleado(){
    this.empleados.push(this.fb.control(''));
    this.empleadosBeneficiario.push(this.fb.control(''));
  }

  private elimiarEmpleado(index: number){
    this.empleados.removeAt(index);
    this.empleadosBeneficiario.removeAt(index);
  }

  private agregarSegmento(){
    this.segmentos.push(this.fb.control(''));
    this.segmentosPorcentaje.push(this.fb.control(''));

    this._porcentajes();
  }

  private eliminarSegmento(index: number){
    this.segmentos.removeAt(index);
    this.segmentosPorcentaje.removeAt(index);

    this._porcentajes();
  }

  private _porcentajes(){
    let segmentos = this.segmentos.length;
    let porcentaje = 100.0 / segmentos;

    for(let i = 0; i < segmentos; i++){
      this.segmentosPorcentaje.controls[i].setValue(porcentaje.toFixed(2));
    }
  }

}
