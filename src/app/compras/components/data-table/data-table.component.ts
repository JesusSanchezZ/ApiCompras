import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import * as toastr from 'toastr';

import { SolicitudGeneral } from '../../interfaces/solicitudes/solicitudGeneral.interface';

import { SolicitudesService } from '../../services/solicitudes.service';

declare const $: any;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styles: [
  ]
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild('dTable', {static: false}) dataTable: any;
  @ViewChild('dTable1',{static: false}) dT: any;

  @Input() solicitudGeneral!: SolicitudGeneral[];
  @Input() tipo: string = 'solicitud';

  @Output() actualiza: EventEmitter<any> = new EventEmitter();
  @Output() detalle: EventEmitter<string[]> = new EventEmitter();
  @Output() editar: EventEmitter<string[]> = new EventEmitter();
  @Output() elimiar: EventEmitter<string> = new EventEmitter();

  constructor(private solicitudes: SolicitudesService,
              private router: Router) { }

  ngAfterViewInit(): void {
    $(this.dataTable.nativeElement).DataTable({
      lengthMenu: [
        [3,5,10],
        [3,5,10]
      ],
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-MX.json'
      },
      // scrollX: true,
      // ordena la segunda columna de la tabla de manera descendente
      order: [[6,'desc']]
    });
  }

  ngOnInit(): void {

  }

  detalles(solicitud: string[]){
    this.detalle.emit(solicitud);
  }

  edita(solicitdud: string[]){
    this.editar.emit(solicitdud);
  }

  eliminar(solicitud: string){
    console.log(solicitud);

    this.solicitudes.eliminarSolicitud(solicitud)
        .subscribe( resp =>{
          if(resp.success === 'true'){
            toastr.success(resp.mensaje);
            setTimeout(() => {
              this.actualiza.emit();
              console.log('Navegando');
            }, 1000);
          } else {
            toastr.error(resp.mensaje);
          }
        });
  }

}
