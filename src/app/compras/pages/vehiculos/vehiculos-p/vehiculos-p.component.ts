import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehiculos-p',
  templateUrl: './vehiculos-p.component.html',
  styles: [
  ]
})
export class VehiculosPComponent implements OnInit {
  tabs = ['Solicitudes'];
  selected = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
