import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nSampleComponent } from './i18n-sample.component';

describe('I18nSampleComponent', () => {
  let component: I18nSampleComponent;
  let fixture: ComponentFixture<I18nSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I18nSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I18nSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
