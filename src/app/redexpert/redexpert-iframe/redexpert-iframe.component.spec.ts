import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RedexpertIframeComponent } from './redexpert-iframe.component';
import { ElementRef, Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Injectable()
export class MockElementRef {
  nativeElement: {};
}

describe('RedexpertIframeComponent', () => {

  let component: RedexpertIframeComponent;
  let fixture: ComponentFixture<RedexpertIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedexpertIframeComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [{ provide: ElementRef, useValue: new MockElementRef() }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedexpertIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
