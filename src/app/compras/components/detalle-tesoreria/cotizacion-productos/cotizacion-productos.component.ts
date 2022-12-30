import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CotizacionProductos } from 'src/app/compras/interfaces/Tesoreria/tesoreria.interface';

declare const $: any;

@Component({
  selector: 'app-cotizacion-productos',
  templateUrl: './cotizacion-productos.component.html',
  styles: [
  ]
})
export class CotizacionProductosComponent implements AfterViewInit {



  encabezados: string[] = ['Opciones', 'Producto','Proveedor','Cantidad','Precio c/u','Descuento','Iva','Precio total', 'Total','Observaciones'];

  constructor() { }

  ngAfterViewInit(): void {}


}
