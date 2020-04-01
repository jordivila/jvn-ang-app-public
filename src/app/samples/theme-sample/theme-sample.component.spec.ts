import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../shared/components/material/material.module';
import { ThemeSampleComponent } from './theme-sample.component';


describe('ThemeSampleComponent', () => {
  let component: ThemeSampleComponent;
  let fixture: ComponentFixture<ThemeSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [ ThemeSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
