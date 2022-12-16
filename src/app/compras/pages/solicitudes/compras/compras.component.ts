import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { map, Observable, startWith, switchMap, switchScan, tap } from 'rxjs';
import * as toastr from 'toastr';
import * as _moment from 'moment';
//import {default as _rollupMoment} from 'moment';

import { CategoriaUnidades } from 'src/app/compras/interfaces/solicitudes/compras/categoriaUnidades.interface';
import { DatosUsuario } from 'src/app/compras/interfaces/solicitudes/detalleUsuario.interface';
import { EditarCompra, Producto, SolicitudCompra } from 'src/app/compras/interfaces/solicitudes/compras/solicitudCompra.interface';
import { Producto as Productos } from 'src/app/compras/interfaces/solicitudes/compras/compras.interface';
import { Segmentos } from 'src/app/compras/interfaces/solicitudes/compras/segmentos.interface';
import { TipoSolicitud } from 'src/app/compras/interfaces/solicitudes/tipoSolicitud.interface';

import { SolicitudesService } from 'src/app/compras/services/solicitudes.service';

const moment = _moment;
// Formato de fecha para datapicker
// export const FORMATO = {
//   parse: {
//     dateInput: 'L'
//   },
//   display: {
//     dateInput: 'L',
//     monthYearLabel:'MM/DD/YYYY',
//     dateA11yLabel: 'L',
//     monthYearA11yLabel: 'MM/DD/YYYY'
//   }
// }

interface Segment {
  segmento: string,
  nombre: string
}

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: [
    `
      table{
        width: 100%;
      }
    `
  ],
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps:[MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   },
  //   {provide: MAT_DATE_FORMATS, useValue: FORMATO}
  // ]
})
export class ComprasComponent implements OnInit, AfterViewInit {

  // Formulario, Generar compra
  compraForm: FormGroup = this.fb.group({
    placa: [''],
    fechaEntrega: [new Date(), [Validators.required]],
    nombreRecibe: ['',[Validators.required]],
    observaciones: ['',[Validators.required]]
  });

  // Formulario, Agregar productos a la orden de compra
  productosForm: FormGroup = this.fb.group({
    producto: ['', [Validators.required]],
    cantidad: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    unidades: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    cliente: ['', [Validators.required]],
    proyecto: ['', [Validators.required]],
    segmento: ['', [Validators.required]]
  });

  solicitudCompra: SolicitudCompra = {
    b_CompraExpress: '',
    d_fecharequerimiento: new Date().toString(),
    idTipoCosto: '2',
    n_cantidadsegmentos: '0',
    Productos: [],
    s_NombreRecibe: '',
    s_Observaciones: '',
    s_placa: ''
  }

  fechaMin: Date = new Date();
  fechaMax!: Date;

  panelOpenState1 = true;

  // definición para busqueda de productos
  filteredOptions!: Observable<Productos[]>;

  solicitudEditar!: any;
  editar = false;

  // Refacción vehicular
  refVe = false;

  // Variables solicitud de compra
  productos: Producto[] = [];
  productosP: Producto[] = [];
  productoAgregar: Producto = {
  producto:                '',
  n_Cantidad:              '1',
  s_Unidad:                '',
  s_ObservacionesProducto: '',
  s_Segmento:              '',
  idProducto:              '0',
 };

 tipoSolicitud: TipoSolicitud = {
  accion: 'DatosUsuario',
  usuario: '66940',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IjY2OTQwIiwiSUQiOiI2Njk0MCIsIm5iZiI6MTY2Mjc0MTgwNCwiZXhwIjoxNjYyNzc3ODA0LCJpYXQiOjE2NjI3NDE4MDQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTU0NjQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjU1NDY0In0.0ksc-I66gpJORSflwF1WU7Tl_ipk01TaCR_9S6YIUcc'
 };

