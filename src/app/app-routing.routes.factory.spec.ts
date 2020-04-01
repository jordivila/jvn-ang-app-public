// import { async, ComponentFixture, fakeAsync, TestBed, TestModuleMetadata, tick } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { TestBedHelper, TestBedHelperContext } from '../testing/testbed-helper';
// import { SharedModule } from './shared/core.module';
// import { AppRoutingModule } from './app-routing';
// import { BrowserAnimationsModule, NoopAnimationsModule } from '../../node_modules/@angular/platform-browser/animations';
// import { Store } from '@ngrx/store';
// import { AppState } from './app.store';
// import { errUnhandledThrown } from './shared/services/error/reducers/error-unhandled.actions';
// import { ErrorUnhandledDetail } from './shared/services/error/reducers/error-unhandled.store';
// import { AppRoutes } from './app-routing.routes.factory';
// import { LoadChildren, Router, ActivatedRoute } from '../../node_modules/@angular/router';
// import { NgModuleFactoryLoader, Component, NgModule } from '@angular/core';
// import { ProductViewerModule } from './electronics/product-viewer/product-viewer.module';
// import { SpyNgModuleFactoryLoader, RouterTestingModule } from '@angular/router/testing'
// import { UserLoggedInApiService } from './shared/api/user-logged-in/user-logged-in-api.service';
// import { User } from './shared/api/user/user-api.dto';
// import { cold, hot, getTestScheduler, resetTestScheduler } from 'jasmine-marbles';

// const appModuleMetadata: TestModuleMetadata = {
//   imports: [
//     SharedModule.forRoot(),
//     // AppRoutingModule,
//     NoopAnimationsModule,
//     RouterTestingModule.withRoutes(AppRoutes),
//   ],
//   declarations: [
//     AppComponent
//   ],
//   providers: [
//     { provide: NgModuleFactoryLoader, useClass: SpyNgModuleFactoryLoader },
//     {
//       provide: UserLoggedInApiService,
//       useValue: {
//         get: jasmine.createSpy()
//       },
//     },
//     // { provide: ActivatedRoute, useValue: new ActivatedRouteStub({}), deps: [] },


//   ]
// };

// @Component({ template: '' })
// class LazyLoadedComponent { }

// @NgModule({ declarations: [LazyLoadedComponent] })
// class LazyModule { }

// describe('App Root Component', () => {
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;
//   let testBedHelper: TestBedHelper<AppComponent>;
//   let store: Store<AppState>;
//   let router: Router;
//   let loader: SpyNgModuleFactoryLoader;
//   let userLoggedInService: jasmine.SpyObj<UserLoggedInApiService>;

//   const loggedInUser = {
//     id: 'asdasdasdsd',
//     firstName: 'firstname',
//     lastName: 'lastname',
//     email: 'email@email.com',
//     userName: 'userName'
//   } as User;




//   describe('When initialize', () => {

//     const response = cold('-a|', { a: loggedInUser });

//     beforeEach(fakeAsync(() => {

//       TestBed.configureTestingModule(appModuleMetadata);

//       testBedHelper = new TestBedHelper<AppComponent>(AppComponent)
//         .onCreated((context: TestBedHelperContext<AppComponent>) => {
//           fixture = context.fixture;
//           component = context.component;
//         });

//       testBedHelper.create();

//       store = TestBed.inject(Store);
//       router = TestBed.inject(Router);
//       loader = TestBed.inject(NgModuleFactoryLoader);
//       userLoggedInService = TestBed.inject(UserLoggedInApiService);
//       userLoggedInService.get.and.returnValue(response);



//       router.initialNavigation();
//     }));

//     afterAll(() => {
//       getTestScheduler().flush();
//       resetTestScheduler();
//     });


//     it('navigates to "" redirects you to /login', fakeAsync(() => {

//       loader.stubbedModules = { lazyModule: LazyModule };


//       loader.stubbedModules = {
//         lazyModule: ProductViewerModule,
//       };

//       router
//         .navigate(['/login'])
//         .then(value => {
//           expect(value).toEqual(true);
//         })
//         .catch(reason => {
//           expect(reason).toBeUndefined('this should not happen');
//         });

//       tick();


//     }));


//   });
// });
