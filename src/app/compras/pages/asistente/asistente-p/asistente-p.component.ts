import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistente-p',
  templateUrl: './asistente-p.component.html',
  styles: [
  ]
})
export class AsistentePComponent implements OnInit {
  tabs = ['Solicitudes'];
  selected = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
