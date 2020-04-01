import { Component, OnInit, Input } from '@angular/core';
import { UnitSystemDto } from 'src/app/core/api/units/units-api.dto';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-system-of-unit-form-field',
  templateUrl: './input-system-of-unit-form-field.component.html',
  styleUrls: ['./input-system-of-unit-form-field.component.scss']
})
export class InputSystemOfUnitFormFieldComponent implements OnInit {

  @Input() theLabel: string;
  @Input() theSystemOfUnit: UnitSystemDto;
  @Input() theForm: FormGroup;
  @Input() theFormControlName: string;

  constructor() { }

  ngOnInit(): void {}

}
