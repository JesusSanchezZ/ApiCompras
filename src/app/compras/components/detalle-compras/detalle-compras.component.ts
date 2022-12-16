import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';

import { Producto } from '../../interfaces/solicitudes/detalleCompra/tipoSolicitud.interface';

declare const $:any;

@Component({
  selector: 'app-detalle-compras',
  templateUrl: './detalle-compras.component.html',
  styles: [
  ]
})
export class DetalleComprasComponent implements AfterViewInit {

  @ViewChild('dTable',{static: false}) dataTable: any;

  @Input() productos: Producto[] = [];

  encabezadosColumnas: string[] = ['Producto','Cantidad','Unidades','Descripción','Segmento'];

  constructor() { }

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

}
