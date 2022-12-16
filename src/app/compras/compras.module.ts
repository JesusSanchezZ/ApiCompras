import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { AngularTableComponent } from './components/angular-table/angular-table.component';
import { AsistentePComponent } from './pages/asistente/asistente-p/asistente-p.component';
import { ComprasComponent } from './pages/solicitudes/compras/compras.component';
import { ComprasPComponent } from './pages/compras/compras-p/compras-p.component';
import { CompRoutingModule } from './comp-routing.module';
import { ConsultarComponent } from './pages/solicitudes/consultar/consultar.component';
import { ConsultarTComponent } from './pages/tesoreria/consultar-t/consultar-t.component';
import { ContabilidadPComponent } from './pages/contabilidad/contabilidad-p/contabilidad-p.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DatosGeneralesComponent } from './components/datos-generales/datos-generales.component';
import { DetalleCompraComponent } from './components/detalle-compra/detalle-compra.component';
import { DetalleComprasComponent } from './components/detalle-compras/detalle-compras.component';
import { DetalleHistoricoComponent } from './components/detalle-historico/detalle-historico.component';
import { DetalleSolicitudComponent } from './components/detalle-solicitud/detalle-solicitud.component';
import { DispComprasComponent } from './pages/tesoreria/disp-compras/disp-compras.component';
import { DispOtrosGastosComponent } from './pages/tesoreria/disp-otros-gastos/disp-otros-gastos.component';
import { HerramientasComponent } from './pages/herramientas/herramientas.component';
import { ListaProductosComponent } from './components/solicitudes/lista-productos/lista-productos.component';
import { OtrosGastosComponent } from './pages/solicitudes/otros-gastos/otros-gastos.component';
import { SolicitudesSoComponent } from './components/solicitudes-so/solicitudes-so.component';
import { UsuariosPComponent } from './pages/usuarios/usuarios-p/usuarios-p.component';
import { VehiculoComponent } from './pages/solicitudes/vehiculo/vehiculo.component';
import { VehiculosPComponent } from './pages/vehiculos/vehiculos-p/vehiculos-p.component';
import { ViaticosComponent } from './pages/solicitudes/viaticos/viaticos.component';
import { DetalleContabilidadComponent } from './components/detalle-contabilidad/detalle-contabilidad.component';
import { NuevoProductoComponent } from './pages/herramientas/nuevo-producto/nuevo-producto.component';
import { ListaProductosDataTableComponent } from './components/solicitudes/lista-productos-data-table/lista-productos-data-table.component';

@NgModule({
  declarations: [
    AngularTableComponent,
    AsistentePComponent,
    ComprasComponent,
    ComprasPComponent,
    ConsultarComponent,
    ConsultarTComponent,
    ContabilidadPComponent,
    DataTableComponent,
    DatosGeneralesComponent,
    DetalleCompraComponent,
    DetalleComprasComponent,
    DetalleHistoricoComponent,
    DetalleSolicitudComponent,
    DispComprasComponent,
    DispOtrosGastosComponent,
    HerramientasComponent,
    ListaProductosComponent,
    OtrosGastosComponent,
    SolicitudesSoComponent,
    UsuariosPComponent,
    VehiculoComponent,
    VehiculosPComponent,
    ViaticosComponent,
    DetalleContabilidadComponent,
    NuevoProductoComponent,
    ListaProductosDataTableComponent,
  ],
  imports: [
    CommonModule,
    CompRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ]
})
export class ComprasModule { }
