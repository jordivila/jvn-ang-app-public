import { AfterViewInit, Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { OfflineModuleMetadata } from '../api/offline-module-data/offline-module-data-api.dto';
import { OfflineModuleApiService } from '../api/offline-module-data/offline-module-data-api.service';
import { ProductViewerGridActionEventArgs, RowActionType } from './product-viewer-grid/product-viewer-grid.component';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-viewer-detail',
  templateUrl: './product-viewer-detail.component.html',
  styleUrls: ['./product-viewer-detail.component.scss']
})
export class ProductViewerDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  public isOpen = false;
  public selectedIds: number[] = [];
  public offlineMetadata: OfflineModuleMetadata = null;
  public mediaQueryAlias: string;
  public productModuleId?: number;

  private mediaObservableSubscription: Subscription;

  constructor(
    private media: MediaObserver,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private offlineModuleApiService: OfflineModuleApiService) { }

  ngOnInit() {

    this.mediaObservableSubscription =
      this.media
        .asObservable()
        .pipe(
          filter((changes: MediaChange[]) => changes.length > 0),
          map((changes: MediaChange[]) => changes[0])
        )
        .subscribe((change: MediaChange) => {
          this.mediaQueryAlias = change.mqAlias;
        });

    this.route.paramMap.subscribe(params => {
      this.productModuleId = parseInt(params.get('id'), null);
      this.onDataDemand();
    });
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    if (this.mediaObservableSubscription) {
      this.mediaObservableSubscription.unsubscribe();
    }
  }

  onDataDemand() {
    this.offlineModuleApiService
      .get(this.productModuleId)
      .then(dataResults => {
        this.offlineMetadata = dataResults;
        this.changeDetectorRef.detectChanges();
      });
  }

  onActionTriggeredEvent(eventArgs: ProductViewerGridActionEventArgs) {
    if (eventArgs.type === 'show_chart' as RowActionType) {
      this.selectedIds = [eventArgs.item.ID];
    }

    if (eventArgs.type === 'multiline_chart' as RowActionType) {
      this.selectedIds = [...this.selectedIds, eventArgs.item.ID];
    }

    this.isOpen = true;
  }

  onFormClose() {
    this.isOpen = false;
  }
}
