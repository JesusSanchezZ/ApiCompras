import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import * as toastr from 'toastr';

import { SolicitudGeneral } from '../../interfaces/solicitudes/solicitudGeneral.interface';
import { SolicitudesService } from '../../services/solicitudes.service';

import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';


@Component({
  selector: 'app-solicitudes-so',
  templateUrl: './solicitudes-so.component.html',
  styles: [
  ]
})
export class SolicitudesSoComponent implements OnInit {
  @Output() detalleHijo: EventEmitter<string[]> = new EventEmitter();
  @Output() eliminar: EventEmitter<string> = new EventEmitter();

  solicitud: SolicitudGeneral[] = [];

  constructor(private dialog: MatDialog,
              private solicitudes: SolicitudesService) { }

  ngOnInit(): void {
    this.dialog.open(SpinnerComponent, {
      disableClose: true,
      minHeight: '125px',
      minWidth: '125px',
      data: {
        msg: 'Cargando'
      }
    });

    this.actualiza();
  }

  nuevoDetalle(solicitud: string[]){
    this.detalleHijo.emit(solicitud);
  }

  actualiza(): void{
    this.solicitudes.solicitudGeneral()
        .subscribe({
          next: resp => this.solicitud = resp,
          error:(err) => {
            toastr.error('No se pudieron cargar los datos','',{
              toastClass: 'mt-5'
            });
            console.log(err);
          },
          complete: () => this.dialog.closeAll()
        });
  }

  actualizaDatos(): void {
    this.solicitud = [];
    this.actualiza();
  }

  edita(solicitud: string[]){
    this.solicitudes.detalleCompraEd(solicitud)
        .subscribe( resp => console.log(resp));
  }

}
