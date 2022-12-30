import { Component, OnInit } from '@angular/core';

import * as toastr from 'toastr';

import { SolicitudGeneral } from 'src/app/compras/interfaces/solicitudes/solicitudGeneral.interface';

import { Tabs } from '../../solicitudes/consultar/consultar.component';

import { SolicitudesService } from 'src/app/compras/services/solicitudes.service';

@Component({
  selector: 'app-contabilidad-p',
  templateUrl: './contabilidad-p.component.html',
  styles: [
  ]
})
export class ContabilidadPComponent implements OnInit {
  tabs: Tabs[] = [
    {
      tipo: '',
      detalle: 'Solicitudes'
    }
  ]
  selected = 0;

  contabilidad: SolicitudGeneral[] = [];

  constructor(private solicitudes:SolicitudesService) { }

  ngOnInit(): void {
    this.solicitudes.solicitudGeneralTesoreria()
        .subscribe( (r : SolicitudGeneral[]) => {
          this.contabilidad = r.filter(cont => cont.s_area === 'Contabilidad');
        });
  }

  abrirDetalle(solicitud: string[]): void {
    let busqueda: Tabs = {
      tipo: solicitud[1],
      detalle: solicitud[0]
    };

    if(this.tabs.length == 5){
      toastr.error('Excedió el número máximo de pestañas','',{
        toastClass: 'mt-5'
      });
      return;
    }
    if(this.tabs.filter(e => e.detalle === busqueda.detalle).length !== 0){
      toastr.info(`La solicitud ${solicitud[0]}, ya está abierta`,'',{
        toastClass: 'mt-5'
      });
      return;
    }

    this.tabs.push(busqueda);
    this.selected = this.tabs.indexOf(busqueda);
    console.log(this.selected);
  }

  cerrarDetalle(solicitud: string[]): void {
    let detalle: Tabs = {
      tipo: solicitud[1],
      detalle: solicitud[0]
    }
    let index = this.tabs.indexOf(this.tabs.filter(e => e.detalle === detalle.detalle)[0]);

    this.tabs.splice(index, 1);

    this.selected = this.tabs.length - 1;
  }

}
