import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from 'src/app/compras/interfaces/solicitudes/compras/solicitudCompra.interface';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styles: [
    `
      table {
        width: 100%
      }
    `
  ]
})
export class ListaProductosComponent {
  @Input() productos!: Producto[];
  @Output() eliminarProducto: EventEmitter<string> = new EventEmitter();

  columMostrar: string[] = ['idProducto','producto','n_Cantidad','s_Unidad','s_ObservacionesProducto','s_Segmento'];
  producto1: Producto[] = [];

  elimina( idProducto: string ): void {
    this.eliminarProducto.emit(idProducto);
  }

}
