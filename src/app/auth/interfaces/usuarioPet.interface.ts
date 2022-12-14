export interface UsuarioPet {
  s_claveEmpleado:    string;
  s_psw:              string;
  s_passwordAntigua?: string | null;
  s_passwordNueva?:   string | null;
  s_rnew_psw?:        string | null;
}
