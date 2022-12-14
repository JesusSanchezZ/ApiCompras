import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Producto } from '../../interfaces/solicitudes/compras/compras.interface';

import { HistoEtapaSolicitud } from '../../interfaces/solicitudes/historicoEtapaSolicitud.interface';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  selector: 'app-detalle-contabilidad',
  templateUrl: './detalle-contabilidad.component.html',
  styles: [
  ]
})
export class DetalleContabilidadComponent implements OnInit {

  @Input() solicitud: string = '';
  @Input() tipo: string = '';

  formBusqueda: FormGroup = this.fb.group({
    busqueda: ['']
  });
  options: string[] = ['Uno','Dos','Tres','Dos mil','Donas','Dominio'];
  filteredOptions!: Observable<Producto[]>;

  historicos: HistoEtapaSolicitud[] = [];
  productos: Producto[] = [];

  constructor(private solicitudes: SolicitudesService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.solicitudes.historicoEtapaSolicitud(this.solicitud)
        .subscribe( r => this.historicos = r);

    this.solicitudes.productos()
        .subscribe( r => this.productos = r);

    this.filteredOptions = this.formBusqueda.controls['busqueda'].valueChanges
        .pipe(
          startWith(''),
          map( value => this._filter(value)),
        );
  }

  enviarFormulario(): void {
    console.log('formulario')
    console.log(this.formBusqueda.value);
    console.log(this.formBusqueda.controls);
  }

  private _filter(value: string): Producto[] {
    const filterValue = value.toLocaleLowerCase();

    // return this.options.filter(option => option.toLocaleLowerCase().includes(filterValue));
    return this.productos.filter( option => option.s_NombreProducto.toLocaleLowerCase().includes(filterValue));
  }

}
