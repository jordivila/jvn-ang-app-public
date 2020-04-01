import { Type } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

export type TestBedHelperBeforeInitFn<TComponent> = (component: TComponent) => void;
export type TestBedHelperBeforeCreateFn = () => void;
export type TestBedHelperOnCreatedFn<TComponent> = (context: TestBedHelperContext<TComponent>) => void;
export interface TestBedHelperContext<TComponent> {
  fixture: ComponentFixture<TComponent>;
  component: TComponent;
}
export class TestBedHelper<TComponent> {

  private componentType: Type<TComponent>;
  private beforeCreate: TestBedHelperBeforeCreateFn;
  private beforeInit: TestBedHelperBeforeInitFn<TComponent>;
  private afterCreated: TestBedHelperOnCreatedFn<TComponent>;

  constructor(componentType: Type<TComponent>) {
    // not found the way to infer Type<TComponent> directly from TComponent
    // thus, I need to create this.componentType
    this.componentType = componentType;
  }

  public fixtureDetectChanges(fixture: ComponentFixture<TComponent>) {
    fixture.changeDetectorRef.detectChanges();
    tick();
    fixture.detectChanges();
  }

  public onBeforeCreate(cb: TestBedHelperBeforeCreateFn) {
    this.beforeCreate = cb;
    return this;
  }

  public onBeforeInit(cb: TestBedHelperBeforeInitFn<TComponent>) {
    this.beforeInit = cb;
    return this;
  }

  public onCreated(cb: TestBedHelperOnCreatedFn<TComponent>) {
    this.afterCreated = cb;
    return this;
  }

  public create()
    : Promise<TestBedHelperContext<TComponent>> {
    return new Promise((resolve, reject) => {
      if (this.beforeCreate) {
        this.beforeCreate();
      }
      const fixture = TestBed.createComponent(this.componentType);
      const component = fixture.componentInstance;
      const context = {
        fixture,
        component
      };

      if (this.beforeInit) {
        this.beforeInit(component);
      }
      this.fixtureDetectChanges(fixture);
      if (this.afterCreated) {
        this.afterCreated(context);
      }
      resolve(context);
    });
  }
}
