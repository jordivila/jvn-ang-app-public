import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductListItem } from '../product-viewer-list.dto';

@Component({
  selector: 'app-product-viewer-list-item',
  templateUrl: './product-viewer-list-item.component.html',
  styleUrls: ['./product-viewer-list-item.component.scss']
})
export class ProductViewerListItemComponent implements OnInit {

  @Input() item: ProductListItem;
  @Output() visitClick = new EventEmitter<ProductListItem>();

  constructor() { }

  ngOnInit() { }

  onVisitClick(item: ProductListItem) {
    this.visitClick.emit(item);
  }
}
