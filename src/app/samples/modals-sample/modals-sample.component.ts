import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalHelperComponent } from '../../shared/components/modal/helper/modal-helper.component';
import { ModalErrorTmpListComponent } from '../../shared/components/modal/modal-error.-tmp-list/modal-error-tmp-list.component';
import { ModalSlideMenuComponent } from '../../shared/components/modal/slide-menu/slide-menu.component';
import { ModalWarningTmpListComponent } from '../../shared/components/modal/warning-templated-list/modal-warning-templated-list.component';
import { modalsPageTexts } from './modals-sample.texts';

@Component({

    selector: 'app-samples-modals',
    templateUrl: 'modals-sample.component.html',
    styleUrls: ['modals-sample.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalsSampleComponent implements OnInit {

    confirmationResult: string;
    timeoutResult: string;
    templatedListItems: any[] = [{
        title: modalsPageTexts.first,
        desc: modalsPageTexts.firstItem
    },
    {
        title: modalsPageTexts.second,
        desc: modalsPageTexts.secondItem
    }];
    index: number;

    @ViewChild(ModalHelperComponent, { static: false }) modalHelper: ModalHelperComponent;
    @ViewChild(ModalWarningTmpListComponent, { static: false }) modalWarningTemplatedList: ModalWarningTmpListComponent;
    @ViewChild(ModalErrorTmpListComponent, { static: false }) modalErrorTemplatedList: ModalErrorTmpListComponent;
    @ViewChild(ModalSlideMenuComponent, { static: false }) modalSlideMenuComponent: ModalSlideMenuComponent;

    ngOnInit() {
        this.confirmationResult = '';
        this.timeoutResult = '';
    }

    confirmOpen(): void {
        this.modalHelper.confirm(modalsPageTexts.openWaterSwimming, (result: boolean) => {
            this.confirmationResult =
                `${modalsPageTexts.youClicked} ${result ? modalsPageTexts.yes : modalsPageTexts.noe}`;

            alert(this.confirmationResult);
        });
    }

    warningOpen(): void { this.modalHelper.warning(modalsPageTexts.keepYourFingersOut); }

    successOpen(): void { this.modalHelper.success(modalsPageTexts.youDidIt); }

    errorOpen(): void { this.modalHelper.error(modalsPageTexts.oopsAnError); }

    infoOpen(): void { this.modalHelper.info(modalsPageTexts.seeTreesAndGreen); }

    timeoutOpen(): void {
        this.modalHelper.timeout(
            'This is a timout dialog',
            'What do you want to do ?',
            10, 0, (result: boolean) => {
                this.timeoutResult = `
                    ${modalsPageTexts.youClicked}
                    ${result ?
                        modalsPageTexts.keepWorking :
                        modalsPageTexts.signOut}`;
            });
    }

    templatedListOpen(): void {
        this.modalWarningTemplatedList.show();
    }

    templatedListErrorOpen(): void {
        this.modalErrorTemplatedList.show();
    }

    menuSlideOpen(): void {
        this.modalSlideMenuComponent.show();
    }

    menuSlideClose(): void {
        this.modalSlideMenuComponent.koClicked();
    }
}
