import { DOCUMENT } from '@angular/common';
// tslint:disable-next-line
import { ChangeDetectorRef, Component, ElementRef, Inject, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
import * as _ from 'lodash';
// import * as _isEqual from 'lodash/isEqual';

interface RectPosition {
  bottom: number;
  top: number;
  left: number;
  right: number;
}


@Component({
  selector: 'app-coords-img-area-select',
  templateUrl: './coords-img-area-select.component.html',
  styleUrls: ['./coords-img-area-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoordsImgAreaSelectComponent implements OnInit, OnChanges {

  @Input() selector?: any;

  private rectLinesHandlerTemplate: string = require('html-loader!./coords-img-area-select-TemplateRectLinesHandler.html');
  private rectLinesTemplate: string = require('html-loader!./coords-img-area-select-TemplateRectLines.html');
  private rectTemplate: string = require('html-loader!./coords-img-area-select-TemplateRect.html');

  public readonly zero = 0;
  public readonly one = 1;
  public readonly ten = 10;
  public readonly thirty = 30;

  public onDrawingDownHandler = this.onDrawingDown.bind(this);
  public onDrawingMoveHandler = this.onDrawingMove.bind(this);
  public onDrawingUpHandler = this.onDrawingUp.bind(this);
  public onResizeMoveHandler = this.onResizeMove.bind(this);
  public onResizeUpHandler = this.onResizeUp.bind(this);
  public onMovingDownHandler = this.onMovingDown.bind(this);
  public onMovingMoveHandler = this.onMovingMove.bind(this);
  public onMovingUpHandler = this.onMovingUp.bind(this);
  public onResizeDownHandler = this.onResizeDown.bind(this);
  public updateSelectorHandler = this.updateSelector.bind(this);

  public aspectRatio: number; // free shape
  public binded: boolean;
  public click: boolean;
  public centerX: number;
  public centerY: number;
  public startX: number;
  public startY: number;
  public rectPosition: RectPosition;
  public type: string;

  public $document: JQuery<any>;
  public $element: JQuery<any>;
  public $rect: JQuery<any>;
  public $shadow: JQuery<any>;
  public $shadowLeft: JQuery<any>;
  public $shadowCenterTop: JQuery<any>;
  public $shadowCenterBottom: JQuery<any>;
  public $shadowRight: JQuery<any>;
  public $lines: JQuery<any>;
  public $handles: JQuery<any>;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.$document = $(this.document);
    this.$element = $(this.elementRef.nativeElement);
    //
    this.aspectRatio = 0; // free shape
    this.binded = false;
    this.click = false;
    this.centerX = null;
    this.centerY = null;
    this.startX = null;
    this.startY = null;
    this.rectPosition = null;
    this.type = null;

    this.selector = this.selector || {};
    this.selector.clear = this.clear.bind(this);
    this.selector.enabled = true;
    // this.selectorWatch = this.$scope.$watch('$ctrl.selector', this.updateSelectorHandler, true);

    this.rectElementsCreate();
    this.bind();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selector && this.$document) {
      this.updateSelector((changes.selector as SimpleChange).currentValue, (changes.selector as SimpleChange).previousValue);
    }
  }


  /**
   *  clear - removes selector, $rect & $shadow
   */
  clear() {
    this.selector.x1 = this.selector.x2 = this.selector.y1 = this.selector.y2 = undefined;
    this.$rect.css('display', 'none');
    this.$shadow.css('display', 'none');
  }

  /**
   *  rectElementsCreate - creates DOM elements based on HTML templates
   */
  rectElementsCreate() {

    const domParser = new DOMParser();
    const parseThis = (str: string) => domParser.parseFromString(str, 'text/html').body.firstElementChild as HTMLElement;
    const parseThisList = (str: string) => domParser.parseFromString(str, 'text/html').body.childNodes as NodeListOf<HTMLElement>;

    this.$rect = $(parseThis(this.rectTemplate));
    this.$lines = $(parseThisList(this.rectLinesTemplate));
    this.$handles = $(parseThisList(this.rectLinesHandlerTemplate));

    this.$shadow = $(parseThis('<div class="app-cords-shadow" />'));
    this.$shadowLeft = $(parseThis('<div class="app-cords-shadow left" />'));
    this.$shadowCenterTop = $(parseThis('<div class="app-cords-shadow center top" />'));
    this.$shadowCenterBottom = $(parseThis('<div class="app-cords-shadow center bottom"> /'));
    this.$shadowRight = $(parseThis('<div class="app-cords-shadow right" />'));

    this.$element
      .append(this.$rect.append(this.$lines).append(this.$handles))
      .append(this.$shadow
        .append(this.$shadowLeft)
        .append(this.$shadowCenterTop)
        .append(this.$shadowCenterBottom)
        .append(this.$shadowRight));
  }

  offset(element) {
    const zero = 0;
    let documentElem;
    let box = {
      left: zero,
      top: zero
    };
    const doc = element && element[zero].ownerDocument;
    documentElem = doc.documentElement;
    if (element[zero].getBoundingClientRect) {
      box = element[zero].getBoundingClientRect();
    }
    return {
      left: box.left + (window.pageXOffset || documentElem.scrollLeft) - (documentElem.clientLeft || zero),
      top: box.top + (window.pageYOffset || documentElem.scrollTop) - (documentElem.clientTop || zero)
    };
  }

  update(x1, y1, x2, y2) {
    const height = parseInt(this.$element.css('height').replace('px', ''), 0);
    const width = parseInt(this.$element.css('width').replace('px', ''), 0);
    x2 = x2 < this.zero ? this.zero : x2;
    x2 = x2 > width ? width : x2;
    y2 = y2 < this.zero ? this.zero : y2;
    y2 = y2 > height ? height : y2;
    const position = {
      bottom: y2 > y1 ? height - y2 : height - y1,
      left: x1 < x2 ? x1 : x2,
      right: x2 > x1 ? width - x2 : width - x1,
      top: y1 < y2 ? y1 : y2
    };
    this.updateRect(position, width, height);
  }

  updateShadow(position, width, height) {
    this.$shadow.css('display', 'block');
    this.$shadowLeft.css('right', `${width - position.left}px`);
    this.$shadowRight.css('left', `${width - position.right}px`);
    this.$shadowCenterTop.css('left', `${position.left}px`);
    this.$shadowCenterTop.css('right', `${position.right}px`);
    this.$shadowCenterTop.css('bottom', `${height - position.top}px`);
    this.$shadowCenterBottom.css('left', `${position.left}px`);
    this.$shadowCenterBottom.css('right', `${position.right}px`);
    this.$shadowCenterBottom.css('top', `${height - position.bottom}px`);
  }

  updateRect(position, width, height) {
    if (!position) {
      return;
    }

    this.updateShadow(position, width, height);
    this.$rect.css('display', 'block');
    this.$rect.css({
      bottom: `${position.bottom}px`,
      left: `${position.left}px`,
      right: `${position.right}px`,
      top: `${position.top}px`
    });
    // this.selectorWatch(); // unwatch
    this.selector.x1 = position.left;
    this.selector.y1 = position.top;
    this.selector.x2 = width - position.right;
    this.selector.y2 = height - position.bottom;
    // this.selectorWatch = this.$scope.$watch('$ctrl.selector', this.updateSelectorHandler, true);
  }

  updateSelectorEnabled(enabled) {
    this.selector.enabled = typeof enabled !== 'boolean' ? true : enabled;
    if (this.selector.enabled && this.isPositionFinite()) {
      this.bind();
      this.$element.css('z-index', this.thirty);
      this.$rect.css('display', 'block');
      this.$shadow.css('display', 'block');
    } else if (this.selector.enabled) {
      this.bind();
      this.$element.css('z-index', this.thirty);
      this.clear();
    } else {
      this.unbind();
      this.$element.css('z-index', this.ten);
      this.$rect.css('display', 'none');
      this.$shadow.css('display', 'none');
    }
  }

  updateSelector(selector, old) {
    this.updateSelectorEnabled(this.selector.enabled);

    if (_.isEqual(this.selector, old) || this.selector.enabled !== old.enabled) {
      return;
    }
    if (this.isPositionUndefined()) {
      return;
    }
    if (!this.isPositionFinite()) {
      // console.error('[ERROR]: Selector position value (x1, x2, y1, y2) is not a valid number.');
      return;
    }
    this.update(this.selector.x1, this.selector.y1, this.selector.x2, this.selector.y2);
  }

  userSelectEnable() {
    this.$document[this.zero].documentElement.className =
      this.$document[this.zero].documentElement.className.replace(' app-cords-user-select', '');
  }

  userSelectDisable() {
    this.$document[this.zero].documentElement.className += ' app-cords-user-select';
  }

  isPositionUndefined() {
    return _.isUndefined(this.selector.x1) &&
      _.isUndefined(this.selector.x2) &&
      _.isUndefined(this.selector.y1) &&
      _.isUndefined(this.selector.y2);
  }

  isPositionFinite() {
    return isFinite(this.selector.x1) &&
      isFinite(this.selector.x2) &&
      isFinite(this.selector.y1) &&
      isFinite(this.selector.y2);
  }

  bindDrawing() {
    this.$document.on('mousemove', this.onDrawingMoveHandler);
    this.$document.on('mouseup', this.onDrawingUpHandler);
  }

  unbindDrawing() {
    this.$document.off('mousemove', this.onDrawingMoveHandler);
    this.$document.off('mouseup', this.onDrawingUpHandler);
  }

  bindResize() {
    this.$document.on('mousemove', this.onResizeMoveHandler);
    this.$document.on('mouseup', this.onResizeUpHandler);
  }

  unbindResize() {
    this.$document.off('mousemove', this.onResizeMoveHandler);
    this.$document.off('mouseup', this.onResizeUpHandler);
  }

  bindMoving() {
    this.$document.on('mousemove', this.onMovingMoveHandler);
    this.$document.on('mouseup', this.onMovingUpHandler);
  }

  unbindMoving() {
    this.$document.off('mousemove', this.onMovingMoveHandler);
    this.$document.off('mouseup', this.onMovingUpHandler);
  }

  bind() {
    if (this.binded) {
      return;
    }
    this.$element.on('mousedown', this.onDrawingDownHandler);
    this.$lines.on('mousedown', this.onResizeDownHandler);
    this.$handles.on('mousedown', this.onResizeDownHandler);
    this.$rect.on('mousedown', this.onMovingDownHandler);
    this.binded = true;
  }

  unbind() {
    if (!this.binded) {
      return;
    }
    this.$element.off('mousedown', this.onDrawingDownHandler);
    this.$lines.off('mousedown', this.onResizeDownHandler);
    this.$handles.off('mousedown', this.onResizeDownHandler);
    this.$rect.off('mousedown', this.onMovingDownHandler);
    this.binded = false;
  }

  onResizeDown(event) {
    event.stopPropagation();
    this.userSelectDisable();
    this.type = $(event.target)
      .attr('class')
      .replace('app-cords-drag-handle', '')
      .replace('app-cords-drag-line', '')
      .trim();
    this.startX = event.pageX;
    this.startY = event.pageY;
    this.rectPosition = {
      bottom: parseInt(this.$rect.css('bottom'), 0),
      left: parseInt(this.$rect.css('left'), 0),
      right: parseInt(this.$rect.css('right'), 0),
      top: parseInt(this.$rect.css('top'), 0)
    };
    this.bindResize();
  }

  resizeSetBoundaries(position, height, width) {
    let aux;
    if (position.top >= height - position.bottom || position.bottom >= height - position.top) {
      aux = position.top;
      position.top = height - position.bottom;
      position.bottom = height - aux;
    }
    if (position.left >= width - position.right || position.right >= width - position.left) {
      aux = position.left;
      position.left = width - position.right;
      position.right = width - aux;
    }
  }

  resizeSetPositionDiff(position, diffX, diffY) {
    if (this.type[this.zero] === 'n') {
      position.top += diffY;
    } else if (this.type[this.zero] === 's') {
      position.bottom -= diffY;
    }
    if (this.type[this.zero] === 'w' || this.type[this.one] === 'w') {
      position.left += diffX;
    } else if (this.type[this.zero] === 'e' || this.type[this.one] === 'e') {
      position.right -= diffX;
    }
  }


  onResizeMove(event) {
    const height = this.$element.css('height').replace('px', '');
    const width = this.$element.css('width').replace('px', '');
    const diffX = event.pageX - this.startX;
    const diffY = event.pageY - this.startY;
    const position = {
      bottom: this.rectPosition.bottom,
      left: this.rectPosition.left,
      right: this.rectPosition.right,
      top: this.rectPosition.top
    };

    this.resizeSetPositionDiff(position, diffX, diffY);
    this.resizeSetBoundaries(position, height, width);
    position.top = position.top < this.zero ? this.zero : position.top;
    position.bottom = position.bottom < this.zero ? this.zero : position.bottom;
    position.left = position.left < this.zero ? this.zero : position.left;
    position.right = position.right < this.zero ? this.zero : position.right;
    // this.$scope.$apply(() => {

    this.updateRect(position, width, height);
    this.changeDetectorRef.markForCheck();
    // });

  }


  onResizeUp(event) {
    this.userSelectEnable();
    this.unbindResize();
  }

  onDrawingDown(event) {
    this.userSelectDisable();
    const position = this.offset(this.$element);
    this.centerX = event.pageX - position.left;
    this.centerY = event.pageY - position.top;
    this.click = true;
    this.bindDrawing();
  }


  onDrawingMove(event) {
    this.click = false;
    const position = this.offset(this.$element);
    const currentX = event.pageX - position.left;
    const currentY = event.pageY - position.top;
    // this.$scope.$apply(() => {
    this.update(this.centerX, this.centerY, currentX, currentY);
    this.changeDetectorRef.markForCheck();
    // });
  }


  onDrawingUp(event) {
    this.userSelectEnable();
    if (this.click) {
      // this.$scope.$apply(this.clear());
      this.clear();
      this.changeDetectorRef.markForCheck();
    }
    this.unbindDrawing();
  }


  onMovingDown(event) {
    event.stopPropagation();
    this.userSelectDisable();
    this.startX = event.pageX;
    this.startY = event.pageY;
    this.rectPosition = {
      bottom: parseInt(this.$rect.css('bottom'), 0),
      left: parseInt(this.$rect.css('left'), 0),
      right: parseInt(this.$rect.css('right'), 0),
      top: parseInt(this.$rect.css('top'), 0)
    };
    this.bindMoving();
  }


  onMovingMoveCheckBoundaries(position) {
    if (position.top < this.zero) {
      position.bottom = position.bottom + position.top;
      position.top = 0;
    }
    if (position.bottom < this.zero) {
      position.top = position.bottom + position.top;
      position.bottom = 0;
    }
    if (position.left < this.zero) {
      position.right = position.right + position.left;
      position.left = 0;
    }
    if (position.right < this.zero) {
      position.left = position.left + position.right;
      position.right = 0;
    }
  }

  onMovingMove(event) {
    const height = this.$element.css('height').replace('px', '');
    const width = this.$element.css('width').replace('px', '');
    const diffX = event.pageX - this.startX;
    const diffY = event.pageY - this.startY;
    const position = {
      bottom: this.rectPosition.bottom - diffY,
      left: this.rectPosition.left + diffX,
      right: this.rectPosition.right - diffX,
      top: this.rectPosition.top + diffY
    };
    this.onMovingMoveCheckBoundaries(position);
    // this.$scope.$apply(() => {
    this.updateRect(position, width, height);
    this.changeDetectorRef.markForCheck();
    // });
  }

  onMovingUp(event) {
    this.userSelectEnable();
    this.unbindMoving();
  }

















}
