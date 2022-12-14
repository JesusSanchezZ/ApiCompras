import { Component, OnInit } from '@angular/core';
import { SolicitudGeneral } from 'src/app/compras/interfaces/solicitudes/solicitudGeneral.interface';
import { SolicitudesService } from 'src/app/compras/services/solicitudes.service';
import { Tabs } from '../../solicitudes/consultar/consultar.component';

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
    this.tabs.push({tipo: detalle[1], detalle: detalle[0]});
    this.selected = this.tabs.length - 1;
  }

  cerrarDetalle(solicitud: string[]): void {
    let index = this.tabs.indexOf(this.tabs.filter(t => t.detalle === solicitud[0])[0]);

    this.tabs.splice(index, 1);
    this.selected = this.tabs.length - 1;
  }

}
