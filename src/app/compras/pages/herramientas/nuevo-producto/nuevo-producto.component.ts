import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as toastr from 'toastr';

import { CuentaCont, Imp, ImpuestoArt, NuevoProducto, Resp, UnidadMedida } from 'src/app/compras/interfaces/solicitudes/compras/solicitudCompra.interface';

import { ComprasService } from 'src/app/compras/services/compras.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styles: [
    `
      .radio-group {
        display: flex;
        flex-direction: column;
        margin: 15px 0;
        align-items: flex-start
      }
    `
  ]
})
export class NuevoProductoComponent implements OnInit {
  FormProducto: FormGroup = this.fb.group({
    empresa: [, Validators.required],               // s_Empresa
    nombreProducto: ['', Validators.required],      // s_NombreProducto
    unidadVenta: ['', Validators.required],         // s_UnidadVenta
    impuestos: ['', Validators.required],           // s_IVA
    tipoProducto: ['', Validators.required],        // idTipoProducto
    cuentaContable: [''],                           // idCtaContable
    termCuentCont: ['', Validators.required],       // Utilizado para buscar cuentaContable
    contenido: [1, [Validators.required,
                  Validators.min(1),
                  Validators.max(10)]],             // s_Contenido
    claveSat: [''],                                 // s_ClaveSAT
    almacenaje: [''],                               // C_Almacenaje
    juego: [''],                                    // C_Juego
    pesarBascula: [''],                             // C_PesarBascula
    pesoUnitario: [''],                             // s_PesoUnitario
    pedimento: [''],                                // C_Pedimento
    condPedimento:['S'],                            // s_Importado
    arancel: [''],                                  // s_Arancel
    seguimientoUnidad: [''],                        // S_Unidad
    factorVenta: [''],                              // C_FactorVenta
    numFactorVenta: [''],                           // s_FactorVenta
    precioVariable: [''],                           // C_PrecioVariable
    imprimirVenta: [''],                            // S_ImprimirFormaVenta
    imprimirCompra: [''],                           // S_ImprimirFormaCompra
    datosParticulares: ['']                         // s_DatosParticulares
  });

  empresas: Resp[] = [];
  tipoProductos: Resp[] = [];
  cuentasContables: CuentaCont[] = [];
  cuentaBusqueda: CuentaCont[] = [];
  cuenta = false;
  impuestosArticulos: ImpuestoArt[] = [];
  unidadesMedida: UnidadMedida[] = [];

  // Solicitud al servidor
  nuevoProducto: NuevoProducto = {
    Arancel: '',
    CuentaContable: '',
    idCtaContable: '',
    idTipoProducto: '',
    Impuestos: [],
    NombreEmpresa: '',
    s_ClaveSAT: '',
    s_Contenido: '',
    s_DatosParticulares: '',
    s_Empresa: 0,
    s_FactorVenta: '',
    s_Importado: '',
    s_NombreProducto: '',
    s_pesarBascula: '',
    s_UnidadVenta: ''
  };

  constructor(private compras: ComprasService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.compras.catEmpresas()
        .subscribe( resp => this.empresas = resp);

    this.compras.catTipoProducto()
        .subscribe(resp => this.tipoProductos = resp);

    this.FormProducto.get('termCuentCont')?.valueChanges
        .subscribe( t => {
          if( t === ''){
            this.cuentaBusqueda = this.cuentasContables
          }
          else{
            this.FormProducto.controls['cuentaContable'].setValue('');
            //let valor = t.toString();
            let valores = t.toString().split(' - ');
            if(valores.length > 1 ){
              this.cuentaBusqueda = this.cuentasContables.filter(x => x['@Nombre'].toLowerCase().includes(valores[1]) || x['@Cuenta'].includes(valores[0]));
            } else {
              this.cuentaBusqueda = this.cuentasContables.filter(x => x['@Nombre'].toLowerCase().includes(t) || x['@Cuenta'].includes(t));
            }
          }
        });

    this.FormProducto.get('empresa')?.valueChanges
        .subscribe( id => {
          this.cuentasContables = [];
          this.impuestosArticulos = [];
          this.unidadesMedida = [];
          this.FormProducto.get('unidadVenta')?.reset('');
          this.FormProducto.get('impuestos')?.reset('');
          this.FormProducto.get('cuentaContable')?.reset('');

          var empresa = this.empresas.filter(x => x.id == id)[0].valores;
          // console.log(empresa[0].valores);

          this.compras.cuentasContables(id)
              .subscribe(cuentCont => {
                this.cuentasContables = cuentCont['CuentasContables']?.['CuentaContable'] || [];
                this.cuentaBusqueda = this.cuentasContables;
              });

          this.compras.impuestosArticulos(empresa)
              .subscribe( impArt => this.impuestosArticulos = impArt['ImpuestosArticulos']?.['ImpuestoArticulo'] || [] );

          this.compras.unidadesMedida(empresa)
              .subscribe( unMed => this.unidadesMedida = unMed['UnidadesMedida']?.['UnidadMedida'] || []);
        });

  }

