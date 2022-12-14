import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [
    `
    `
  ]
})
export class HomePageComponent implements OnInit {
  menuState: boolean = true;
  year: number = 0;

  constructor(private _router: Router,
              private activatedRoute: ActivatedRoute)
  {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    // this.activatedRoute.url
    //     .subscribe( url => console.log(url));
  }

  cambiaEstado(estado: boolean): void {
    this.menuState = estado;
  }

}
