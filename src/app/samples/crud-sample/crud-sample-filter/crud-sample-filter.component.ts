import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { toggleFade, toggleIt } from '../../../shared/animations/toggle';
import { FilterComponent } from '../../../shared/components/crud/filter/filter.component';
import { Filter } from '../../../shared/components/crud/filter/models/filter';
import { CustomValidators } from '../../../shared/services/validation/validation.service';


export interface CrudFilter extends Filter {
    userId: string;
    cidPid: string;
}

@Component({
    selector: 'app-crud-sample-filter',
    templateUrl: './crud-sample-filter.component.html',
    styleUrls: ['./crud-sample-filter.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [toggleIt, toggleFade],
})
export class CrudSampleFilterComponent
    extends FilterComponent<CrudFilter>
    implements OnInit {

    @Input() title: string;
    @Input() isOpen: boolean;
    @Output() isOpenChanged = new EventEmitter<boolean>();

    constructor(public formBuilder: FormBuilder) {
        super(formBuilder);
    }

    initFormGroup(): FormGroup {
        return this.formBuilder.group({
            userID: new FormControl('', [
                CustomValidators.requiredWithTrim,
                Validators.minLength(4),
                Validators.maxLength(100)]),
            cidPid: new FormControl('', []),
            accountStatus: new FormControl('', []),
            applicationId: new FormControl('', []),
            roleId: new FormControl('', []),
        });
    }

    onFilterToggleClick($event: Event, showFilter: boolean) {
        this.isOpen = showFilter;
        this.isOpenChanged.emit(this.isOpen);
    }

    cancelClick($event: Event) {
        super.cancelClick($event);
        this.onFilterToggleClick($event, false);
    }
}
