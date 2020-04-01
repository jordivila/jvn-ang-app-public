import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { UnitSystemDto, UnitSystemPrefix } from 'src/app/core/api/units/units-api.dto';

@Component({
  selector: 'app-input-system-of-unit',
  templateUrl: './input-system-of-unit.component.html',
  styleUrls: ['./input-system-of-unit.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: InputSystemOfUnitComponent }],
})
export class InputSystemOfUnitComponent
  implements ControlValueAccessor, MatFormFieldControl<string>, OnInit, OnDestroy {

  static nextId = 0;
  // acceptance coercion members should be inherited
  // https://github.com/angular/angular/issues/33830  => closed ?
  // static ngAcceptInputType_disabled: boolean | string | null | undefined;
  // static ngAcceptInputType_required: boolean | string | null | undefined;

  formGroup: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'app-input-system-of-unit';

  theUnitSystemList: UnitSystemPrefix[];
  public theUnitSystemListItemSelected: number;

  private placeholderInternalValue: string;
  private requiredInternalValue = false;
  private disabledInternalValue = false;


  @Input() label: string;
  @Input() unitSystem: UnitSystemDto;
  @HostBinding('attr.aria-describedby') describedBy = '';
  @HostBinding() id = `${this.controlType}-${InputSystemOfUnitComponent.nextId++}`;
  @HostBinding('class.floating')
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    const { value: { theUnitSystemValue, theUnitSystemListItemSelected } } = this.formGroup;
    return !theUnitSystemValue;
  }

  @Input()
  get placeholder(): string { return this.placeholderInternalValue; }
  set placeholder(value: string) {
    this.placeholderInternalValue = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean { return this.requiredInternalValue; }
  set required(value: boolean) {
    this.requiredInternalValue = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean { return this.disabledInternalValue; }
  set disabled(value: boolean) {
    this.disabledInternalValue = coerceBooleanProperty(value);
    this.disabledInternalValue ? this.formGroup.disable() : this.formGroup.enable();
    this.stateChanges.next();
  }

  @Input()
  get value(): string | null {
    const { value: { theUnitSystemValue, theUnitSystemSelected } } = this.formGroup;
    if ((theUnitSystemValue.length > 0) && (theUnitSystemSelected.toString().length > 0)) {
      return (theUnitSystemValue * this.theUnitSystemListItemSelected).toString();
    }
    return null;
  }
  set value(value: string | null) {
    const theUnitSystemValue = value || '';
    const theUnitSystemSelected = this.unitSystem.Base;
    this.formGroup.setValue({ theUnitSystemValue, theUnitSystemSelected });
    this.stateChanges.next();
  }

  get errorState() {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }

  constructor(
    public formBuilder: FormBuilder,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    this.formGroup = formBuilder.group({
      theUnitSystemValue: '',
      theUnitSystemSelected: '',
    });

    focusMonitor.monitor(elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (!this.unitSystem) {
      throw new Error('"unitSystem" is a required @Input property');
    }

    this.theUnitSystemList = Object
      .keys(this.unitSystem.Prefixes)
      .map(key => this.unitSystem.Prefixes[key])
      .sort((a, b) => a.Factor - b.Factor);

    this.theUnitSystemListItemSelected = this.unitSystem.Base;
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      if (this.elementRef) {
        this.elementRef.nativeElement.querySelector('input').focus();
      }
    }
  }

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    this.onChange(this.value);
  }
}
