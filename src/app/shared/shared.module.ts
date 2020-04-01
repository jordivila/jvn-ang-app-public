import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidationMessagesModule } from 'src/app/shared/components/validation-messages/validation-messages.module';
import { LayoutModule } from './components/layout/layout.module';
import { MaterialModule } from './components/material/material.module';
import { ModalWrapperModule } from './components/modal/modal.module';
import { TrimmedInputDirective } from './directives/trimmed';
import { InputSystemOfUnitModule } from './components/input-system-of-unit/input-system-of-unit.module';
import { SessionTimerModule } from './components/session-timer/session-timer.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ModalWrapperModule,
    LayoutModule,
    MaterialModule,
    ValidationMessagesModule,
    SessionTimerModule,
    InputSystemOfUnitModule
  ],
  declarations: [
    TrimmedInputDirective,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ModalWrapperModule,
    LayoutModule,
    TrimmedInputDirective,
    MaterialModule,
    ValidationMessagesModule,
    SessionTimerModule,
    InputSystemOfUnitModule
  ],
})
export class SharedModule { }