  datosUsuario!: DatosUsuario[];
  productosSolicitados: Productos[] = [];
  unidades: CategoriaUnidades[] = [];
  segmentosGene: Segmentos[] = [];
  clientes: string[] = [];
  proyectos: string[] = [];
  segmentos: Segment[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private solicitudes: SolicitudesService,
              private fb: FormBuilder,
              private router: Router)
  {
    const anioActual = new Date().getFullYear();
    this.fechaMax = new Date( anioActual + 1, 11,31);
    this.activatedRoute.params.pipe(
      switchMap( param => this.solicitudes.detalleCompraEd([param['id'], param['tipo']]))
    ).subscribe( solicitud => {
      this.solicitudEditar = solicitud;
    } );
  }

  ngAfterViewInit(): void {
    this.edita();
  }

  ngOnInit(): void {
    //toastr.info(moment(new Date()).format('DD/MM/YYYY'));

    // Filtra los productos en el formulario Productos
    this.filteredOptions = this.productosForm.controls['producto'].valueChanges.pipe(
      startWith(''),
      map( value => this._filter(value)),
    );

    this.solicitudes.datosUsuario()
        .subscribe( datosUsuario => this.datosUsuario = datosUsuario);

    this.solicitudes.productos()
        .subscribe( productos => this.productosSolicitados = productos);

    this.solicitudes.unidades()
        .subscribe( unidades => this.unidades = unidades);

    this.solicitudes.segmentos()
        .subscribe( segmentos => {
          this.segmentosGene = segmentos;

          this.segmentosGene.map( el => {
            if(!this.clientes.includes(el.cliente)){
              this.clientes.push(el.cliente);
            }
          });

        });


    this.productosForm.get('cliente')?.valueChanges
        .subscribe((v)=> {
          this.segmentos = [];
          this.proyectos = [];
          this.productosForm.get('proyecto')?.reset('');
          this.productosForm.get('segmento')?.reset('');

          this.segmentosGene.forEach( el => {
            if(el.cliente === v){
              if(!this.proyectos.includes(el.proyecto))
                this.proyectos.push(el.proyecto);
            }
          });
        });

    this.productosForm.get('proyecto')?.valueChanges
        .subscribe(() => {
          this.segmentos = [];
          this.productosForm.get('segmento')?.reset('');

          this.segmentosGene.map( el => {
            if( this.productosForm.get('proyecto')?.value === el.proyecto) {
              this.segmentos.push({segmento:el.segmento, nombre: el.nombre});
            }
          });
        });

  }

  // Mensajes de error al validar formularios
  productoError(campo: string) : string {
    const error = this.productosForm.get(campo)?.errors;

    if( campo === 'cantidad'){
      if( error?.['min']) return 'La cantidad mínima es de 1';
      if(error?.['max']) return 'La cantidad máxima es de 10'
    }

    if( error?.['required']) return 'Este campo es requerido';

    return '';
  }

  compraError(campo: string) : string {
    const error = this.compraForm.get(campo)?.errors;

    if(campo === 'fechaEntrega' && error?.['matDatepickerMin']){
      if(this.editar){
        return '';
      } else {
        return 'Ingrese una fecha válida'
      }
    }
    if(error?.['required']) return 'Este campo es requerido';
    return ''
  }

  edita(): void {
    setTimeout(() => {
      console.log(this.solicitudEditar);
      if(this.solicitudEditar.respuesta === 'No se obtuvo respuesta' ) {}
      else {
        this.editar = true;
        this.solicitudEditar[0].Productos.forEach(
          (producto: {
            idProducto: any;
            n_Cantidad: string;
            producto: any;
            s_ObservacionesProducto: any;
            s_Segmento: any;
            s_Unidad: any;
          }) => {
            let p: Producto = {
              idProducto: producto.idProducto,
              n_Cantidad: producto.n_Cantidad,
              producto: producto.producto,
              s_ObservacionesProducto: producto.s_ObservacionesProducto,
              s_Segmento: producto.s_Segmento,
              s_Unidad: producto.s_Unidad,
            };

            this.productosP.push(p);
          }
        );
        this.productos = this.productosP;

        const fecha: string[] = this.solicitudEditar[0].d_fecharequerimiento.split('/');

        console.log( new Date(`${fecha[0]}/${fecha[1]}/${fecha[2]}`));
        console.log(this.solicitudEditar[0].d_fecharequerimiento);

        this.compraForm.get('placa')?.reset( this.solicitudEditar[0].s_placa);
        this.compraForm.get('fechaEntrega')?.reset(new Date(`${fecha[0]}/${fecha[1]}/${fecha[2]}`));
        this.compraForm.get('nombreRecibe')?.reset( this.solicitudEditar[0].s_NombreRecibe);
        this.compraForm.get('observaciones')?.reset(this.solicitudEditar[0].s_Observaciones);
      }
    }, 1000);
  }

