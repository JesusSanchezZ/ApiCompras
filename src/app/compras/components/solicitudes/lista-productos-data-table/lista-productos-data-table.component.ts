import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Producto } from 'src/app/compras/interfaces/solicitudes/compras/solicitudCompra.interface';

declare const $:any;

@Component({
  selector: 'app-lista-productos-data-table',
  templateUrl: './lista-productos-data-table.component.html',
  styles: [
  ]
})
export class ListaProductosDataTableComponent implements AfterViewInit {

  @ViewChild('dTable', {static:false}) dataTable: any;

  @Input() productos!: Producto[];

  @Output() eliminarProducto: EventEmitter<string[]> = new EventEmitter();

  encabezadosColumnas: string[] = ['','Producto','Cantidad','Unidades','Descripción','Segmento'];

  constructor() { }

  ngAfterViewInit(): void {
    $(this.dataTable.nativeElement).DataTable({
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-MX.json'
      },
      searching: false,
      ordering: false,
      paging: false,
      info: false
    });
  }

  elimina(producto: string[]):void {
    this.eliminarProducto.emit(producto);
  }

}
