import { async, ComponentFixture, fakeAsync, TestBed, TestModuleMetadata, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TestBedHelper, TestBedHelperContext } from '../testing/testbed-helper';
import { AppRoutingModule } from './app-routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { AppState } from './app.store';
import { Router } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ErrorUnhandledDetail } from './shared/services/error/error-unhandled.store';
import { errUnhandledThrown } from './shared/services/error/error-unhandled.actions';

const appModuleMetadata: TestModuleMetadata = {
  imports: [
    CoreModule.forRoot(),
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [

  ]
};

describe('App Root Component', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let testBedHelper: TestBedHelper<AppComponent>;
  let store: Store<AppState>;
  let router: Router;



  describe('When initialize', () => {

    beforeEach(fakeAsync(() => {

      TestBed.configureTestingModule(appModuleMetadata);

      testBedHelper = new TestBedHelper<AppComponent>(AppComponent)
        .onCreated((context: TestBedHelperContext<AppComponent>) => {
          fixture = context.fixture;
          component = context.component;
        });

      testBedHelper.create();

      store = TestBed.inject(Store);
      router = TestBed.inject(Router);

    }));

    it('should create', fakeAsync(() => {
      expect(component.isMenuOpen).toEqual(false);
      expect(component.errorUnhandled).toBeFalsy();
    }));

    it('should be able to change menu visibility', fakeAsync(() => {
      component.onMenuOpenChanged(true);
      expect(component.isMenuOpen).toEqual(true);
    }));

    it('should call matSideNav when toggle click', fakeAsync(() => {
      const matSideNavOpenSpy = spyOn(component.matSidenav, 'open').and.callThrough();
      const matSideNavCloseSpy = spyOn(component.matSidenav, 'close').and.callThrough();

      component.onMenuToggleClick(false);
      expect(matSideNavCloseSpy).toHaveBeenCalled();

      component.onMenuToggleClick(true);
      expect(matSideNavOpenSpy).toHaveBeenCalled();
    }));

    it('should catch unhandled errors and set info in local model', fakeAsync(() => {
      const unhandledError = {
        message: 'an unhandled error',
        stack: 'useful unhandled error info'
      } as ErrorUnhandledDetail;

      store.dispatch(errUnhandledThrown({
        error: unhandledError
      }));

      testBedHelper.fixtureDetectChanges(fixture);
      tick(1000);

      expect(component.errorUnhandled).toEqual(unhandledError);
    }));
  });
});
