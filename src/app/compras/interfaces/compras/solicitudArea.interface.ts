export interface SolicitudArea {
  idsolicitud:             string;
  s_claveEmpleado:         string;
  s_nombre:                string;          // SNombre
  s_tiposolicitud:         STiposolicitud;
  m_montosolicitud:        null | string;
  s_descripcion:           null;
  d_fecharequerimiento1:   Date;
  n_cantidadsegmentos:     number;
  s_mediopago:             null;
  s_bancodeposito:         null;
  s_numcuentadeposito:     null;
  s_Observaciones:         string;
  d_fecharequerimiento:    Date;
  Etapa:                   Etapa | null;
  MotivodeRechazo:         null | string;
  s_empresa:               SEmpresa | null;
  dilacion:                string;
  bandera:                 number;
  s_AdjuntoXML:            null;
  s_AdjuntoPDF:            null;
  s_placa:                 string;
  s_TipoVehiculo:          null;
  s_TarjetaGasolina:       null;
  s_Kilometraje:           null;
  s_TanqueGasolina:        null;
  dFechayHoraSalida:       null;
  dFechayHoraRegreso:      null;
  s_KilometrajeRegreso:    null;
  s_TanqueGasolinaRegreso: null;
  s_area:                  SArea | null;
  s_Proveedor:             null | string;
}

export enum Etapa {
  CompraAutorizada = "Compra autorizada",
  OrdenDeCompraRealizada = "Orden de compra realizada",
  SolicitudAutorizada = "Solicitud autorizada",
  SolicitudFinalizada = "Solicitud finalizada",
  SolicitudRegistrada = "Solicitud registrada",
}

export enum SArea {
  Compras = "Compras",
  Contabilidad = "Contabilidad",
  Solicitante = "Solicitante",
  Tesoreria = "Tesoreria",
}

export enum SEmpresa {
  PruebaCorporativoMuñoz = "PRUEBA CORPORATIVO MUÑOZ",
}

export enum SNombre {
  JoseDeJesusSanchezZambrano = "JOSE DE JESUS SANCHEZ ZAMBRANO",
  MoisesBautistaFraga = "MOISES BAUTISTA FRAGA",
  UsuarioPruebas = "Usuario Pruebas",
}

export enum STiposolicitud {
  Compra = "Compra",
  CompraExpress = "Compra Express",
}
