import { Component } from '@angular/core';

import * as toastr from 'toastr';

export interface Tabs {
  tipo: string;
  detalle: string
}

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styles: [
  ]
})
export class ConsultarComponent {
  tabs:  Tabs[] = [
    {
      tipo: '',
      detalle: 'Solicitudes'
    }
  ];

  selected = 0;
  detalle = false;

  panelOpenState = false;

  constructor() { }

  detalles():void {
    this.detalle = true;
    this.selected = 1;
  }

  cerrar(solicitud: string[]):void {
    let indice = this.tabs.indexOf(this.tabs.filter(e => e.detalle === solicitud[0])[0]);

    this.tabs.splice(indice,1);
    this.selected = this.tabs.length - 1;
  }

  nuevoDetalle(solicitud: string[]): void {
    let existe = false;

    if( this.tabs.length === 5){
      toastr.error('Excedió el número máximo de pestañas','',{toastClass:'mt-5'});
      return;
    }
    this.tabs.forEach( e => {
      if( e.detalle === solicitud[0]){
        toastr.info(`La solicitud ${solicitud}, ya está abierta`,'',{toastClass:'mt-5'});
        existe = true;
      }
    })

    if(existe) return;


    this.tabs.push({tipo: solicitud[1], detalle: solicitud[0]});

    // console.log(solicitud);
    // console.log(this.tabs);
    // console.log( this.tabs.forEach( d => console.log(d.tipo)));

    this.selected = this.tabs.length - 1;
  }

}
