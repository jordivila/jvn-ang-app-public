import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BusyIndicatorService } from './busy-indicator.service';
import { BusyIndicatorState } from './busy-indicator.dto';
import { Guid } from 'src/app/shared/helpers/guid';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-busy-indicator',
  templateUrl: 'busy-indicator.component.html',
  styleUrls: ['busy-indicator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BusyIndicatorComponent implements OnInit, OnDestroy {

  @Input() id: Guid;

  public localState$: Observable<BusyIndicatorState>;
  // private subscription: Subscription;

  constructor(
    private busyIndicatorService: BusyIndicatorService,
    private changeDetector: ChangeDetectorRef) { }

  // ngOnInit() {
  //   this.localState$ = this.store.pipe(select(busyIndicatorFeatureKey));
  // }

  ngOnInit() {

    // this.subscription =
    this.localState$ = this.busyIndicatorService.get(this.id);
    // .subscribe((state: BusyIndicatorState) => {

    //   this.changeDetector.markForCheck();
    // });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