  agregarProducto():void {
    if(this.productosForm.invalid) return ;

    // console.log(this.productosForm.get('producto')?.value);
    var busqueda = this.productosSolicitados.filter(x => x.s_NombreProducto == this.productosForm.get('producto')?.value);
    if(busqueda.length == 0){
      this.productosForm.get('producto')?.reset('');
      toastr.error('El producto no está registrado','',{
        toastClass: 'mt-5'
      });
      return;
    }

    const producto: Productos[] = this.productosSolicitados.filter( el => el.s_NombreProducto === this.productosForm.get('producto')?.value);

    this.productoAgregar = {
      producto: this.productosForm.get('producto')?.value,
      n_Cantidad: this.productosForm.get('cantidad')?.value.toString(),
      s_Unidad: this.productosForm.get('unidades')?.value,
      s_ObservacionesProducto: this.productosForm.get('descripcion')?.value,
      s_Segmento: this.productosForm.get('segmento')?.value,
      idProducto: "0"
    };

    this.productosP.push(this.productoAgregar);

    this.productosForm.reset({
      producto: ' ',
      cantidad: 1,
      unidades: ' ',
      descripcion: ' ',
      cliente: ' ',
      proyecto: ' ',
      segmento: ' '
    });

    this.productos = [];
    setTimeout(() => { this.productos = this.productosP},200);

    console.log(this.productosP);
  }

  eliminarProducto(producto: string[]):void {
    let indice = this.productosP.findIndex(x => x.producto === producto[0] && x.n_Cantidad === producto[1] && x.s_Unidad === producto[2]);

    this.productosP.splice(indice, 1);

    this.productos = [];
    setTimeout(()=> this.productos = this.productosP, 100);
  }

