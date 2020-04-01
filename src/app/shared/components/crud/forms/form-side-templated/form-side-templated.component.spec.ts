import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { FormSideTemplatedComponent } from './form-side-templated.component';
import { NotificationServiceMockClass } from 'src/app/core/services/notification/notification.service.mock.spec';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { BusyIndicatorService } from 'src/app/core/services/busy-indicator/busy-indicator.service';

interface TestModel {
    id: number;
}

describe('form.component.ts', () => {


    describe('NgOnInit', () => {


        it(`should`, () => {

            const model = { id: 1 } as TestModel;
            const argException = 'FormSideTemplated Argument exception.';
            const comp = new FormSideTemplatedComponent<TestModel>(
                new NotificationServiceMockClass() as NotificationService,
                {
                    // setText: (text: string) => { },
                    show: (text: string) => { },
                    hide: () => { }
                } as BusyIndicatorService
            );

            const checkError = (e, propertyName) => {
                expect(e.message.includes(argException));
                expect(e.message.includes(propertyName));
            };

            expect(comp).toBeTruthy();

            try { comp.ngOnInit(); } catch (e) { checkError(e, 'ngOnInit'); }
            comp.initModels = () => new Promise((resolve) => resolve(model));
            try { comp.ngOnInit(); } catch (e) { checkError(e, 'initModels'); }
            comp.initFormGroup = () => new FormGroup({});
            try { comp.ngOnInit(); } catch (e) { checkError(e, 'initFormGroup'); }
            comp.closeForm = () => { };
            try { comp.ngOnInit(); } catch (e) { checkError(e, 'closeForm'); }
            comp.isEdit = () => true;
            try { comp.ngOnInit(); } catch (e) { checkError(e, 'isEdit'); }
            comp.savePost = (theForm: FormGroup, theModel: TestModel) => of({});
            try { comp.ngOnInit(); } catch (e) { checkError(e, 'savePost'); }
            comp.savePut = (theForm: FormGroup, theModel: TestModel) => of({});
            try { comp.ngOnInit(); } catch (e) { checkError(e, 'savePut'); }
        });

    });

});
