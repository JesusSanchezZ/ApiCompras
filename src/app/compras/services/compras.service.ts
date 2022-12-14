import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Autorizacion, Empresa, MotivosRechazo } from '../interfaces/compras/detalleCompra/detalleCompra.interface';
import { HistoEtapaSolicitud } from '../interfaces/solicitudes/historicoEtapaSolicitud.interface';
import { Colonia, Estado, Municipio, NuevoProducto, RespNuevoProducto, Usuario } from '../interfaces/solicitudes/compras/solicitudCompra.interface';
import { SolicitudGeneral } from '../interfaces/solicitudes/solicitudGeneral.interface';
import { TipoSolicitud } from '../interfaces/solicitudes/tipoSolicitud.interface';
import { TipoSolicitud as DetalleSolicitud } from '../interfaces/solicitudes/detalleCompra/tipoSolicitud.interface';

import { UsuarioService } from 'src/app/services/usuario.service';

export interface SolicitudMod extends TipoSolicitud {
  actualiza?: Autorizacion,
  nuevoProducto?: NuevoProducto
}

interface Resp {
  id: string,
  valores: string
}

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private baseUrl = 'http://localhost:5000';
  private solicitud: TipoSolicitud = {
    accion: '',
    token: '',
    usuario: ''
  }

  private solMod : SolicitudMod = {
    ... this.solicitud
  }

  constructor(private http: HttpClient, private usuario: UsuarioService) { }

  autorizaRechaza(autoriza: Autorizacion): Observable<any> {
    this. actualiza();
    let solMod: SolicitudMod;

    this.solicitud.accion = 'AutorizaRechaza';
    solMod = {
      ... this.solicitud,
      actualiza: autoriza
    }

    return this.http.post<any>(`${this.baseUrl}/api/Solicitudes?action=AutorizaRechaza`, solMod);
  }

  catCentro(): Observable<Resp[]>{
    this.actualiza();
    this.solicitud.accion = 'fieldvalues';
    this.solicitud.tipoSolicitud = 'cat_centro';

    return this.http.post<Resp[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  catEmpresas(): Observable<Empresa[]> {
    this.actualiza();

    this.solicitud.accion = 'fieldvalues';
    this.solicitud.tipoSolicitud = 'cat_empresas';

    return this.http.post<Empresa[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  catMedioPago(): Observable<Resp[]>{
    this.actualiza();
    this.solicitud.accion = 'fieldvalues';
    this.solicitud.tipoSolicitud = 'cat_mediopago';

    return this.http.post<Resp[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  catMotRechazo(): Observable<MotivosRechazo[]> {
    this.actualiza();

    this.solicitud.accion = 'fieldvalues';
    this.solicitud.tipoSolicitud = 'cat_motivorechazo';

    return this.http.post<MotivosRechazo[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  catPlazasMc(): Observable<Resp[]> {
    this.actualiza();
    this.solicitud.accion = 'fieldvalues';
    this.solicitud.tipoSolicitud = 'cat_plazasmc';

    return this.http.post<Resp[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  catTipoTransporte(): Observable<Resp[]> {
    this.actualiza();
    this.solicitud.accion = 'fieldvalues';
    this.solicitud.tipoSolicitud = 'cat_tipotransporte';

    return this.http.post<Resp[]>(`${this.baseUrl}/api/solicitudes`, this.solicitud);
  }

  catTipoProducto(): Observable<Resp[]> {
    this.actualiza();
    this.solicitud.accion = 'fieldvalues';
    this.solicitud.tipoSolicitud = 'cat_tipoproducto';

    return this.http.post<Resp[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  colonias(nombre: string): Observable<Colonia[]>{
    this.actualiza();

    this.solicitud.accion = 'Colonia';
    this.solicitud.tipoSolicitud = nombre;

    return this.http.post<Colonia[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  cotizaciones(idSolicitud: string): Observable<any[]> {
    this.actualiza();

    this.solicitud.accion = 'CotizacionesIdSolicitud';
    return this.http.post<any[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  cuentasContables(id: string): Observable<any> {
    this.actualiza();

    this.solicitud.accion = 'CuentasContables';
    this.solicitud.idsolicitud = id;

    return this.http.post<any>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  detalleSolicitud(solicitud: string, tipo: string): Observable<DetalleSolicitud[]>{
    this.actualiza();

    this.solicitud.accion = '';
    this.solicitud.idsolicitud = solicitud;
    this.solicitud.tipoSolicitud = tipo;
    return this.http.post<DetalleSolicitud[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  estados(): Observable<Estado[]> {
    this.actualiza();

    this.solicitud.accion = 'Estado';
    return this.http.post<Estado[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  historicos(solicitud: string): Observable<HistoEtapaSolicitud[]> {
    this.actualiza();

    this.solicitud.accion='HistoricoEtapasSolicitud';
    this.solicitud.idsolicitud = solicitud;
    return this.http.post<HistoEtapaSolicitud[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  impuestosArticulos(empresa: string):Observable<any>{
    this.actualiza();

    this.solicitud.accion = 'ImpuestosArticulos';
    this.solicitud.tipoSolicitud = empresa;

    return this.http.post<any>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  municipios(nombre: string): Observable<Municipio[]>{
    this.actualiza();

    this.solicitud.accion = 'Municipio';
    this.solicitud.tipoSolicitud = nombre;

    return this.http.post<Municipio[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  nuevoProducto(producto: NuevoProducto): Observable<RespNuevoProducto>{
    this.actualiza();

    this.solicitud.accion = 'NuevoProducto';
    this.solicitud.idsolicitud = undefined;
    this.solicitud.tipoSolicitud = undefined;
    this.solMod = {
      ... this.solicitud,
      nuevoProducto: producto
    }

    return this.http.post<RespNuevoProducto>(`${this.baseUrl}/api/Solicitudes`, this.solMod);
  }

  solicitudGeneral(): Observable<SolicitudGeneral[]> {
    this.actualiza();

    this.solicitud.accion = 'solicitud_area';
    return this.http.post<SolicitudGeneral[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  unidadesMedida(empresa: string): Observable<any>{
    this.actualiza();

    this.solicitud.accion = 'UnidadesMedidas';
    this.solicitud.tipoSolicitud = empresa;

    return this.http.post<any>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  usuarios(): Observable<Usuario[]>{
    this.actualiza();
    this.solicitud.accion = 'usuarios';

    return this.http.post<Usuario[]>(`${this.baseUrl}/api/Solicitudes`, this.solicitud);
  }

  private actualiza():void {
    this.solicitud.token = ((this.usuario.getUsuario?.token)?.split(';')[0])?.split('=')[1] || '';
    this.solicitud.usuario = (this.usuario.getUsuario?.payload)?.split('.')[0] || '';
  }
}
