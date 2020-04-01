import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductListItem } from '../product-viewer-list.dto';

@Component({
  selector: 'app-power-design-tools',
  templateUrl: './power-design-tools.component.html',
  styleUrls: ['./power-design-tools.component.scss']
})
export class PowerDesignToolsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public productListItems: ProductListItem[] = null;

  ngOnInit() {
    this.productListItems = [
      {
        id: 1,
        image: require('./images/img-powerinductor-buck.png'),
        title: 'BuckPowerInductor',
        data: { link: '../detail/4/applicationbar/BuckConverter/on' }
      },
      {
        id: 1,
        image: require('./images/img-powerinductor-boost.png'),
        title: 'BoostPowerInductor',
        data: { link: '../detail/4/applicationbar/BoostConverter/on' }

      },
      {
        id: 1,
        image: require('./images/img-powerinductor-sepic.png'),
        title: 'SepicPowerInductor',
        data: { link: '../detail/4/applicationbar/SepicConverter/on' }
      },
      {
        id: 1,
        image: require('./images/img-powerinductor-loss.png'),
        title: 'LossPowerInductor',
        data: { link: '../detail/4/applicationbar/LossCalculator/on' }
      },
      {
        id: 1,
        image: require('./images/img-pfc-app.png'),
        title: 'PFC Chokes',
        data: { link: '../detail/6/applicationbar/PFC/on' }
      },
      {
        id: 1,
        image: require('./images/img-wirelesspower-matcher.png'),
        title: 'wpccMatcher',
        data: { link: '../detail/15/applicationbar//on' }
      },
      {
        id: 1,
        image: require('./images/article-saturation_current.png'),
        title: 'saturation-current-ambtemp',
        data: { link: '../detail/4/infopanels/LIT/sel/8A/selecteditems/7443…74438357010/size/asc/L/gte:1uH+lte:1uH/Ir/gte:2A/' }
      },
      {
        id: 1,
        image: require('./images/article-temperature_rise.png'),
        title: 'temperature-rise-current',
        data: { link: '../detail/4/infopanels/TIT/sel/1A/select…7810,744778112/productdata/=74477810/series/WE-PD' }
      },
      {
        id: 1,
        image: require('./images/img-flyback.png'),
        title: 'Transformer for DCM Flyback',
        data: { link: '../detail/31/applicationbar/FlyDCM/on' }
      },
      {
        id: 1,
        image: require('./images/img-flyback.png'),
        title: 'Transformer for BM Flyback',
        data: { link: '../detail/31/applicationbar/FlyBCM/on' }
      },
      {
        id: 1,
        image: require('./images/img-flyback.png'),
        title: 'Transformer for QR Flyback',
        data: { link: '../detail/31/applicationbar/FlyQRM/on' }
      }
    ];
  }

  onVisitClick(item: ProductListItem) {
    this.router.navigate([item.data.link], { relativeTo: this.activatedRoute });
  }

}
