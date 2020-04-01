import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormSideTemplatedComponent } from '../../../shared/components/crud/forms/form-side-templated/form-side-templated.component';
import { FormBase, FormCrud, FormCrudComponent } from '../../../shared/components/crud/forms/form.component';
import { CustomValidators } from './../../../shared/services/validation/validation.service';
import { UserDetails, UserPostPut } from 'src/app/core/api/user/user-api.dto';
import { i18nMessages } from 'src/app/core/services/i18n/i18n.config';
import { UserApiService } from 'src/app/core/api/user/user-api.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { BusyIndicatorService } from 'src/app/core/services/busy-indicator/busy-indicator.service';


@Component({
  selector: 'app-crud-sample-form',
  templateUrl: './crud-sample-form.component.html',
  styleUrls: ['./crud-sample-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CrudSampleFormComponent
  extends FormCrudComponent<UserDetails>
  implements OnChanges {

  @ViewChild(FormSideTemplatedComponent, { static: false }) formSideTemplated: FormSideTemplatedComponent<UserDetails>;
  @Output() closeEvent = new EventEmitter();
  @Input() userId: string;
  @Input() isOpen: boolean;


  // FormComponent asbtract properties begin
  msgTitle: string;
  msgGettingFormData = i18nMessages.crudFilterExpand.msgGettingFormData;
  msgErrorGettingFormData = i18nMessages.crudFilterExpand.msgErrorGettingFormData;
  msgSavingData = i18nMessages.crudFilterExpand.msgSavingData;
  msgDataSavedSuccessfully = i18nMessages.crudFilterExpand.userSaved;
  // FormComponent asbtract properties end


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserApiService,
    public notificationService: NotificationService,
    public busyIndicatorService: BusyIndicatorService) {

    super(notificationService, busyIndicatorService);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpen) {
      this.formSideTemplated.ngOnInit();
    }
  }

  savePost = (theForm: FormGroup, theModel: UserDetails): Observable<object> => {

    const userCreateModel = theForm.value as UserPostPut;

    return this.userService
      .post(userCreateModel)
      .pipe(
        tap((id: object) => {
          // do nothing. We could use this to store newlly created id and retrieve details
        })
      );
  }

  savePut = (theForm: FormGroup, theModel: UserDetails): Observable<object> => {

    const userEditModel = (Object.assign({}, theForm.value, { id: this.userId })) as UserPostPut;

    return this.userService
      .put(userEditModel)
      .pipe(
        tap((id: object) => {
          // do nothing. We could use this perform form specific actions
        })
      );
  }

  initModels = (): Promise<UserDetails> => {

    this.msgTitle = this.userId ? i18nMessages.crudFilterExpand.editUser : i18nMessages.crudFilterExpand.addUser;

    if (!this.userId) {
      return new Promise((resolve) => {
        resolve({} as UserDetails);
      });
    } else {
      return this.userService.get(this.userId).toPromise<UserDetails>();
    }
  }

  initFormGroup = (): FormGroup => {
    return this.formBuilder.group({
      firstName: new FormControl('', [
        CustomValidators.requiredWithTrim,
        Validators.minLength(1),
        Validators.maxLength(50)]
      ),
      lastName: new FormControl('', [
        CustomValidators.requiredWithTrim,
        Validators.minLength(4),
        Validators.maxLength(100)]
      ),
      email: new FormControl('', [
        CustomValidators.requiredWithTrim,
        CustomValidators.emailValidator,
        Validators.minLength(4),
        Validators.maxLength(100)]
      ),
      userName: new FormControl('', [
        CustomValidators.requiredWithTrim,
        Validators.minLength(4),
        Validators.maxLength(100)]
      ),
    });
  }

  isEdit = (): boolean => {
    return this.userId ? true : false;
  }

  closeForm = (): void => {
    this.closeEvent.emit();
  }
}
