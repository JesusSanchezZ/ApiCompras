import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AdjuntosCotizacionesIdSolicitud, CondicionesPago } from '../interfaces/Tesoreria/tesoreria.interface';
import { CategoriaUnidades } from '../interfaces/solicitudes/compras/categoriaUnidades.interface';
import { DatosUsuario } from '../interfaces/solicitudes/detalleUsuario.interface';
import { ComboVehiculos, DetalleVehiculo, TarjetaGas, TarjetaTag } from '../interfaces/vehiculos/vehiculos.interface';
import { EditarCompra, MedioPago, respSolCompra, SolicitudCompra } from '../interfaces/solicitudes/compras/solicitudCompra.interface';
import { HistoEtapaSolicitud } from '../interfaces/solicitudes/historicoEtapaSolicitud.interface';
import { Producto } from '../interfaces/solicitudes/compras/compras.interface';
import { Segmentos } from '../interfaces/solicitudes/compras/segmentos.interface';
import { SolicitudGeneral } from '../interfaces/solicitudes/solicitudGeneral.interface';
import { OtrosGastos, RespOtrosGas, TipoSolicitud } from '../interfaces/solicitudes/tipoSolicitud.interface';
import { TipoSolicitud as DetalleSolicitud } from '../interfaces/solicitudes/detalleCompra/tipoSolicitud.interface';

import { UsuarioService } from 'src/app/services/usuario.service';

import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

export interface SolicitudMod extends TipoSolicitud {
  compra?: SolicitudCompra,
  edita?: EditarCompra,
  otrosGastos?: OtrosGastos
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  private baseUrl = 'http://localhost:5000/api/Solicitudes';
  private solicitud: TipoSolicitud = {
    accion: '',
    token: '',
    usuario: ''
  };

  private solMod: SolicitudMod = {
    ...this.solicitud
  };

  constructor(private http: HttpClient,
              private usuario: UsuarioService,
              private dialog: MatDialog) { }

  adjuntosCotizacionesIdSolicitud(idsolicitud: string): Observable<AdjuntosCotizacionesIdSolicitud[]> {
    this._actualiza();

    this.solicitud.accion = 'AdjuntosCotizacionesIdSolicitud';
    this.solicitud.idsolicitud = idsolicitud;

    return this.http.post<AdjuntosCotizacionesIdSolicitud[]>(this.baseUrl, this.solicitud);
  }

  actualizaSolicitud(solicitud: EditarCompra) :Observable<respSolCompra> {
    this._actualiza();

    this.solicitud.accion = 'EditaSolicitud';
    this.solMod = {
      ... this.solicitud,
      edita: solicitud
    }

    return this.http.post<respSolCompra>(this.baseUrl, this.solMod);
  }

  catMedioPagoFiltrado(): Observable<MedioPago[]> {
    this._actualiza();
    this.solicitud.accion = 'dataFiltered';
    this.solicitud.tipoSolicitud = 'cat_mediopago';

    return this.http.post<MedioPago[]>(this.baseUrl, this.solicitud);
  }

  closeLoader() {
    this.dialog.closeAll();
  }

  comboVehiculos(): Observable<ComboVehiculos[]>{
    this._actualiza();

    this.solicitud.accion = 'ComboVehiculos';

    return this.http.post<ComboVehiculos[]>(this.baseUrl, this.solicitud);
  }

  CondPagoxSolicitud(id: string): Observable<CondicionesPago[]> {
    this._actualiza();

    this.solicitud.accion = 'CondPagoxSolicitud';
    this.solicitud.idsolicitud = id;

    return this.http.post<CondicionesPago[]>(this.baseUrl, this.solicitud);
  }

  datosUsuario(): Observable<DatosUsuario[]>{
    this._actualiza();

    this.solicitud.accion = 'DatosUsuario';
    return this.http.post<DatosUsuario[]>(this.baseUrl, this.solicitud);
  }

  detalleCompra( solicitud: string[] ): Observable<DetalleSolicitud[]>{
    this._actualiza();

    this.solicitud.accion = '';
    this.solicitud.tipoSolicitud = solicitud[1].trim();
    this.solicitud.idsolicitud = solicitud[0].trim();

    //console.log( solicitud);

    return this.http.post<DetalleSolicitud[]>(this.baseUrl, this.solicitud);
  }

  detalleVehiculo(solicitud: string[]) : Observable<DetalleVehiculo[]> {
    this._actualiza();

    this.solicitud.accion = '';
    this.solicitud.tipoSolicitud = solicitud[1];
    this.solicitud.idsolicitud = solicitud[0];

    return this.http.post<DetalleVehiculo[]>(this.baseUrl, this.solicitud);
  }

  detalleCompraEd( solicitud: string[]): Observable<DetalleSolicitud>{
    this._actualiza();

    this.solicitud.accion = '';
    this.solicitud.tipoSolicitud = solicitud[1];
    this.solicitud.idsolicitud = solicitud[0];
    return this.http.post<DetalleSolicitud>(this.baseUrl, this.solicitud);
  }

