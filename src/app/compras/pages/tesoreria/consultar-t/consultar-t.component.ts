import { Component, OnInit } from '@angular/core';

import * as toastr from 'toastr';

import { SolicitudGeneral } from 'src/app/compras/interfaces/solicitudes/solicitudGeneral.interface';
import { Tabs } from '../../solicitudes/consultar/consultar.component';

import { SolicitudesService } from 'src/app/compras/services/solicitudes.service';

@Component({
  selector: 'app-consultar-t',
  templateUrl: './consultar-t.component.html',
  styles: [
  ]
})
export class ConsultarTComponent implements OnInit {
  tabs: Tabs[] = [{
    tipo: '',
    detalle: 'Solicitudes'
  }];

  selected = 0;
  solicitudesGenerales: SolicitudGeneral[] = [];

  constructor(private solicitudes: SolicitudesService) { }

  ngOnInit(): void {
    this.solicitudes.solicitudGeneralTesoreria()
        .subscribe( consultar => this.solicitudesGenerales = consultar.filter(solT => solT.s_area === 'Tesoreria'));
  }

  abrirDetalle(detalle: string[]): void {
    if(this.tabs.length == 5){
      toastr.error('Excedió el númeor máximo de pestañas','',{ toastClass: 'mt-5' });
      return;
    }
    if(this.tabs.filter(e => e.detalle === detalle[0]).length !== 0){
      toastr.info(`La solicitud ${detalle[0]}, ya está abierta`,'',{toastClass: 'mt-5' });
      return;
    }

    this.tabs.push({tipo: detalle[1], detalle: detalle[0]});
    this.selected = this.tabs.length - 1;
  }

  cerrarDetalle(solicitud: string[]): void {
    let index = this.tabs.indexOf(this.tabs.filter(t => t.detalle === solicitud[0])[0]);

    this.tabs.splice(index, 1);
    this.selected = this.tabs.length - 1;
  }

}
