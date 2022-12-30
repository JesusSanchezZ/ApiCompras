export interface Empresa {
  id: string;
  valores: string;
}

export interface MotivosRechazo {
  id: string;
  valores: string;
}

export interface Autorizacion {
  b_Rechazo:        number;
  idsolicitud:      string;
  MotivodeRechazo?: string;
  Productos:        Producto[];
  s_empresa:        string;
  s_Observaciones:  string;
  s_tiposolicitud:  string;
}

export interface Producto {
  $$hashKey?:               string;
  idMicrosip:              string;
  idProducto:              string;
  n_Cantidad:              string;
  producto:                string;
  s_CuentaContable:        string;
  s_IVA:                   string;
  s_NombreCategoria:       string;
  s_ObservacionesProducto: string;
  s_Retenciones:           string;
  s_Segmento:              string;
  s_Unidad:                string;
}
