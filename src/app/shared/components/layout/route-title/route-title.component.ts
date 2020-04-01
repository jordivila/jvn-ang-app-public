import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';

import { RouteDataCustomized } from '../../../models/route-data-customized';

@Component({
  selector: 'app-route-title',
  styleUrls: ['./route-title.component.scss'],
  templateUrl: 'route-title.component.html',
})
export class RouteTitleComponent implements OnInit {

  public routeTitle: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.route.snapshot.firstChild && (this.route.snapshot.firstChild.data)) {
          if ((this.route.snapshot.firstChild.data as any).title) {
            this.routeTitle = (this.route.snapshot.firstChild.data as RouteDataCustomized).title;
          }
        }
      }
    });
  }
}
