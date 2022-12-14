import { Component, OnInit } from '@angular/core';

import * as toastr from 'toastr';

import { ComprasService } from 'src/app/compras/services/compras.service';

import { SolicitudGeneral } from 'src/app/compras/interfaces/solicitudes/solicitudGeneral.interface';
import { Tabs } from '../../solicitudes/consultar/consultar.component';

@Component({
  selector: 'app-compras-p',
  templateUrl: './compras-p.component.html',
  styles: [
  ]
})
export class ComprasPComponent implements OnInit {
  tabs: Tabs[] = [{
    tipo: '',
    detalle: 'Solicitudes'
  }];

  selected = 0;
  solicitudes: SolicitudGeneral[] = [];

  constructor(private compras: ComprasService) { }

  ngOnInit(): void {
    this.solicitudGeneral();
  }

  abrirDetalle(solicitud: string[]): void {
    if(this.tabs.length == 5){
      toastr.error('Excedió el número máximo de pestañas','',{
        toastClass: 'mt-5'
      });
      return;
    }
    if(this.tabs.filter( e => e.detalle === solicitud[0]).length !== 0){
      toastr.info(`La solicitud ${solicitud}, ya está abierta`,'',{
        toastClass: 'mt-5'
      });
      return;
    };

    this.tabs.push({tipo: solicitud[1], detalle: solicitud[0]});
    this.selected = this.tabs.length - 1;

  }

  cerrarDetalle(solicitud: string[]): void {
    let index = this.tabs.indexOf(this.tabs.filter(e => e.detalle === solicitud[0])[0]);

    this.tabs.splice(index, 1);
    this.selected = this.tabs.length - 1;
  }

  solicitudGeneral(): void {
    if(this.solicitudes.length > 0) this.solicitudes = [];
    this.compras.solicitudGeneral()
        .subscribe( solicitudes => this.solicitudes = solicitudes.filter(solC => solC.s_area === 'Compras'));
  }

}