  enviarFormulario(): void {
    if(this.FormProducto.invalid){
      toastr.error('Formulario incompleto','',{toastClass:'mt-5'});
      return;
    }

    // Busca la cuenta contables por el id
    if(!this.FormProducto.get('cuentaContable')?.value){
      toastr.error('Cuenta contable no válida','',{toastClass: 'mt-5'});
      return;
    }
    let ctaCont = this.cuentasContables.filter( x => x['@Id'] === this.FormProducto.get('cuentaContable')?.value)[0]['@Cuenta'] || '';

    // Obtiene el nombre del a empresa por el id
    let nomEmpresa = this.empresas.filter( e => e.id === this.FormProducto.get('empresa')?.value)[0].valores;

    let iva: Imp[] = [];
    let impuestos: string[] = this.FormProducto.get('impuestos')?.value;

    impuestos.forEach( x => iva.push({s_Impuestos: x}));

    this.nuevoProducto.Arancel = this.FormProducto.get('arancel')?.value;
    this.nuevoProducto.CuentaContable = ctaCont;
    this.nuevoProducto.idCtaContable = this.FormProducto.get('cuentaContable')?.value;
    this.nuevoProducto.idTipoProducto = this.FormProducto.get('tipoProducto')?.value;
    this.nuevoProducto.Impuestos = iva;
    this.nuevoProducto.NombreEmpresa = nomEmpresa;
    this.nuevoProducto.s_ClaveSAT = this.FormProducto.get('claveSat')?.value;
    this.nuevoProducto.s_Contenido = this.FormProducto.get('contenido')?.value.toString();
    this.nuevoProducto.s_DatosParticulares = this.FormProducto.get('datosParticulares')?.value;
    this.nuevoProducto.s_Empresa = this.FormProducto.get('empresa')?.value;
    this.nuevoProducto.s_FactorVenta = this.FormProducto.get('numFactorVenta')?.value;
    this.nuevoProducto.s_Importado = this.FormProducto.get('condPedimento')?.value;
    this.nuevoProducto.s_NombreProducto = this.FormProducto.get('nombreProducto')?.value;
    this.nuevoProducto.s_pesarBascula = this.FormProducto.get('pesarBascula')?.value;
    this.nuevoProducto.s_UnidadVenta = this.FormProducto.get('unidadVenta')?.value;

    // console.log(this.nuevoProducto);
    // return;

    // this.compras.nuevoProducto(this.nuevoProducto)
    //     .subscribe( (resp) => {
    //       // console.log(resp);
    //       if(resp.success.toString() === 'true'){
    //         toastr.success('Producto agredado','',{
    //           toastClass: 'mt-5'
    //         });
    //         this.router.navigateByUrl('/compras/solicitudes/compras');
    //       }
    //       else if(resp.success.toString() === 'false'){
    //         toastr.error('No se pudo agregar el producto','',{
    //           toastClass: 'mt-5'
    //         });
    //       }
    //       else {
    //         toastr.error('Error del servidor','',{
    //           toastClass: 'mt-5'
    //         });
    //       }
    //     });

    this.compras.nuevoProducto(this.nuevoProducto)
        .subscribe({
          next: resp =>{
            if(resp.success.toString() === 'true'){
              toastr.success('Producto agregado','',{ toastClass: 'mt-5'});
              this.router.navigateByUrl('/compras/solicitudes/compras');
            }
            else if(resp.success.toString() === 'false'){
              toastr.error('No se pudo agregar el producto','',{toastClass:'mt-5'});
            }
          },
          error: e => {
            toastr.error(e,'Error del servidor',{toastClass:'mt-5'})
          }
        });

    // console.log(this.FormProducto.value);
    // console.log(this.nuevoProducto);
  }

  cuentaSeleccionada(event: MatAutocompleteSelectedEvent){
    //console.log(event.option.value);
    if(!event.option.value){
      this.FormProducto.controls['cuentaContable'].setValue('');
      this.cuenta = false;
      return;
    }


    this.cuenta = true;
    //this.cuentaBusqueda = [];
    //this.cuentaBusqueda.push(event.option.value);
    this.FormProducto.controls['termCuentCont'].setValue(event.option.value['@Cuenta'] + ' - ' + event.option.value['@Nombre']);
    this.FormProducto.controls['cuentaContable'].setValue( event.option.value['@Id']);
  }

  // Mensajes de error al validar formulario
  formError(campo: string) : string {
    const error = this.FormProducto.get(campo)?.errors;

    if( campo === 'contenido'){
      if(error?.['min']) return 'Contenido mínimo 1';
      if(error?.['max']) return 'Contenimo máximo 10';
    }

    if(error?.['required']) return 'Este campo es requerido';

    return '';
  }

}
