export interface TipoSolicitud {
  accion: string;
  usuario: string;
  token: string;
  tipoSolicitud?: string;
  idsolicitud?: string;
  etapa?: string;
}

export interface OtrosGastos {
  d_fecharequerimiento: string,
  idTipoCosto: string,
  m_montosolicitud: string,
  n_cantidadsegmentos: string,
  n_NumEmpleadosBeneficiados: string,
  s_beneficiario: string,
  s_claves_empleados: Empleado[],
  s_descripcion: string,
  s_mediopago: string,
  s_Observaciones: string,
  s_tiposolicitud: string
}

export interface Empleado {
  clave_empleado: string,
  nombre_empleado: string
}

export interface RespOtrosGas {
  success: string,
  mensaje: string,
  payload: string
}
