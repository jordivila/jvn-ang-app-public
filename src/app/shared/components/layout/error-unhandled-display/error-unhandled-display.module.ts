import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ErrorUnhandledDisplayComponent } from './error-unhandled-display.component';
import { ErrorUnhandledStoreModule } from '../../../services/error/error-unhandled.store.module';


@NgModule({
  imports: [
      CommonModule,
      ErrorUnhandledStoreModule,
      MaterialModule
  ],
  declarations: [ErrorUnhandledDisplayComponent],
  exports: [ErrorUnhandledDisplayComponent],
})
export class ErrorUnhandledDisplayModule { }
