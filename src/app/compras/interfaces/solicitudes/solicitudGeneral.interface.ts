export interface SolicitudGeneral {
  idsolicitud:             string;
  s_claveEmpleado:         string;
  s_nombre:                string;
  s_tiposolicitud:         string;
  m_montosolicitud:        null | string;
  s_descripcion:           null | string;
  d_fecharequerimiento1:   string | null;
  n_cantidadsegmentos:     number;
  s_mediopago:             null | string;
  s_bancodeposito:         null | string;
  s_numcuentadeposito:     null | string;
  s_Observaciones:         string;
  d_fecharequerimiento:    string;
  Etapa:                   string;
  MotivodeRechazo:         null | string;
  s_empresa:               string | null;
  dilacion:                string;
  bandera:                 number;
  s_AdjuntoXML:            null;
  s_AdjuntoPDF:            null;
  s_placa:                 null | string;
  s_TipoVehiculo:          null;
  s_TarjetaGasolina:       null | string;
  s_Kilometraje:           null;
  s_TanqueGasolina:        null;
  dFechayHoraSalida:       Date | null;
  dFechayHoraRegreso:      Date | null;
  s_KilometrajeRegreso:    null;
  s_TanqueGasolinaRegreso: null;
  s_area:                  string;
  s_Proveedor:             null | string;
}

export enum SArea {
  Compras = "Compras",
  SecretariaGeneral = "Secretaria general",
  Solicitante = "Solicitante",
  Tesoreria = "Tesoreria",
}

// export enum SClaveEmpleado {
//   Ce2222 = "ce2222",
// }

// export enum SEmpresa {
//   PruebaCorporativoMuñoz = "PRUEBA CORPORATIVO MUÑOZ",
// }

// export enum SNombre {
//   UsuarioPruebas = "Usuario Pruebas",
// }

// export enum STiposolicitud {
//   Compra = "Compra",
//   CompraExpress = "Compra Express",
//   OtrosGastos = "Otros Gastos",
//   Viaticos = "Viaticos",
//   Viático = "Viático",
// }
