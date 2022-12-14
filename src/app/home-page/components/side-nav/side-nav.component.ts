import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styles: []
})
export class SideNavComponent implements OnInit {

  // @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // oculta(): void {
  //   this.close.emit(false);
  // }

}
