import { OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { i18nMessages } from '../../../../core/services/i18n/i18n.config';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { BusyIndicatorService } from 'src/app/core/services/busy-indicator/busy-indicator.service';

export interface FormBase<TModel> {
  msgTitle: string;
  msgGettingFormData: string;
  msgErrorGettingFormData: string;
  msgSavingData: string;

  saveForm: (theForm: FormGroup, theModel: TModel) => void;
  initModels: () => Promise<TModel>;
  initFormGroup: () => FormGroup;
  closeForm: () => void;
}

export interface FormCrud<TModel> extends FormBase<TModel> {
  savePost: (theForm: FormGroup, theModel: TModel) => Observable<object>;
  savePut: (theForm: FormGroup, theModel: TModel) => Observable<object>;
  isEdit: () => boolean;
}

export abstract class FormBaseComponent<TModel> implements OnInit, FormBase<TModel> {

  public theForm: FormGroup; // TODO: this should be protected but AOT compiling throws exception when used in an HTML template
  public theModel: TModel;

  abstract msgTitle: string;
  abstract msgGettingFormData: string;
  abstract msgErrorGettingFormData: string;
  abstract msgSavingData: string;
  abstract msgDataSavedSuccessfully: string;

  abstract initModels: () => Promise<TModel>;
  abstract initFormGroup: () => FormGroup;
  abstract closeForm(): void;
  abstract saveData(theForm: FormGroup, theModel: TModel): Observable<object>;


  constructor(
    public notificationService: NotificationService,
    public busyIndicatorService: BusyIndicatorService) {

  }

  onInitFormEnd = () => { };
  ngOnInit() {
    this.busyIndicatorService.show(this.msgGettingFormData);

    this.initModels()
      .then((value: TModel) => {
        this.theModel = value;
        this.theForm = this.initFormGroup();
        // this.theForm.setValue(this.theModel);
        this.theForm.patchValue(this.theModel);
        this.onInitFormEnd();
        this.busyIndicatorService.hide();
      })
      .catch((reason: any) => {
        this.busyIndicatorService.hide();
        this.notificationService.error(this.msgErrorGettingFormData);
        // prevent the user from using this form
        // in case of failure by closing the form
        this.closeForm();
      });
  }

  saveForm(): void {
    if (this.theForm.dirty && this.theForm.valid) {

      this.busyIndicatorService.show(this.msgSavingData);

      this
        .saveData(this.theForm, this.theModel)
        .pipe(
          tap(() => {
            this.notificationService.success(this.msgDataSavedSuccessfully);
            this.busyIndicatorService.hide();
          })
        ).toPromise()
        .catch((error: Error) => this.saveUserHandleError(error));
    }
  }

  public saveUserHandleError(error: any) {

    switch (error.status) {
      case 400:
        this.notificationService.error(error.message);
        break;
      default:
        this.notificationService.error(i18nMessages.common.errUnhandled);
        break;
    }
  }

}

export abstract class FormCrudComponent<TModel>
  extends FormBaseComponent<TModel>
  implements OnInit, FormCrud<TModel> {

  abstract savePost: (theForm: FormGroup, theModel: TModel) => Observable<object>;
  abstract savePut: (theForm: FormGroup, theModel: TModel) => Observable<object>;
  abstract isEdit: () => boolean;

  constructor(
    public notificationService: NotificationService,
    public busyIndicatorService: BusyIndicatorService) {
    super(notificationService, busyIndicatorService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  saveData(): Observable<object> {
    if (this.isEdit()) {
      return this.savePut(this.theForm, this.theModel);
    } else {
      return this.savePost(this.theForm, this.theModel);
    }
  }

}
