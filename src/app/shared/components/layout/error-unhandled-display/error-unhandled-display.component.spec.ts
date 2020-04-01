import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorUnhandledDisplayComponent } from './error-unhandled-display.component';
import { StoreModule } from '@ngrx/store';
import { rootStoreConfig } from '../../../../app.store';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

describe('ErrorUnhandledDisplayComponent', () => {
  let component: ErrorUnhandledDisplayComponent;
  let fixture: ComponentFixture<ErrorUnhandledDisplayComponent>;

  beforeEach(async(() => {

    const notificationService = {
      errorUnhandled: () => { }
    };

    TestBed.configureTestingModule({
      imports: [
        OverlayModule,
        PortalModule,
        StoreModule.forRoot({}, rootStoreConfig)
      ],
      declarations: [ErrorUnhandledDisplayComponent],
      providers: [
        { provide: NotificationService, useValue: notificationService, deps: [] },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorUnhandledDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
