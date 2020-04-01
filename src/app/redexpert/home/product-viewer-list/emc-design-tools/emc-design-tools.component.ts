import { Component, OnInit } from '@angular/core';
import { ProductListItem } from '../product-viewer-list.dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-emc-design-tools',
  templateUrl: './emc-design-tools.component.html',
  styleUrls: ['./emc-design-tools.component.scss']
})
export class EmcDesignToolsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public productListItems: ProductListItem[] = null;

  ngOnInit() {
    this.productListItems = [
      {
        id: 1,
        data: { link: '../detail/1/applicationbar/System/on' },
        image: require('./images/img-pcb-ferrites-filter.png'),
        title: 'FilterPCB'
      },
      {
        id: 1,
        image: require('./images/img-pcb-ferrites-pulse.png'),
        title: 'PulsePCB',
        data: { link: '../detail/1/applicationbar/Pulse/on' }
      },
      {
        id: 1,
        image: require('./images/img-cable-ferrites-filter.png'),
        title: 'FilterCableFerrites',
        data: { link: '../detail/2/applicationbar/System/on' }
      },

      {
        id: 1,
        image: require('./images/img-cmcd-filter.png'),
        title: 'cmcdataFilter',
        data: { link: '../detail/23/applicationbar/System/on' }
      },
      {
        id: 1,
        image: require('./images/article-impedance.png'),
        title: 'impedance-dcbias',
        data: { link: '../detail/1/infopanels/FZI/mea/1A/FXI/me…/74279228260,74279228600/productdata/=74279228260' }
      }
    ];
  }

  onVisitClick(item: ProductListItem) {
    this.router.navigate([item.data.link], { relativeTo: this.activatedRoute });
  }
}
