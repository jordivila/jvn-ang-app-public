import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRouteSecondaryComponent } from './child-route-secondary.component';

describe('ChildRouteSecondaryComponent', () => {
  let component: ChildRouteSecondaryComponent;
  let fixture: ComponentFixture<ChildRouteSecondaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildRouteSecondaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildRouteSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
