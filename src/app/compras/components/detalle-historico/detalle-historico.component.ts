import { Component, Input, OnInit } from '@angular/core';
import { HistoEtapaSolicitud } from '../../interfaces/solicitudes/historicoEtapaSolicitud.interface';

@Component({
  selector: 'app-detalle-historico',
  templateUrl: './detalle-historico.component.html',
  styles: [
  ]
})
export class DetalleHistoricoComponent implements OnInit {

  @Input() historico!: HistoEtapaSolicitud;

  constructor() { }

  ngOnInit(): void {
  }

}
