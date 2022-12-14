export interface CategoriaProducto {
  id:              number;
  CuentaContable:  string;
  Categoria:       null | string;
  Producto:        string;
  s_empresanombre: SEmpresanombre;
}

export enum SEmpresanombre {
  PruebaCorporativoMuñoz = "PRUEBA CORPORATIVO MUÑOZ",
}
