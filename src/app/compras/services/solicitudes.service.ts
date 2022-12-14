import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CategoriaUnidades } from '../interfaces/solicitudes/compras/categoriaUnidades.interface';
import { DatosUsuario } from '../interfaces/solicitudes/detalleUsuario.interface';
import { EditarCompra, MedioPago, Resp, respSolCompra, SolicitudCompra } from '../interfaces/solicitudes/compras/solicitudCompra.interface';
import { HistoEtapaSolicitud } from '../interfaces/solicitudes/historicoEtapaSolicitud.interface';
import { Producto } from '../interfaces/solicitudes/compras/compras.interface';
import { Segmentos } from '../interfaces/solicitudes/compras/segmentos.interface';
import { SolicitudGeneral } from '../interfaces/solicitudes/solicitudGeneral.interface';
import { OtrosGastos, RespOtrosGas, TipoSolicitud } from '../interfaces/solicitudes/tipoSolicitud.interface';
import { TipoSolicitud as DetalleSolicitud } from '../interfaces/solicitudes/detalleCompra/tipoSolicitud.interface';

import { UsuarioService } from 'src/app/services/usuario.service';

export interface SolicitudMod extends TipoSolicitud {
  compra?: SolicitudCompra,
  edita?: EditarCompra,
  otrosGastos?: OtrosGastos
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  private baseUrl = 'http://localhost:5000';
  private solicitud: TipoSolicitud = {
    accion: '',
    token: '',
    usuario: ''
  };

  private solMod: SolicitudMod = {
    ...this.solicitud
  };

  constructor(private http: HttpClient,
              private usuario: UsuarioService) { }

  actualiza(): void {
    this.solicitud.token = ((this.usuario.getUsuario?.token)?.split(';')[0])?.split('=')[1] || '';
    this.solicitud.usuario = (this.usuario.getUsuario?.payload)?.split('.')[0] || '';
  }

  actualizaSolicitud(solicitud: EditarCompra) :Observable<respSolCompra> {
    this.actualiza();

    this.solicitud.accion = 'EditaSolicitud';
    this.solMod = {
      ... this.solicitud,
      edita: solicitud
    }

    return this.http.post<respSolCompra>(`${this.baseUrl}/api/Solicitudes`, this.solMod);
  }

  catMedioPagoFiltrado(): Observable<MedioPago[]> {
    this.actualiza();
    this.solicitud.accion = 'dataFiltered';
    this.solicitud.tipoSolicitud = 'cat_mediopago';

    return this.http.post<MedioPago[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  datosUsuario(): Observable<DatosUsuario[]>{
    this.actualiza();

    this.solicitud.accion = 'DatosUsuario';
    return this.http.post<DatosUsuario[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  detalleCompra( solicitud: string[] ): Observable<DetalleSolicitud[]>{
    this.actualiza();

    this.solicitud.accion = '';
    this.solicitud.tipoSolicitud = solicitud[1].trim();
    this.solicitud.idsolicitud = solicitud[0].trim();

    // console.log( solicitud);

    return this.http.post<DetalleSolicitud[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  detalleCompraEd( solicitud: string[]): Observable<DetalleSolicitud>{
    this.actualiza();

    this.solicitud.accion = '';
    this.solicitud.tipoSolicitud = solicitud[1];
    this.solicitud.idsolicitud = solicitud[0];
    return this.http.post<DetalleSolicitud>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  eliminarSolicitud( solicitud: string ): Observable<any> {
    this.actualiza();

    this.solicitud.accion = 'EliminarSolicitud';
    this.solicitud.idsolicitud = solicitud;
    return this.http.post<any>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  historicoEtapaSolicitud( solicitud: string ): Observable<HistoEtapaSolicitud[]> {
    this.actualiza();

    this.solicitud.accion='HistoricoEtapasSolicitud';
    this.solicitud.idsolicitud = solicitud;
    return this.http.post<HistoEtapaSolicitud[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud)
  }

  generaOrdenCompra(solicitud: SolicitudCompra): Observable<respSolCompra>{
    this.actualiza();

    this.solicitud.accion='Compra';
    this.solMod = {
      ... this.solicitud,
      compra: solicitud
    }

    // console.log(this.solMod);

    return this.http.post<respSolCompra>(`${this.baseUrl}/api/Solicitudes`, this.solMod);
  }

  generaOtrosGastos(solicitud: OtrosGastos): Observable<RespOtrosGas>{
    this.actualiza();
    this.solicitud.accion='OtrosGastos';
    this.solMod = {
      ... this.solicitud,
      otrosGastos: solicitud
    }

    return this.http.post<RespOtrosGas>(`${this.baseUrl}/api/Solicitudes`, this.solMod);
  }

  productos(): Observable<Producto[]> {
    this.actualiza();

    this.solicitud.accion='SolicitudProductos';
    return this.http.post<Producto[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  productosAny(): Observable<any[]>{
    this.actualiza();

    this.solicitud.accion='SolicitudProductos';
    return this.http.post<any[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  segmentos(): Observable<Segmentos[]> {
    this.actualiza();

    this.solicitud.accion = 'SolicitudSegmentos';
    return this.http.post<Segmentos[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  solicitudGeneral( ): Observable<SolicitudGeneral[]>{
    this.actualiza();

    this.solicitud.accion = 'SolicitudGeneral';
    return this.http.post<SolicitudGeneral[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud );
  }

  solicitudGeneralTesoreria(): Observable<SolicitudGeneral[]>{
    this.actualiza();

    this.solicitud.accion = 'solicitud_area';
    return this.http.post<SolicitudGeneral[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  unidades(): Observable<CategoriaUnidades[]> {
    this.actualiza();

    this.solicitud.accion = 'SolicitudUnidades';
    return this.http.post<CategoriaUnidades[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud)
  }
}
