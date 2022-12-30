import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styles: [`
    p {
      color: #002e5f;
    }
  `]
})
export class SpinnerComponent implements OnInit {
  // @Input() msg: string = 'Cargando';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) { }

  ngOnInit(): void {
  }

}
