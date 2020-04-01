// import * as am4charts from '@amcharts/amcharts4/charts';
// Importing like this instead of * as amcore and * as am4charts changes module size from 775KB to 590KB
import { ValueAxis as am4chartsValueAxis } from '@amcharts/amcharts4/.internal/charts/axes/ValueAxis';
import { XYCursor as am4chartsXYCursor } from '@amcharts/amcharts4/.internal/charts/cursors/XYCursor';
// import { CircleBullet as am4chartsCircleBullet } from '@amcharts/amcharts4/.internal/charts/elements/CircleBullet';
// import { LabelBullet as am4chartsLabelBullet } from '@amcharts/amcharts4/.internal/charts/elements/LabelBullet';
import { LineSeries as am4chartsLineSeries } from '@amcharts/amcharts4/.internal/charts/series/LineSeries';
import { XYChart as am4chartsXYChart, XYChart } from '@amcharts/amcharts4/.internal/charts/types/XYChart';
import { NumberFormatter as am4coreNumberFormatter } from '@amcharts/amcharts4/.internal/core/formatters/NumberFormatter';
import { create as am4coreCreate } from '@amcharts/amcharts4/.internal/core/utils/Instance';
// import * as am4core from '@amcharts/amcharts4/core';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
// import am4themes_material from '@amcharts/amcharts4/themes/material';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FilterComponent } from '../../../../shared/components/crud/filter/filter.component';
import { Filter } from '../../../../shared/components/crud/filter/models/filter';
import { OfflineModuleMetadata } from '../../api/offline-module-data/offline-module-data-api.dto';






interface TcValuesHash {
  [id: number]: ChartData;
}

interface ChartData {
  turn1Points: TcValuesPoint[];
  turn1Axis: TcValuesAxis;
  turn2Points: TcValuesPoint[];
  turn2Axis: TcValuesAxis;
}

interface TcValuesPoint {
  x: number;
  y: number;
}

