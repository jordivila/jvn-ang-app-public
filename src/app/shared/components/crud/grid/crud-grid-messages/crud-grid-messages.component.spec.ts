import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../../../material/material.module';
import { CrudGridMessagesComponent } from './crud-grid-messages.component';


describe('CrudGridMessagesComponent', () => {
  let component: CrudGridMessagesComponent;
  let fixture: ComponentFixture<CrudGridMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [CrudGridMessagesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudGridMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
