import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { OnChanges } from '@angular/core';
import { MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

import { DEFAULT_THEME, ERROR_THEME, Theme, THEMES } from '../../../../../themes/themes';
import { Store } from '@ngrx/store';
import { ErrorUnhandledDetail, ErrorUnhandledState } from '../../../services/error/error-unhandled.store';
import { errUnhandledCleared } from '../../../services/error/error-unhandled.actions';
import { NotificationService } from '../../../../core/services/notification/notification.service';



@Component({
  selector: 'app-error-unhandled-display',
  templateUrl: './error-unhandled-display.component.html',
  styleUrls: ['./error-unhandled-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorUnhandledDisplayComponent implements OnInit, OnChanges {

  @ViewChild(CdkPortal, { static: false }) cdkPortal: CdkPortal;
  @Input() errorUnhandled: ErrorUnhandledDetail;

  private errorSnackBarRef: MatSnackBarRef<SimpleSnackBar>;
  private overlayRef: OverlayRef;

  constructor(
    private store: Store<ErrorUnhandledState>,
    private notificationService: NotificationService,
    private renderer: Renderer2,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef) {

  }

  ngOnInit() {}

  ngOnChanges() {
    if (this.errorUnhandled && this.errorUnhandled) {
      this.onErrorUnhandled(this.errorUnhandled);
    }
  }

  onErrorUnhandled(error: ErrorUnhandledDetail) {
    const message = `The application has encountered an unknown error.`;
    const title = 'Unhandled error';
    const doneFn = () => {
      this.onErrorUnhandledClear();
    };

    this.overlayRef = this.overlayCreate();
    this.errorSnackBarRef = this.notificationService.errorUnhandled(message, title, doneFn, (this.cdkPortal).viewContainerRef);
    this.themeSet(ERROR_THEME);
  }

  onErrorUnhandledClear() {
    this.overlayRef.detach();
    this.store.dispatch(errUnhandledCleared());
    this.errorSnackBarRef.dismiss();
    this.themeSet(DEFAULT_THEME);
  }

  private themeSet(theme: Theme) {
    THEMES.forEach((value: Theme) => this.renderer.removeClass(document.body, value.key));
    this.renderer.addClass(document.body, theme.key);
  }

  private overlayCreate() {
    const config = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally(),
      width: 500,
      height: 600,
    });


    const overlayRef = this.overlay.create(config);
    overlayRef.attach(this.cdkPortal);
    overlayRef.backdropClick().subscribe(() => {
      // do nothihg. We will close overlay just when the user clicks on the snack bar
    });

    return overlayRef;
  }
}