  eliminarSolicitud( solicitud: string ): Observable<any> {
    this._actualiza();

    this.solicitud.accion = 'EliminarSolicitud';
    this.solicitud.idsolicitud = solicitud;
    return this.http.post<any>(this.baseUrl, this.solicitud);
  }

  historicoEtapaSolicitud( solicitud: string ): Observable<HistoEtapaSolicitud[]> {
    this._actualiza();

    this.solicitud.accion='HistoricoEtapasSolicitud';
    this.solicitud.idsolicitud = solicitud;
    return this.http.post<HistoEtapaSolicitud[]>(this.baseUrl, this.solicitud)
  }

  generaOrdenCompra(solicitud: SolicitudCompra): Observable<respSolCompra>{
    this._actualiza();

    this.solicitud.accion='Compra';
    this.solMod = {
      ... this.solicitud,
      compra: solicitud
    }

    // console.log(this.solMod);

    return this.http.post<respSolCompra>(this.baseUrl, this.solMod);
  }

  generaOtrosGastos(solicitud: OtrosGastos): Observable<RespOtrosGas>{
    this._actualiza();
    this.solicitud.accion='OtrosGastos';
    this.solMod = {
      ... this.solicitud,
      otrosGastos: solicitud
    }

    return this.http.post<RespOtrosGas>(this.baseUrl, this.solMod);
  }

  getFile(solicitud: string): Promise<any>{
    const headers = new HttpHeaders().set('Content-Type','application/octet-stream');
    this._actualiza();

    var archivo = solicitud.split('?')[1].split('&')[1].split('=')[1];
    var carpeta = solicitud.split('?')[1].split('&')[2].split('=')[1];

    console.log({archivo, carpeta});
    console.log(this.solicitud.token);

    return fetch(`${this.baseUrl}?archivo=${archivo}&carpeta=${carpeta}&token=${this.solicitud.token}`, { method: 'GET'});
  }

  loader(msg: string){
    this.dialog.open(SpinnerComponent,{
      disableClose: true,
      minHeight: '125px',
      minWidth: '125px',
      data: {
        msg: msg
      }
    });
  }

  productos(): Observable<Producto[]> {
    this._actualiza();

    this.solicitud.accion='SolicitudProductos';
    return this.http.post<Producto[]>(this.baseUrl, this.solicitud);
  }

  productosAny(): Observable<any[]>{
    this._actualiza();

    this.solicitud.accion='SolicitudProductos';
    return this.http.post<any[]>(this.baseUrl, this.solicitud);
  }

  productosCotizacion(id: string): Observable<any> {
    this._actualiza();

    this.solicitud.accion = 'ProductosCotizacionFacturaPendiente';
    this.solicitud.idsolicitud = id;

    return this.http.post<any>(this.baseUrl, this.solicitud);
  }

  segmentos(): Observable<Segmentos[]> {
    this._actualiza();

    this.solicitud.accion = 'SolicitudSegmentos';
    return this.http.post<Segmentos[]>(this.baseUrl, this.solicitud);
  }

  solicitudGeneral( ): Observable<SolicitudGeneral[]>{
    this._actualiza();

    this.solicitud.accion = 'SolicitudGeneral';
    return this.http.post<SolicitudGeneral[]>(this.baseUrl, this.solicitud );
  }

  solicitudGeneralTesoreria(): Observable<SolicitudGeneral[]>{
    this._actualiza();

    this.solicitud.accion = 'solicitud_area';
    this.solicitud.tipoSolicitud = '';
    return this.http.post<SolicitudGeneral[]>(this.baseUrl, this.solicitud);
  }

  solicitudVehiculo(): Observable<any> {
    this._actualiza();

    this.solicitud.accion = 'solicitud_area';
    this.solicitud.tipoSolicitud = 'Vehiculo';

    return this.http.post<any>(this.baseUrl, this.solicitud);
  }

  tarjetaGasolina(): Observable<TarjetaGas[]> {
    this._actualiza();

    this.solicitud.accion = 'dataFiltered';
    this.solicitud.tipoSolicitud = 'vw_TarjetaGasolinaDisponible';

    return this.http.post<any>(this.baseUrl, this.solicitud);
  }

  tarjetaTag(): Observable<TarjetaTag[]> {
    this._actualiza();

    this.solicitud.accion = 'dataFiltered';
    this.solicitud.tipoSolicitud = 'vw_TarjetaTagDisponible';

    return this.http.post<any>(this.baseUrl, this.solicitud);
  }

  unidades(): Observable<CategoriaUnidades[]> {
    this._actualiza();

    this.solicitud.accion = 'SolicitudUnidades';
    return this.http.post<CategoriaUnidades[]>(this.baseUrl, this.solicitud)
  }

  private _actualiza(): void {
    this.solicitud.token = ((this.usuario.getUsuario?.token)?.split(';')[0])?.split('=')[1] || '';
    this.solicitud.usuario = (this.usuario.getUsuario?.payload)?.split('.')[0] || '';
  }
}
