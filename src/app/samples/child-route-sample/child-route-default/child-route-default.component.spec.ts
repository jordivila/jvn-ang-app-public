import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRouteDefaultComponent } from './child-route-default.component';

describe('ChildRouteDefaultComponent', () => {
  let component: ChildRouteDefaultComponent;
  let fixture: ComponentFixture<ChildRouteDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildRouteDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildRouteDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
