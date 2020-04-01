import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-route-sample',
  templateUrl: './child-route-sample.component.html',
  styleUrls: ['./child-route-sample.component.scss']
})
export class ChildRouteSampleComponent implements OnInit {

  constructor() { }

  public navLinks: any;

  ngOnInit() {
    this.navLinks = [
      { path: './', label: 'Default Route' },
      { path: 'secondary', label: 'Secondary Route' },
    ];
  }
}
