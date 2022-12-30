import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

import { HistoEtapaSolicitud } from '../../interfaces/solicitudes/historicoEtapaSolicitud.interface';
import { TipoSolicitud } from '../../interfaces/solicitudes/detalleCompra/tipoSolicitud.interface';

import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styles: [
  ]
})
export class DetalleSolicitudComponent implements OnInit {
  @Input() solicitud!: string[];
  @Output() cerrarSolicitud: EventEmitter<string[]> = new EventEmitter();

  historicoEtapasSolicitud: HistoEtapaSolicitud[] = [];
  detalleSolicitud: TipoSolicitud | null = null;



  abierto = true;

  constructor(private dialog: MatDialog,
              private solicitudes: SolicitudesService ) { }

  ngOnInit(): void {
    this.dialog.open(SpinnerComponent,{
      disableClose: true,
      minHeight: '125px',
      minWidth: '125px',
      data: {
        msg: 'Cargando'
      }
    });

    this.solicitudes.historicoEtapaSolicitud(this.solicitud[0])
        .subscribe( resp => {
          this.historicoEtapasSolicitud = resp;
          // console.log(resp);
        });

    this.solicitudes.detalleCompra(this.solicitud)
        .subscribe({
          next: resp => {
            this.detalleSolicitud = resp[0];
            console.log(resp);
            console.log(this.detalleSolicitud);
          },
          complete: () => this.dialog.closeAll()
        });
  }

  cerrar(solicitud: string[]):void{
    this.cerrarSolicitud.emit(solicitud);
  }

}
