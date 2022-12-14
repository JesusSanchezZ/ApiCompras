import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/solicitudes/detalleCompra/tipoSolicitud.interface';

@Component({
  selector: 'app-detalle-compras',
  templateUrl: './detalle-compras.component.html',
  styles: [
  ]
})
export class DetalleComprasComponent implements OnInit {

  @Input() productos: Producto[] = [];
  columns = [
    {
      columnDef: 'producto',
      header: 'Producto',
      cell:(element: Producto) => `${element.producto}`
    },
    {
      columnDef: 'n_Cantidad',
      header: 'Cantidad',
      cell:(element: Producto) => `${element.n_Cantidad}`
    },
    {
      columnDef: 's_Unidad',
      header: 'Unidad',
      cell:(element: Producto) => `${element.s_Unidad}`
    },
    {
      columnDef: 's_ObservacionesProducto',
      header: 'Observaciones',
      cell:(element: Producto) => `${element.s_ObservacionesProducto}`
    },
    {
      columnDef: 's_Segmento',
      header: 'Segmento',
      cell:(element: Producto) => `${element.s_Segmento}`
    }
  ];

  ColumnasMostrar = this.columns.map( c => c.columnDef );

  constructor() { }

  ngOnInit(): void {
  }

}
