export interface SolicitudCompra {
  s_placa:              string | null;
  idTipoCosto:          string;
  d_fecharequerimiento: string;
  n_cantidadsegmentos:  string;
  s_NombreRecibe:       string;
  s_Observaciones:      string;
  Productos:            Producto[];
  b_CompraExpress:      string | null;
}

export interface EditarCompra extends SolicitudCompra {
  idsolicitud: string;
}

export interface Producto {
  producto:                string;
  n_Cantidad:              string;
  s_Unidad:                string;
  s_ObservacionesProducto: string;
  s_Segmento:              string;
  idProducto:              string;
  $$hashKey?:               string;
}


export interface respSolCompra {
  success: string,
  mensaje: string,
  payload: string
}

export interface NuevoProducto {
  Arancel: string,
  CuentaContable: string,
  idCtaContable: string;
  idTipoProducto: string;
  Impuestos: Imp[],
  NombreEmpresa: string,
  s_ClaveSAT: string,
  s_Contenido: string,
  s_DatosParticulares: string,
  s_Empresa: number,
  s_FactorVenta: string,
  s_Importado: string,
  s_NombreProducto: string,
  s_pesarBascula: string,
  s_UnidadVenta: string
}

export interface Imp {
  s_Impuestos: string
}

export interface Resp {
  id: string,
  valores: string,
}

export interface MedioPago {
  id: number,
  s_descripcion: string
}

export interface CuentaCont {
  '@Cuenta': string,
  '@Id': string,
  '@Nombre': string
}

export interface ImpuestoArt {
  '@Id': string,
  '@Nombre': string,
  '@Tasa': string,
  '@TipoImpuesto': string
}

export interface UnidadMedida {
  '@ClaveSat': string,
  '@Id': string,
  '@Nombre': string
}

export interface RespNuevoProducto {
  success: string,
  id: string
}

export interface Estado {
  d_estado: string
}

export interface Municipio {
  D_mnpio: string
}

export interface Colonia {
  d_asenta: string
}

export interface Usuario {
  b_habilitado: boolean,
  b_sesionIniciada: boolean,
  d_fechaAlta: string,
  d_fechaCambioPsw: string,
  d_fechaDeshabilitado: string,
  idArea: string,
  idPerfil: string,
  idUsuario: string,
  s_area: string,
  s_claveEmpleado: string,
  s_email: string,
  s_nombre: string,
  s_pathFoto: string,
  s_perfil: string,
  s_puesto: string,
  s_telefono: string
}
