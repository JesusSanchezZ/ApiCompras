import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { SolicitudVehiculo } from '../../interfaces/vehiculos/vehiculos.interface';

declare const $:any;

@Component({
  selector: 'app-data-table-vehiculos',
  templateUrl: './data-table-vehiculos.component.html',
  styles: [
  ]
})
export class DataTableVehiculosComponent implements AfterViewInit {

  @ViewChild('dTable', {static: false}) dataTable: any;

  @Input() vehiculos: SolicitudVehiculo[] = [];

  @Output() detalle: EventEmitter<string[]> = new EventEmitter();

  encabezados = ['Opciones','Id','Nombre Empleado','Dilación','Tipo Solicitud','Placa vehiculo', 'Fecha','Etapa'];

  constructor() { }

  ngAfterViewInit(): void {
    $(this.dataTable.nativeElement).DataTable({
      lengthMenu: [
        [3,5,10],
        [3,5,10]
      ],
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-MX.json'
      },
      order:[[7,'desc']]
    });
  }

  detalles(solicitud: string[]){
    this.detalle.emit(solicitud);
  }

}
