import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SolicitudGeneral } from '../../interfaces/solicitudes/solicitudGeneral.interface';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-angular-table',
  templateUrl: './angular-table.component.html',
  styles: [
    `
      table {
        width: 100%
      }
    `
  ]
})
export class AngularTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource1: MatTableDataSource<UserData>;

  @Input() solicitud!: SolicitudGeneral[];
  dataSource!: MatTableDataSource<SolicitudGeneral>;

  columnas: string[] = ['idsolicitud','s_nombre','dilacion','s_tiposolicitud','m_montosolicitud','d_fecharequerimiento','s_empresa','Etapa','s_area','s_Proveedor'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource1 = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    //console.log(this.dataSource);
    this.dataSource = new MatTableDataSource(this.solicitud);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {

    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
  }

  Buscar(event: Event) {
    const ValorBusqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = ValorBusqueda.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