  generaCompra(): void {
    if(this.editar){
      let editarCompra: EditarCompra ={
        b_CompraExpress: this.solicitudEditar[0].b_CompraExpress,
        d_fecharequerimiento: moment(this.solicitudEditar[0].d_fecharequerimiento).format('MM/DD/YYYY'),
        idsolicitud: this.solicitudEditar[0].idsolicitud,
        idTipoCosto: this.solicitudEditar[0].idTipoCosto,
        n_cantidadsegmentos: this.solicitudEditar[0].n_cantidadsegmentos,
        Productos: [],
        s_NombreRecibe: this.solicitudEditar[0].s_NombreRecibe,
        s_Observaciones: this.solicitudEditar[0].s_Observaciones,
        s_placa: this.solicitudEditar[0].s_placa,
      };

      this.solicitudEditar[0].Productos.forEach((p: { idProducto: any; n_Cantidad: any; producto: any; s_ObservacionesProducto: any; s_Segmento: any; s_Unidad: any; $$hashKey: any; }) => {
        let producto: Producto = {
          idProducto: p.idProducto,
          n_Cantidad: p.n_Cantidad,
          producto: p.producto,
          s_ObservacionesProducto: p.s_ObservacionesProducto,
          s_Segmento: p.s_Segmento,
          s_Unidad: p.s_Unidad,
          $$hashKey: p.$$hashKey
        }
        editarCompra.Productos.push(producto);
      });
      let cambio = false;

      if(this.refVe){
        if(editarCompra.s_placa !== this.compraForm.get('placa')?.value){
          editarCompra.s_placa =this.compraForm.get('placa')?.value;
          cambio = true;
        }
      }

      if(editarCompra.s_NombreRecibe !== this.compraForm.get('nombreRecibe')?.value){
        editarCompra.s_NombreRecibe = this.compraForm.get('nombreRecibe')?.value;
        if(!cambio) cambio = true;
      }

      if(editarCompra.s_Observaciones !== this.compraForm.get('observaciones')?.value){
        editarCompra.s_Observaciones = this.compraForm.get('observaciones')?.value;
        if(!cambio) cambio = true;
      }
      if(this.solicitudEditar[0].d_fecharequerimiento !== moment(this.compraForm.get('fechaEntrega')?.value).format('M/D/YYYY hh:mm:ss A')){
        editarCompra.d_fecharequerimiento = moment(this.compraForm.get('fechaEntrega')?.value).format('MM/DD/YYYY');
        if(!cambio) cambio = true;
      }

      let val = false;

      if(editarCompra.Productos.length === this.productos.length){
        editarCompra.Productos.forEach((p)=>{
          this.productos.forEach( e => {
            if( p.n_Cantidad === e.n_Cantidad && p.producto === e.producto
                && p.s_ObservacionesProducto === e.s_ObservacionesProducto
                && p.s_Unidad === e.s_Unidad ) val = true;
          });
        });
      } else {
        editarCompra.Productos = this.productos;
        if(!cambio) cambio = true;
      }

      if(val){
        if(!cambio){
          toastr.success('Solicitud actualizada','',{
            toastClass: 'mt-5'
          });
          this.router.navigateByUrl('/compras/solicitudes');
        } else {
          console.log('Iguales');
          this.solicitudes.actualizaSolicitud(editarCompra)
              .subscribe( resp => {
                if(resp.success === 'true'){
                  toastr.success('Solicitud actualizada',resp.payload,{
                    toastClass: 'mt-5'
                  });
                } else {
                  toastr.error(resp.mensaje,'',{toastClass: 'mt-5'});
                }
                this.router.navigateByUrl('/compras/solicitudes');
              });
        }
      } else {
        editarCompra.Productos = this.productos;
        console.log('Diferentes');
        this.solicitudes.actualizaSolicitud(editarCompra)
            .subscribe(resp => {
              if(resp.success === 'true'){
                toastr.success('Solicitud actualizada',resp.payload,{
                  toastClass: 'mt-5'
                });
              } else {
                toastr.error(resp.mensaje,'',{toastClass: 'mt-5'});
              }
              this.router.navigateByUrl('/compras/solicitudes');
            });
        //console.log(editarCompra);
      };

    } else {
      // console.log(this.compraForm.get('fechaEntrega')?.value);
      // console.log(moment(this.compraForm.get('fechaEntrega')?.value).format('MM/DD/YYYY'));
      // return;

      if (this.productosP.length == 0) {
        toastr.error('Agregue al menos un producto', '', {
          toastClass: 'mt-5',
        });
        return;
      }

      if (this.refVe) {
        if (this.compraForm.get('placa')?.value === '') {
          toastr.error('Agregue el número de placa', '', {
            toastClass: 'mt-5',
          });
          return;
        }
      } else {
        if (this.compraForm.get('placa')?.value !== '') {
          this.compraForm.get('placa')?.reset('');
        }
      }

      if (this.compraForm.invalid) return;

      this.solicitudCompra.Productos = this.productosP;
      this.solicitudCompra.d_fecharequerimiento = moment(
        this.compraForm.get('fechaEntrega')?.value
      ).format('DD/MM/YYYY');
      this.solicitudCompra.s_NombreRecibe =
        this.compraForm.get('nombreRecibe')?.value;
      this.solicitudCompra.s_Observaciones =
        this.compraForm.get('observaciones')?.value;
      this.solicitudCompra.s_placa = this.compraForm.get('placa')?.value;

      // console.log(this.solicitudCompra);
      // return;

      // console.log(this.solicitudCompra);
      this.solicitudes
        .generaOrdenCompra(this.solicitudCompra)
        .subscribe((resp) => {
          // console.log(resp);
          if (resp.success === 'true') {
            toastr.success(resp.mensaje, resp.payload, { toastClass: 'mt-5' });
            setTimeout(() => {
              this.router.navigateByUrl('/compras/solicitudes');
            }, 1000);
          } else {
            toastr.error('No se pudo generar la compra', '', {
              toastClass: 'mt-5',
            });
          }
        });
    }
  }

  private _filter(value: string): Productos[] {
    const filterValue = value.toLowerCase();

    return this.productosSolicitados.filter( option => option.s_NombreProducto.toLowerCase().includes(filterValue)) || '';
  }

}
