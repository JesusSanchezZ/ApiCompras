import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

import * as fs from 'file-saver';
import * as toastr from 'toastr';

import { CotizacionProductos } from 'src/app/compras/interfaces/Tesoreria/tesoreria.interface';

import { SolicitudesService } from 'src/app/compras/services/solicitudes.service';

declare const $: any;

@Component({
  selector: 'app-cotizacion-productos',
  templateUrl: './cotizacion-productos.component.html',
  styles: [
  ]
})
export class CotizacionProductosComponent implements AfterViewInit {

  @ViewChild('dTable', {static: false}) dataTable: any;

  @Input() cotizacionProductos!: CotizacionProductos[];

  encabezados: string[] = ['Opciones', 'Producto','Proveedor','Cantidad','Precio c/u','Descuento','Iva','Precio total', 'Total','Observaciones'];

  constructor(private solicitudes: SolicitudesService) { }

  ngAfterViewInit(): void {
    $(this.dataTable.nativeElement).DataTable({
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-MX.json'
      },
      info: false,
      ordering: false,
      paging: false,
      searching: false
    });
  }

  obtenerArchivo(archivo: string) {
    var nombre = archivo.split('?')[1].split('&')[1].split('=')[1];

    this.solicitudes.getFile(archivo)
        .then( resp => resp.blob())
        .then( arch => {
          if( arch !== '{"respuesta":"Error del servidor"}')
          // window.open(URL.createObjectURL(arch),'_blank');
            fs.saveAs(arch, nombre);
          else
            toastr.error(arch,'',{
              toastClass: 'mt-5'
            })
        })
        .catch( err => console.log(err));
  }
}
