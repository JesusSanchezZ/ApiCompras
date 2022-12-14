export interface Login {
  success:     string;
  mensaje:     string;
  payload:     string;
  resc:        string;
  menu:        string;
  perfilEtapa: PerfilEtapa[];
}

export interface PerfilEtapa {
  s_TipoSolicitud: STipoSolicitud;
  n_Paso:          number;
}

export enum STipoSolicitud {
  Compra = "Compra",
  CompraExpress = "Compra Express",
  GastoOperativo = "Gasto Operativo",
  OtrosGastos = "Otros Gastos",
  Vehiculo = "Vehiculo",
  Viaticos = "Viaticos",
  Viático = "Viático",
}
