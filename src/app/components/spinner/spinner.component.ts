import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styles: []
})
export class SpinnerComponent implements OnInit {
  @Input() msg!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
