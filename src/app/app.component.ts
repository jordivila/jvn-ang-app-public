import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppState } from './app.store';
import { routerTransition } from './shared/animations/router-transition.animation';
import { RouteDataCustomized } from './shared/models/route-data-customized';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ErrorUnhandledDetail } from './shared/services/error/error-unhandled.store';
import { errorUnhandledDetail } from './shared/services/error/error-unhandled.selector';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [routerTransition],
  changeDetection: ChangeDetectionStrategy.OnPush // you shouldn't change this
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild(MatSidenav, { static: false }) matSidenav: MatSidenav;

  public isMenuOpen: boolean;
  public errorUnhandled: ErrorUnhandledDetail;
  private errorUnhandledSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {

    this.isMenuOpen = false;

    this.errorUnhandledSubscription =
      this.store.pipe(
        select(errorUnhandledDetail),
      ).subscribe(errorUnhandledState => {
        this.errorUnhandled = errorUnhandledState;
        this.changeDetectorRef.detectChanges();
      });

  }

  routerTransitionStateGet(outlet) {
    return (outlet.activatedRouteData as RouteDataCustomized).title;
  }

  ngOnDestroy() {
    if (this.errorUnhandledSubscription) {
      this.errorUnhandledSubscription.unsubscribe();
    }
  }

  onMenuToggleClick(isOpen: boolean) {
    isOpen ? this.matSidenav.open() : this.matSidenav.close();
  }

  onMenuOpenChanged(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }

}
