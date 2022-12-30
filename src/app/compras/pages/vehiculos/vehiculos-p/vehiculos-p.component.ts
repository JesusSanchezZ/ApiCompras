import { Component, OnInit } from '@angular/core';

import * as toastr from 'toastr';

import { SolicitudVehiculo, Tabs } from 'src/app/compras/interfaces/vehiculos/vehiculos.interface';

import { SolicitudesService } from 'src/app/compras/services/solicitudes.service';

@Component({
  selector: 'app-vehiculos-p',
  templateUrl: './vehiculos-p.component.html',
  styles: [
  ]
})
export class VehiculosPComponent implements OnInit {

  tabs: Tabs[] = [{
    tipo: '',
    detalle: 'Solicitudes'
  }];

  selected = 0;
  solicitudVehiculo: SolicitudVehiculo[] = [];

  constructor(private solicitudes: SolicitudesService) { }

  ngOnInit(): void {
    this.solicitudes.loader('Cargando')

    this.solicitudes.solicitudVehiculo()
        .subscribe({
          next: vehiculos => {
            this.solicitudVehiculo = vehiculos;
            if( this.solicitudVehiculo.length > 0)
            this.solicitudVehiculo.map( x => {
              var fecha = x.d_fecharequerimiento.split('T')[0];
              var hora = x.d_fecharequerimiento.split('T')[1];

              var fech = fecha.split('-');

              x.d_fecharequerimiento = `${fech[2]}/${fech[1]}/${fech[0]} ${hora}`;
            });
          },
          complete: () => this.solicitudes.closeLoader()
        });
  }

  abrirDetalle(solicitud: string[]) {
    if(this.tabs.length == 5){
      toastr.error('Excedió el número máximo de pestañas','',{ toastClass: 'mt-5' });
      return;
    }
    if(this.tabs.filter( e => e.detalle === solicitud[0]).length != 0){
      toastr.info(`La solicitud ${solicitud[0]}, ya está abierta`,'',{ toastClass: 'mt-5' });
      return;
    }

    this.tabs.push({tipo: solicitud[1], detalle: solicitud[0]});
    this.selected = this.tabs.length - 1;
  }

  cerrarDetalle(solicitud: string[]) {
    let index = this.tabs.indexOf(this.tabs.filter(t => t.detalle === solicitud[0])[0]);

    this.tabs.splice(index, 1);
    this.selected = this.tabs.length - 1;
  }

}
