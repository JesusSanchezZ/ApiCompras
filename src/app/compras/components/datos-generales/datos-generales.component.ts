import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { DatosUsuario } from '../../interfaces/solicitudes/detalleUsuario.interface';
import { TipoSolicitud } from '../../interfaces/solicitudes/tipoSolicitud.interface';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styles: [
  ]
})
export class DatosGeneralesComponent implements OnInit, AfterViewInit {

  datosUsuario!: DatosUsuario;
  datosListos = false;

  panelOpenState = false;

  constructor(private solicitudes: SolicitudesService) { }

  ngAfterViewInit(): void {
    this.obtenerDatos();
  }

  ngOnInit(): void {

  }

  obtenerDatos():void {

    this.solicitudes.datosUsuario()
        .subscribe(
          (resp) => {
            //console.log(resp[0].s_claveEmpleado);

            this.datosUsuario = resp[0];
            this.datosListos = true;
          }
        )
    // console.log(((this.usuario.getUsuario?.token)?.split(';')[0])?.split('=')[1]);
    // console.log((this.usuario.getUsuario?.payload)?.split('.')[0]);
  }
}
