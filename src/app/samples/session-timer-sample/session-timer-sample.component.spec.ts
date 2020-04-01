import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserLoggedInApiService } from 'src/app/core/api/user-logged-in/user-logged-in-api.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { TestBedHelper, TestBedHelperContext } from '../../../testing/testbed-helper';
import { SessionTimerSampleComponent } from './session-timer-sample.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes = [
  {
    path: '',
    component: SessionTimerSampleComponent,
    children: [
      { path: '', component: SessionTimerSampleComponent },
      { path: 'login', component: SessionTimerSampleComponent },
    ]
  }] as Route[];

describe('SessionTimerSampleComponent', () => {
  let component: SessionTimerSampleComponent;
  let fixture: ComponentFixture<SessionTimerSampleComponent>;
  let testBedHelper: TestBedHelper<SessionTimerSampleComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        CoreModule.forRoot(),
        SharedModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [

      ],
      providers: [
        UserLoggedInApiService,
        ConfigService,
        // { provide: UserApiService, useValue: userServiceMock, deps: [] },
      ]
    });

    testBedHelper = new TestBedHelper<SessionTimerSampleComponent>(SessionTimerSampleComponent)
      .onCreated((context: TestBedHelperContext<SessionTimerSampleComponent>) => {
        fixture = context.fixture;
        component = context.component;
      });
  }));

  it('should create', fakeAsync(() => {
    testBedHelper
      .create()
      .then(() => {
        tick(60000);
        testBedHelper.fixtureDetectChanges(fixture);
        expect(component).toBeTruthy();
      });

  }));

});
