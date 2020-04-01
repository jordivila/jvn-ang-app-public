import { Component, OnInit } from '@angular/core';
import { ProductListItem } from '../product-viewer-list.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { REDEXPERT_HOME_ARTICLE_COMP_ROUTE_PATH } from '../../product-viewer-routing-paths';

@Component({
  selector: 'app-product-viewer-default',
  templateUrl: './product-viewer-default.component.html',
  styleUrls: ['./product-viewer-default.component.scss']
})
export class ProductViewerDefaultComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  public productListItems: ProductListItem[] = null;

  ngOnInit() {
    this.productListItems = [
      {
        id: 1,
        data: { link: `./${REDEXPERT_HOME_ARTICLE_COMP_ROUTE_PATH}` },
        image: require('./images/article-perfectCompSelect.jpg'),
        title: 'Fast & Easy Component Selection'
      },
      {
        id: 2,
        data: { link: './emc-design-tools' },
        image: require('./images/article-application.jpg'),
        title: 'EMI Filter Design Tools'
      },
      {
        id: 3,
        data: { link: './power-design-tools' },
        image: require('./images/article-simulation.jpg'),
        title: 'Power Stage Design Tools'
      },
      {
        id: 4,
        data: { link: './' },
        image: require('./images/article-REDesign.jpg'),
        title: 'Visible LED'
      },
      {
        id: 5,
        data: { link: './' },
        image: require('./images/article-REDesign2.jpg'),
        title: 'MagI³C Power Module'
      },
      {
        id: 6,
        data: { link: './' },
        image: require('./images/article-REDesign3.jpg'),
        title: 'Wireless Power Transmission'
      }

    ];
  }

  onVisitClick(item: ProductListItem) {
    this.router.navigate([item.data.link], { relativeTo: this.activatedRoute });
  }
}
