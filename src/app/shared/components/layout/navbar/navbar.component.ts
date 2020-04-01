import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Event, Router, Route } from '@angular/router';

import { RouteDataCustomized, RouteDataChildCustomized } from '../../../models/route-data-customized';
import { NavbarItem } from './navbar.dto';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  @Input() isOpen: boolean;
  @Output() navBarItemClickEvent = new EventEmitter<NavbarItem>();
  @Output() navBarCloseClickEvent = new EventEmitter<boolean>();

  public items: NavbarItem[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.initNavbarMenu();
  }

  onClickItem($event: Event, navBarItem: NavbarItem) {
    this.navBarItemClickEvent.emit(navBarItem);
    this.navBarCloseClickEvent.emit();
  }

  onNavbarClose() {
    this.navBarCloseClickEvent.emit(!this.isOpen);
  }

  private routeDataMapToNavBarItem(routeItem: Route, routeData: RouteDataCustomized): NavbarItem {
    return {
      title: routeData.title,
      icon: routeData.icon,
      action: routeItem.path,
      selected: false
    } as NavbarItem;
  }

  private routeDataChildMapToNavBarItem(parent: Route, child: RouteDataChildCustomized): NavbarItem {
    return {
      title: child.title,
      icon: child.icon,
      action: child.subPath,
      selected: false
    } as NavbarItem;
  }

  private initNavbarMenu() {

    this.items = this.router.config.reduce<NavbarItem[]>(
      (previous: NavbarItem[], routeItem: Route, index: number, array: Route[]): NavbarItem[] => {

        if (routeItem.data && (routeItem.data as RouteDataCustomized).isMenuItem) {

          const routeData = (routeItem.data as RouteDataCustomized);
          const navBarItem = this.routeDataMapToNavBarItem(routeItem, routeData);

          if (Array.isArray(routeData.childs)) {
            navBarItem.childs = routeData.childs.map(x => this.routeDataChildMapToNavBarItem(routeItem, x));
          }

          previous.push(navBarItem);
        }

        return previous;
      }, []);
  }
}