interface TcValuesAxis {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

interface ChartDom {
  id: string;
  title: string;
  chartRendered: boolean;
  chartObject?: am4chartsXYChart;
  chartDataPointsMapper: ChartProductTcValuesMapper;
  chartDataAxisMapper: ChartProductAxisMapper;
}

type ChartProductTcValuesMapper = (productId: number) => TcValuesPoint[];
type ChartProductAxisMapper = (productId: number) => TcValuesAxis;

@Component({
  selector: 'app-product-viewer-graph',
  templateUrl: './product-viewer-graph.component.html',
  styleUrls: ['./product-viewer-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductViewerGraphComponent
  extends FilterComponent<Filter>
  implements OnInit, OnChanges {

  @Input() title: string;
  @Input() isOpen: boolean;
  @Output() isOpenChanged = new EventEmitter<boolean>();

  @Input() offlineMetadata: OfflineModuleMetadata;
  @Input() productIdList: number[];
  @Input() mediaQueryAlias: string;

  private tcValuesHash: TcValuesHash = null;
  public charts: ChartDom[] = [];

  constructor(
    public formBuilder: FormBuilder) {

    super(formBuilder);
  }

  ngOnInit() {
    super.ngOnInit();


    this.charts.push({
      id: 'chartElement1',
      title: '1 Turn',
      chartObject: null,
      chartRendered: false,
      chartDataPointsMapper: (productId) => {
        return this.tcValuesHash[productId].turn1Points;
      },
      chartDataAxisMapper: (productId) => {
        return this.tcValuesHash[productId].turn1Axis;
      }
    } as ChartDom, {
      id: 'chartElement2',
      title: '2 Turn',
      chartObject: null,
      chartRendered: false,
      chartDataPointsMapper: (productId) => {
        return this.tcValuesHash[productId].turn2Points;
      },
      chartDataAxisMapper: (productId) => {
        return this.tcValuesHash[productId].turn2Axis;
      }
    } as ChartDom);


  }

  tabChanged(event: MatTabChangeEvent) {
    this.chartsRender();
  }

  initFormGroup(): FormGroup {
    return this.formBuilder.group({
      current: new FormControl('', [])
    });
  }

  onGraphToggleClick($event: Event, showGraph: boolean) {
    this.isOpen = showGraph;
    this.isOpenChanged.emit(this.isOpen);
  }

  cancelClick($event: Event) {
    super.cancelClick($event);
    this.onGraphToggleClick($event, false);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.offlineMetadata && this.offlineMetadata) {
      this.onOfflineMetadataChanges();
    }

    if (changes.productIdList && this.productIdList) {
      this.chartsClearSeries();
      this.chartsRender();
    }
  }

  private chartsClearSeries() {
    // clean all series before creating new ones
    this.charts.forEach(chart => {
      if (chart.chartObject && chart.chartObject.series) {
        while (chart.chartObject.series.length > 0) {
          chart.chartObject.series.removeIndex(0).dispose();
        }
        chart.chartRendered = false;
      }
    });
  }

  private chartsRender() {

    this.charts.forEach((chartDom: ChartDom) => {
      if ((!chartDom.chartRendered) && document.querySelector(`#${chartDom.id}`)) {
        const p = chartDom.chartObject ? Promise.resolve(chartDom.chartObject) : this.chartsInit(chartDom.id);
        p.then((chartObject: XYChart) => {
          chartDom.chartObject = chartObject;
          chartDom.chartRendered = true;
          this.productIdList.forEach(productId => {
            this.chartsAddLine(chartDom.chartObject, productId, chartDom);
          });
        });
      }
    });
  }

  private onOfflineMetadataChanges() {
    this.tcValuesHash = this.offlineMetadata.endpoints[3].value
      .reduce((previous: ChartData, current) => {
        previous[current.ID] = this.chartsDataMapItem(current);
        return previous;
      }, {});
  }

  private chartsDataMapItem(item: any): ChartData {
    /*
    as data structure depends on the module item must be "any" typed:(
    in this case: item is an  {ID: string, Values: [3]}
    where Values[0] is X
    where Values[1] is chart1turn Y
    where Values[2] is chart2turn Y
    */
    const chartData = this.chartsDataObjectCreate();

    item.Values.forEach(value => {
      const turn1Point = { x: value[0], y: value[1] } as TcValuesPoint;
      const turn2Point = { x: value[0], y: value[2] } as TcValuesPoint;

      chartData.turn1Points.push(turn1Point);
      chartData.turn2Points.push(turn2Point);

      this.chartsDataAxisSet(chartData.turn1Axis, turn1Point);
      this.chartsDataAxisSet(chartData.turn2Axis, turn2Point);
    });

    return chartData;
  }

  private chartsDataObjectCreate(): ChartData {
    return {
      turn1Points: [],
      turn2Points: [],
      turn1Axis: { xMin: null, xMax: null, yMin: null, yMax: null } as TcValuesAxis,
      turn2Axis: { xMin: null, xMax: null, yMin: null, yMax: null } as TcValuesAxis,
    } as ChartData;
  }

  private chartsDataAxisSet(xyAxis: TcValuesAxis, xyPoint: TcValuesPoint): void {
    xyAxis.xMin = xyAxis.xMin ? (xyPoint.x < xyAxis.xMin ? xyPoint.x : xyAxis.xMin) : xyPoint.x;
    xyAxis.xMax = xyAxis.xMax ? (xyPoint.x < xyAxis.xMax ? xyPoint.x : xyAxis.xMax) : xyPoint.x;
    xyAxis.yMin = xyAxis.yMin ? (xyPoint.y < xyAxis.yMin ? xyPoint.y : xyAxis.yMin) : xyPoint.y;
    xyAxis.yMax = xyAxis.yMax ? (xyPoint.y < xyAxis.yMax ? xyPoint.y : xyAxis.yMax) : xyPoint.y;
  }

  private chartsInit(domElementId) {
    return new Promise((resolve) => {
      const chart = am4coreCreate(domElementId, am4chartsXYChart);

      // Create the X Axis
      const colValueAxis = chart.xAxes.push(new am4chartsValueAxis());
      colValueAxis.numberFormatter = new am4coreNumberFormatter();
      colValueAxis.numberFormatter.numberFormat = '# \' MHz';
      /*
      NOTE on strictMinMax: if min and max are not set, setting strictMinMax to true
      will result in fixing the scale of the axis to actual lowest and highest values
      in the series within currently selected scope.
      */
      colValueAxis.strictMinMax = true;

      // Create the Y Axix
      const valueAxis = chart.yAxes.push(new am4chartsValueAxis());
      valueAxis.numberFormatter = new am4coreNumberFormatter();
      valueAxis.numberFormatter.numberFormat = '#.##\' Ω';
      colValueAxis.strictMinMax = true;
      // valueAxis.min = 0;

      // chart.legend = new am4chartsLegend();
      // chart.legend.useDefaultMarker = true;



      this.chartsAddCursor(chart);
      this.chartsAddHorizontalScrollbar(chart);
      this.chartsAddVerticalScrollbar(chart);
      resolve(chart);
    });
  }

  chartsAddCursor(chart: am4chartsXYChart) {
    // Add a Cursor to the Chart
    chart.cursor = new am4chartsXYCursor();
  }

  chartsAddHorizontalScrollbar(chart: am4chartsXYChart) {
    // Horizontal filtering scrollbar
    // chart.scrollbarX = new am4chartsXYChartScrollbar();
  }

  chartsAddVerticalScrollbar(chart: am4chartsXYChart) {
    // Vertical filtering scrollbar
    // chart.scrollbarY = new am4chartsXYChartScrollbar();
  }

  chartsAddLine(chart: am4chartsXYChart, productId: number, chartDom: ChartDom) {
    return new Promise((resolve) => {
      // console.time(`AM serie ${key}`);
      const points = chartDom.chartDataPointsMapper(productId);
      const serie = chart.series.push(new am4chartsLineSeries());
      serie.name = productId.toString();
      serie.data = points;
      // set the field that will be used for X Values
      serie.dataFields.valueX = 'x';
      // set the field that will be used for Y Values
      serie.dataFields.valueY = 'y';
      serie.strokeWidth = 3;
      serie.disabled = false;
      // const bullet = serie.bullets.push(new am4chartsCircleBullet());
      // bullet.tooltipText = 'Value: [bold]{valueY}%[/]';
      // Uncomment if we want to show the number
      // const labelBullet = serie.bullets.push(new am4chartsLabelBullet());
      // labelBullet.label.text = '{valueY}';
      // labelBullet.label.dy = -20;
      // console.timeEnd(`AM serie ${key}`);
      resolve();
    });
  }
}
