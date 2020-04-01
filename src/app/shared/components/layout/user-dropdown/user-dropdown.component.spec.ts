import { Component, ViewChild } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDropDownComponent } from './user-dropdown.component';
import { ConfigService } from '../../../../core/services/config/config.service';


@Component({
    selector: 'app-test-cmp',
    template: '<app-user-dropdown></app-user-dropdown>'
})
class TestComponent {
    @ViewChild(UserDropDownComponent, { static: false }) sutUserDropdown: UserDropDownComponent;
}

describe('user-dropdown component', () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatMenuModule,
                MatIconModule,
            ],
            declarations: [TestComponent, UserDropDownComponent],
            providers: [
                ConfigService,
            ],
        });

    });

    it('should build without a problem',
        async(() => {
            TestBed
                .compileComponents()
                .then(() => {
                    const fixture = TestBed.createComponent(TestComponent);
                    const compiled = fixture.nativeElement;

                    fixture.detectChanges();
                    expect(compiled).toBeTruthy();
                });
        }));
});
