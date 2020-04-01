import { Injectable, ViewContainerRef } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {

  private snackbarOptions: MatSnackBarConfig;

  constructor(public snackBar: MatSnackBar) {
    this.snackbarOptions = {
      verticalPosition: 'top'
    } as MatSnackBarConfig;
  }

  success(message: string): void {
    this.snackBar.open(message, null, Object.assign({}, this.snackbarOptions, { duration: 3500 }));
  }

  error(message: string): MatSnackBarRef<SimpleSnackBar> {
    const snackRef = this.snackBar.open(message, 'Ok', this.snackbarOptions);

    snackRef.onAction()
      .subscribe((value: void) => {

      });

    return snackRef;
  }

  errorUnhandled(message: string, title: string, doneFn: () => void
    ,            viewContainerRef: ViewContainerRef): MatSnackBarRef<SimpleSnackBar> {
    const snackRef = this.snackBar.open(message, 'Ok', {
      verticalPosition: 'top',
      viewContainerRef
    });

    snackRef.onAction()
      .subscribe((value: void) => {
        doneFn();
      });

    return snackRef;
  }
}
