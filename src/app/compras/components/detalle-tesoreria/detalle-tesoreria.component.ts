import { Component, Input, OnInit } from '@angular/core';

import { HistoEtapaSolicitud } from '../../interfaces/solicitudes/historicoEtapaSolicitud.interface';
import { TipoSolicitud } from '../../interfaces/solicitudes/detalleCompra/tipoSolicitud.interface';

import { SolicitudesService } from '../../services/solicitudes.service';
import { AdjuntosCotizacionesIdSolicitud, CondicionesPago, CotizacionProductos } from '../../interfaces/Tesoreria/tesoreria.interface';
import { concatMap, debounce, fromEvent, interval, map, of, scan, take, tap } from 'rxjs';

@Component({
  selector: 'app-detalle-tesoreria',
  templateUrl: './detalle-tesoreria.component.html',
  styles: [
  ]
})
export class DetalleTesoreriaComponent implements OnInit {

  @Input() solicitud!: string[];

  historicoEtapas: HistoEtapaSolicitud[] = [];
  detalleSolicitud: TipoSolicitud | null = null;

  cotizacionProductos: CotizacionProductos[] = [];
  condicionesPago : CondicionesPago[] = [];

  private _adjuntos!: AdjuntosCotizacionesIdSolicitud[];
  private _historico = false;
  private _detalle = false;

  clicks = fromEvent(document, 'click');
  result = this.clicks.pipe(
    scan( i => ++i, 1),
    debounce(i => interval(200 * i))
  );

  constructor(private solicitudes: SolicitudesService ) { }

  ngOnInit(): void {
    this.result.subscribe({
      next: x => console.log(x)
    });

    of(1,2,3).pipe(
      concatMap(n => interval(1000).pipe(
        take(Math.round(Math.random() * 10)),
        map(() => 'X'),
        tap({ complete: () => console.log(`Done with ${n}`)})
      ))
    )
    .subscribe(console.log);

    this.solicitudes.loader('Cargando');

    this.solicitudes.adjuntosCotizacionesIdSolicitud(this.solicitud[0])
        .subscribe({
          next: resp => {
            this.solicitudes.productosCotizacion(resp[0].idCotizacion)
                .subscribe(r => {
                  this.cotizacionProductos = r;
                  console.log(this.cotizacionProductos);
                });
          },
          complete: () => {console.log()}
        });

    this.solicitudes.CondPagoxSolicitud(this.solicitud[0])
        .subscribe({
          next: resp => {
            console.log(resp);
            this.condicionesPago = resp;
          },
          complete: () => {}
        });

    this.solicitudes.historicoEtapaSolicitud(this.solicitud[0])
        .subscribe({
          next: resp => this.historicoEtapas = resp,
          complete: () => {
            this._historico = true;
            this._cerrar();
          }
        });

    this.solicitudes.detalleCompra(this.solicitud)
        .subscribe({
          next: resp => this.detalleSolicitud = resp[0],
          complete: () => {
            this._detalle = true;
            this._cerrar();
          }
        })
  }

  private _cerrar(){
    if(this._detalle && this._historico)
      this.solicitudes.closeLoader();
  }

}
