import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AsistentePComponent } from './pages/asistente/asistente-p/asistente-p.component';
import { ComprasPComponent } from './pages/compras/compras-p/compras-p.component';
import { ContabilidadPComponent } from './pages/contabilidad/contabilidad-p/contabilidad-p.component';
import { HerramientasComponent } from './pages/herramientas/herramientas.component';
import { NuevoProductoComponent } from './pages/herramientas/nuevo-producto/nuevo-producto.component';
import { ComprasComponent } from './pages/solicitudes/compras/compras.component';
import { ConsultarComponent } from './pages/solicitudes/consultar/consultar.component';
import { OtrosGastosComponent } from './pages/solicitudes/otros-gastos/otros-gastos.component';
import { VehiculoComponent } from './pages/solicitudes/vehiculo/vehiculo.component';
import { ViaticosComponent } from './pages/solicitudes/viaticos/viaticos.component';
import { ConsultarTComponent } from './pages/tesoreria/consultar-t/consultar-t.component';
import { DispComprasComponent } from './pages/tesoreria/disp-compras/disp-compras.component';
import { DispOtrosGastosComponent } from './pages/tesoreria/disp-otros-gastos/disp-otros-gastos.component';
import { UsuariosPComponent } from './pages/usuarios/usuarios-p/usuarios-p.component';
import { VehiculosPComponent } from './pages/vehiculos/vehiculos-p/vehiculos-p.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'asistente',
        component: AsistentePComponent
      },
      {
        path: 'compras',
        component: ComprasPComponent
      },
      {
        path: 'contabilidad',
        component: ContabilidadPComponent
      },
      {
        path: 'herramientas',
        component: HerramientasComponent
      },
      {
        path: 'herramientas/nuevoproducto',
        component: NuevoProductoComponent
      },
      {
        path: 'solicitudes/compras',
        component: ComprasComponent
      },
      {
        path: 'solicitudes/compras/:id/:tipo',
        component: ComprasComponent
      },
      {
        path: 'solicitudes/consultar',
        component: ConsultarComponent
      },
      {
        path: 'solicitudes/otros-gastos',
        component: OtrosGastosComponent
      },
      {
        path: 'solicitudes/vehiculo',
        component: VehiculoComponent
      },
      {
        path: 'solicitudes/viaticos',
        component: ViaticosComponent
      },
      {
        path: 'tesoreria/consultar',
        component: ConsultarTComponent
      },
      {
        path: 'tesoreria/disp-compras',
        component: DispComprasComponent
      },
      {
        path: 'tesoreria/disp-otros-gastos',
        component: DispOtrosGastosComponent
      },
      {
        path: 'usuarios',
        component: UsuariosPComponent
      },
      {
        path: 'vehiculos',
        component: VehiculosPComponent
      },
      {
        path: '**',
        redirectTo: 'solicitudes/consultar'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class CompRoutingModule { }
