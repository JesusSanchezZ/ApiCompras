export interface TipoSolicitud {
  idsolicitud:          string;
  s_claveEmpleado:      string;
  s_nombre:             string;
  s_tiposolicitud:      string;
  Etapa:                string;
  m_montosolicitud:     string;
  d_fecharequerimiento: string;
  s_unidades:           string;
  s_producto:           string;
  s_descripcion:        string;
  s_placa:              string;
  s_NombreRecibe:       string;
  s_Observaciones:      string;
  n_cantidad:           string;
  n_cantidadsegmentos:  string;
  idTipoSolicitud:      string;
  idEtapa:              string;
  n_Paso:               string;
  b_AdjuntosFactura:    string;
  d_FechaAdjuntos:      string;
  s_mediopago:          string;
  s_bancodeposito:      string;
  s_numcuentadeposito:  string;
  s_empresa:            string;
  d_MontoComprobado:    string;
  b_CompraExpress:      string;
  idTipoCosto:          string;
  s_EntidadCargo:       string;
  Productos:            Producto[];

  // Campos para solicitud Otros Gastos
  dilacion:                     string;
  s_CuentaBancariaRetiro:       string;
  s_CuentaContableBeneficiario: string;
  s_claves_empleados:           string;
  s_nombres_empleados:          string;

  // Campos para solicitud Vehiculo
  n_NumEmpleadosBeneficiados:   string;
  s_TipoTransporte:             string;
  s_origen:                     string;
  dFechayHoraSalida:            string;
  s_TarjetaGasolina:            string;
  s_destino:                    string;
  dFechayHoraRegreso:           string;

  // Campos para solicitud Viaticos
  n_Hospedaje:                  string;
  n_Alimentos:                  string;
  n_Casetas:                    string;
  n_otros:                      string;
  n_Gasolina:                   string;
  s_otros:                      string;
  n_taxi:                       string;
  s_MotivoViaje:                string;
}

export interface Producto {
  idProducto:              string;
  s_NombreCategoria:       string;
  producto:                string;
  n_Cantidad:              string;
  s_Unidad:                string;
  s_ObservacionesProducto: string;
  s_CuentaContable:        string;
  s_IVA:                   string;
  s_Retenciones:           string;
  s_Segmento:              string;
  idMicrosip:              string;
}

