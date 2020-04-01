import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flex-layout-sample',
  templateUrl: './flex-layout-sample.component.html',
  styleUrls: ['./flex-layout-sample.component.scss']
})
export class FlexLayoutSampleComponent implements OnInit, OnDestroy {

  private mediaSubscription: Subscription;
  public mediaQueryAlias: string;

  constructor(
    public media: MediaObserver,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.mediaSubscription =
      this.media
        .asObservable()
        .pipe(
          filter(x => x.length > 0),
          map(x => x[0])
        )
        .subscribe((change: MediaChange) => {
          this.mediaQueryAlias = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
          this.changeDetectorRef.markForCheck();
        });
  }

  ngOnDestroy() {
    if (this.mediaSubscription) {
      this.mediaSubscription.unsubscribe();
    }
  }
}
