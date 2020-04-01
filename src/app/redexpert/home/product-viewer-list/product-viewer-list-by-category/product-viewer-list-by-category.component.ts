import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ProductListItemGroupedByKey, ProductListItem } from '../product-viewer-list.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { OfflineModuleDataList } from '../../api/offline-module-data/offline-module-data-list.dto';
import { OfflineModuleApiService } from '../../api/offline-module-data/offline-module-data-api.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { GuidHelper } from '../../../../shared/helpers/guid-helper';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-viewer-list-by-category',
  templateUrl: './product-viewer-list-by-category.component.html',
  styleUrls: ['./product-viewer-list-by-category.component.scss'],
})
export class ProductViewerListByCategoryComponent implements OnInit, OnDestroy {

  private static componentId = GuidHelper.create().value;
  private static groupKeySelectedStorageKey = ProductViewerListByCategoryComponent.componentId;
  private mediaSubcription: Subscription;

  public mediaQueryAlias: string;
  public productDataList: OfflineModuleDataList[];
  public groupKeys: string[] = null;
  public groupModules: ProductListItemGroupedByKey = null;
  public groupKeySelected?: number = null;

  constructor(
    private offlineModuleApiService: OfflineModuleApiService,
    private media: MediaObserver,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {

    this.media
      .asObservable()
      .pipe(
        filter(x => x.length > 0),
        map(x => x[0])
      )
      .subscribe((change: MediaChange) => {
        this.mediaQueryAlias = change.mqAlias;
        this.changeDetectorRef.markForCheck();
      });

    this.getData().then(() => {
      this.onDataMap();
      this.initGroupKeySelected();
      this.changeDetectorRef.detectChanges();
    });
  }


  private initGroupKeySelected() {
    const value = sessionStorage.getItem(ProductViewerListByCategoryComponent.groupKeySelectedStorageKey);
    if (value !== '') {
      this.groupKeySelected = parseInt(value, 0);
    }
  }

  getData() {
    return this.offlineModuleApiService
      .list()
      .then((dataResults: OfflineModuleDataList[]) => {
        this.productDataList = dataResults;
      });
  }

  onDataMap() {
    this.groupModules = this.productDataList.reduce((prv, curr) => {
      (prv[curr.Menu.category] = prv[curr.Menu.category] || []).push({
        id: curr.ModuleID,
        title: curr.Menu.title,
        image: `${this.offlineModuleApiService.urlImages()}/${curr.Menu.groupimages}.png`,
        description: curr.Menu.sumary
      } as ProductListItem);
      return prv;
    }, {});
    this.groupKeys = Object.keys(this.groupModules);
  }

  onVisitClick(moduleSelected: ProductListItem, groupKeySelected: string) {
    const groupKeyIndex = this.groupKeys.findIndex(value => value === groupKeySelected);
    sessionStorage.setItem(ProductViewerListByCategoryComponent.groupKeySelectedStorageKey, groupKeyIndex.toString());
    // this.router.navigate([`../../../smodule/${moduleSelected.id}`], { relativeTo: this.activatedRoute });
    this.router.navigate([`../../detail/${moduleSelected.id}`], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    if (this.mediaSubcription) {
      this.mediaSubcription.unsubscribe();
    }
  }

}
