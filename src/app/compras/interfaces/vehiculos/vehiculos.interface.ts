export interface Tabs {
  tipo:    string;
  detalle: string;
}


export interface SolicitudVehiculo	{
	idsolicitud:             string;
	s_claveEmpleado:         string;
	s_nombre:                string;
	s_tiposolicitud:         string;
	m_montosolicitud:        string | null;
	s_descripcion:           string;
	d_fecharequerimiento1:   string;
  n_cantidadsegmentos:     string | null;
	s_mediopago:             string | null;
	s_bancodeposito:         string | null;
	s_numcuentadeposito:     string | null;
	s_Observaciones:         string | null;
	d_fecharequerimiento:    string;
	Etapa:                   string;
	MotivodeRechazo:         string | null;
	s_empresa:               string | null;
	dilacion:                string;
	bandera:                 string;
  s_AdjuntoXML:            string | null;
	s_AdjuntoPDF:            string | null;
	s_placa:                 string | null;
	s_TipoVehiculo:          string | null;
	s_TarjetaGasolina:       string;
	s_Kilometraje:           string | null;
	s_TanqueGasolina:        string | null;
	dFechayHoraSalida:       string;
	dFechayHoraRegreso:      string;
	s_KilometrajeRegreso:    string | null;
	s_TanqueGasolinaRegreso: string | null;
	s_area:                  string;
	s_Proveedor:             string | null
}

export interface DetalleVehiculo {
	idsolicitud: string;
	s_claveEmpleado: string;
	s_nombre: string;
	s_tiposolicitud: string;
	Etapa: string;
	dilacion: string;
	s_descripcion: string;
	s_placa: string;
	s_TipoVehiculo: string;
	s_TarjetaGasolina: string;
	s_Kilometraje: string;
	s_TanqueGasolina: string;
	dFechayHoraSalida: string;
	dFechayHoraRegreso: string;
	s_KilometrajeRegreso: string;
	s_TanqueGasolinaRegreso: string;
	idTipoSolicitud: string;
	idEtapa: string;
	n_Paso: string;
  b_AdjuntosFactura: string;
	d_FechaAdjuntos: string;
	s_TarjetaTag: string;
	n_NumEmpleadosBeneficiados: string;
	s_TipoTransporte: string;
	s_RutaInvocacionImagen: string;
	d_FechaDevolucionVehiculo: string;
	s_ObservacionesAsignacionVehiculo: string;
	s_ObservacionesSalidaVehiculo: string;
	s_ObservacionesDevolucionVehiculo: string;
	d_FechaSalidaVehiculo: string;
	s_origen: string;
	s_destino: string;
	n_Gasolina: string;
	n_cantidadsegmentos: string;
	idTipoCosto: string;
	s_EntidadCargo: string;
	s_claves_empleados: EmplVehiculo[];
	segmentos: SegmVehiculo[]
}

export interface EmplVehiculo {
  clave_empleado: string;
}

export interface SegmVehiculo {
  segmento: string;
  porcentaje: string;
}


export interface ComboVehiculos	{
	id:               string,
	s_PlacaVehicular: string,
	s_Marca:          string,
	s_Submarca:       string,
	n_Modelo:         string,
	s_TipoVehiculo:   string
}

export interface TarjetaGas{
  id: number,
  s_tarjetagasolina: string,
  n_saldo: number,
  b_Habilitado: boolean
}

export interface TarjetaTag{
  id: string,
  s_tag: string,
  b_Habilitado: boolean
}
