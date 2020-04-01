import { Component, Input, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BusyIndicatorService } from 'src/app/core/services/busy-indicator/busy-indicator.service';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { FormCrud, FormCrudComponent } from '../form.component';


@Component({
  selector: 'app-form-side-templated',
  templateUrl: './form-side-templated.component.html',
  styleUrls: ['./form-side-templated.component.scss']
})
export class FormSideTemplatedComponent<TModel>
  extends FormCrudComponent<TModel>
  implements OnInit, FormCrud<TModel> {

  @Input() closeForm: () => void;
  @Input() initModels: () => Promise<TModel>;
  @Input() initFormGroup: () => FormGroup;
  @Input() isEdit: () => boolean;
  @Input() savePost: (theForm: FormGroup, theModel: TModel) => Observable<object>;
  @Input() savePut: (theForm: FormGroup, theModel: TModel) => Observable<object>;
  @Input() formTemplate: TemplateRef<any>;
  @Input() isOpen: boolean;
  @Input() msgTitle: string;
  @Input() msgGettingFormData: string;
  @Input() msgErrorGettingFormData: string;
  @Input() msgSavingData: string;
  @Input() msgDataSavedSuccessfully: string;

  constructor(
    public notificationService: NotificationService,
    public busyIndicatorService: BusyIndicatorService) {

    super(notificationService, busyIndicatorService);
  }

  ngOnInit() {

    const argException = 'FormSideTemplated Argument exception.';

    if (!this.initModels) { throw new Error(`${argException} "initModels"`); }
    if (!this.initFormGroup) { throw new Error(`${argException} "initFormGroup"`); }
    if (!this.closeForm) { throw new Error(`${argException} "closeForm"`); }
    if (!this.isEdit) { throw new Error(`${argException} "isEdit"`); }
    if (!this.savePost) { throw new Error(`${argException} "savePost"`); }
    if (!this.savePut) { throw new Error(`${argException} "savePut"`); }

    super.ngOnInit();
  }

}
