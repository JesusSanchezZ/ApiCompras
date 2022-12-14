import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SolicitudGeneral } from '../../interfaces/solicitudes/solicitudGeneral.interface';
import { SolicitudesService } from '../../services/solicitudes.service';

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

  constructor(private solicitudes: SolicitudesService) { }

  ngOnInit(): void {
    this.actualiza();
  }

  nuevoDetalle(solicitud: string[]){
    this.detalleHijo.emit(solicitud);
  }

  actualiza(): void{
    this.solicitudes.solicitudGeneral()
        .subscribe( resp => this.solicitud = resp );
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
