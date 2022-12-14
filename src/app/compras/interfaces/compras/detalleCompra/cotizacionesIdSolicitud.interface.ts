export interface CotizacionesIDSolicitud {
  id:                      number;
  idCotizacion:            string;
  idSolicitud:             string;
  s_TipoCotizacion:        string;
  s_Mensaje:               null;
  s_Destinatario:          null;
  s_Observaciones:         string;
  s_TiempoEntrega:         string;
  s_PersonaAtiende:        string;
  b_Envio:                 boolean;
  s_RutaPDF:               null;
  s_AdjuntoPDF:            null;
  s_ClaveEmpleado:         string;
  s_Nombre:                string;
  n_RechazoSolicitud:      null;
  d_FechaInsercionSistema: Date;
  d_FechaEntrega:          null;
}
