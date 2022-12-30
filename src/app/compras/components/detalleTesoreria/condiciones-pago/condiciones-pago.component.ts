import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CondicionesPago } from 'src/app/compras/interfaces/Tesoreria/tesoreria.interface';

declare const $: any;

@Component({
  selector: 'app-condiciones-pago',
  templateUrl: './condiciones-pago.component.html',
  styles: [
  ]
})
export class CondicionesPagoComponent implements AfterViewInit {

  @ViewChild('dTable', {static: false}) dataTable: any;

  @Input() condicionesPago!: CondicionesPago[];

  encabezados: string[] = ['Opviones','Proveedor','Número de pago','Estatus','Producto','Concepto','Fecha programada', 'Penalización','Monto','% Penalización','Respuesta Microsip'];

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
