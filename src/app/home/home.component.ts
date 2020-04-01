import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { runtimeEnvironment } from '../../environments/runtime-environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  public podName = '';
  public nodeName = '';

  constructor() {
    this.podName = runtimeEnvironment.podName;
    this.nodeName = runtimeEnvironment.nodeName;
  }

  ngOnInit() { }
}
