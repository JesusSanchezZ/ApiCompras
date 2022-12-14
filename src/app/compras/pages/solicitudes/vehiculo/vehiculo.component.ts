import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { map, Observable, startWith } from 'rxjs';

import { Colonia, Estado, Municipio, Resp, Usuario } from 'src/app/compras/interfaces/solicitudes/compras/solicitudCompra.interface';

import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

import { ComprasService } from 'src/app/compras/services/compras.service';
import { SolicitudesService } from 'src/app/compras/services/solicitudes.service';

interface Segmento {
  segmento: string;
  nombre:   string;
  cliente:  string;
}

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styles: [
    `
      .radio-group {
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
export class VehiculoComponent implements OnInit {
  solicitud: FormGroup = this.fb.group({
    origen:[],
    estadoOrigen:[],
    municipioOrigen: [],
    coloniaOrigen: [],
    destino: [],
    estadoDestino: [],
    municipioDestino: [],
    coloniaDestino: [],
    solicitante: [],
    fechaSalida: [new Date()],
    fechaRegreso: [new Date()],
    tipoTransporte: [],
    tarjetaGas: [false],
    TAG: [false],
    cantidadSegmentos: [0,[Validators.min(0), Validators.max(10)]],
    pasajerosExtra: [0,[Validators.min(0),Validators.max(10)]],
    observaciones: [],
    segmentos: this.fb.array([], Validators.required),
    porcentajeSeg: this.fb.array([], Validators.required),
    pasajeros: this.fb.array([], Validators.required),
    beneficiario: this.fb.array([], Validators.required),
    pasBen: []
  });

  // nuevoSegmento: FormControl = this.fb.control('', Validators.required);
  // nuevoPasajero: FormControl = this.fb.control('', Validators.required);

  get segmentos(){
    return this.solicitud.get('segmentos') as FormArray;
  }

  get porcentajeSeg(){
    return this.solicitud.get('porcentajeSeg') as FormArray;
  }

  get pasajeros(){
    return this.solicitud.get('pasajeros') as FormArray;
  }

  get beneficiario(){
    return this.solicitud.get('beneficiario') as FormArray;
  }

  usuarioFiltro!: Observable<Usuario[]>;

  minFecha = new Date();
  opciones = false;

  plazas: Resp[] = [];
  centros: Resp[] = [];
  estados: Estado[] = [];
  municipiosOrigen: Municipio[] = [];
  coloniasOrigen: Colonia[] = [];
  municipiosDestino: Municipio[] = [];
  coloniasDestino: Colonia[] = [];
  usuarios: Usuario[] = [];
  usuarioBusq: Usuario[] = [];
  segmentosMc: Segmento[] = [];
  clientes: string[] = [];

  // Variables para el control del loader
  centrosRef = false;
  estadosRef = false;
  plazasRef = false;
  segmentosref = false;
  usuariosRef = false;

  constructor(private compras: ComprasService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private solicitudes: SolicitudesService ) { }

  ngOnInit(): void {
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

    this.compras.usuarios()
        .subscribe({
          next: usuarios => this.usuarios = usuarios,
          complete: () => {
            this.usuariosRef = true;
            this.cerrarDialog();
          }
        });

    this.solicitudes.segmentos()
        .subscribe({
          next: seg => {
            seg.forEach(x => this.segmentosMc.push({segmento: x.segmento, nombre: x.nombre, cliente: x.cliente}));
            this.segmentosMc.forEach(x => {
              if(!this.clientes.includes(x.cliente)){
                this.clientes.push(x.cliente);
              }
            });
            console.log(this.clientes);
          },
          complete: () => {
            this.segmentosref = true;
            this.cerrarDialog();
          }
        });

    this.usuarioFiltro = this.solicitud.controls['solicitante'].valueChanges
        .pipe(
          startWith(''),
          map( value => this._usuarioFiltro(value))
        );

    this.solicitudes.segmentos()
        .subscribe({
          next: x => {
            console.log(x);
            console.time('uno');
          },
          error: e => console.log(e),
          complete: () => {
            console.info('Completado');
            console.error('Error');
            console.timeEnd('uno');
          }
        })

    this.solicitud.get('cantidadSegmentos')?.valueChanges
        .subscribe( v => {
          if(v > this.segmentos.length){
            this.agregarSegmento();
          }
          else {
            this.eliminarSegmento(v - 1);
          }
          console.log(this.segmentos);
        });

    this.solicitud.get('pasajerosExtra')?.valueChanges
        .subscribe(v => {
          if(v > this.pasajeros.length){
            this.agregarPasajero();
          } else{
            this.eliminarPasajero(v);
          }
        });

    this.solicitud.get('estadoOrigen')?.valueChanges
        .subscribe( v => {
          this.municipiosOrigen = [];
          this.coloniasOrigen = [];
          this.solicitud.get('municipioOrigen')?.reset('');
          this.solicitud.get('coloniaOrigen')?.reset('');

          this.compras.municipios(v)
              .subscribe(mun => this.municipiosOrigen = mun)
        });

    this.solicitud.get('municipioOrigen')?.valueChanges
        .subscribe( v => {
          this.coloniasOrigen = [];
          this.solicitud.get('coloniaOrigen')?.reset('');

          this.compras.colonias(v)
              .subscribe(col => this.coloniasOrigen = col)
        });

    this.solicitud.get('estadoDestino')?.valueChanges
        .subscribe( v => {
          this.municipiosDestino = [];
          this.coloniasDestino = [];
          this.solicitud.get('municipioDestino')?.reset('');
          this.solicitud.get('coloniaDestino')?.reset('');

          this.compras.municipios(v)
              .subscribe( mun => this.municipiosDestino = mun);
        });

    this.solicitud.get('municipioDestino')?.valueChanges
        .subscribe( v => {
          this.coloniasDestino = [];
          this.solicitud.get('coloniaDestino')?.reset('');

          this.compras.colonias(v)
              .subscribe( col => this.coloniasDestino = col);
        });

    this.solicitud.get('tipoTransporte')?.valueChanges
        .subscribe( () => this.opciones = true);
  }

  abrirDialog(texto: string){
    this.dialog.open(SpinnerComponent,{
      disableClose: true,
      minHeight: '125px',
      minWidth: '125px',
      data: {
        msg: texto
      }
    });
  }

  cerrarDialog(){
    if(this.centrosRef && this.estadosRef && this.plazasRef && this.segmentosref && this.usuariosRef)
      this.dialog.closeAll();
  }

  registraVehiculo(): void {
    console.log(this.solicitud);
  }

  buscarUsuario(): void {
    let criterio = this.solicitud.get('solicitante')?.value;

    this.usuarioBusq = this.usuarios.filter(e => e.s_nombre.includes(criterio));
    console.log(this.usuarioBusq);
  }

  // busqueda(event: MatAutocompleteSelectedEvent): void{
  //   if(!event.option.value){
  //     return;
  //   }

  //   const usuario: Usuario = event.option.value;

  // }

  private agregarSegmento(){
    this.segmentos.push(this.fb.control('',Validators.required));
    this.porcentajeSeg.push(this.fb.control('', Validators.required));
    // this.segmentos.push(this.fb.group({nombre: this.fb.control(''), porcentaje: this.fb.control(0)}));
    this._porcentajes();
  }

  private eliminarSegmento(index: number){
    this.segmentos.removeAt(index);
    this.porcentajeSeg.removeAt(index);

    this._porcentajes();
  }

  private agregarPasajero(){
    this.pasajeros.push(this.fb.control('',Validators.required));
    this.beneficiario.push(this.fb.control(''));
  }

  private eliminarPasajero(index: number){
    this.pasajeros.removeAt(index);
    this.beneficiario.removeAt(index);
  }

  private _porcentajes(){
    let segmentos = this.segmentos.length;
    let porcentaje = 100.0 / segmentos;

    for(let i = 0; i < segmentos; i++){
      this.porcentajeSeg.controls[i].setValue(porcentaje.toFixed(2));
    }
  }

  private _usuarioFiltro(value: string): Usuario[]{
    const valorFiltrado = value.toLocaleLowerCase();

    return this.usuarios.filter(option => option.s_nombre.toLocaleLowerCase().includes(valorFiltrado));
  }

}
