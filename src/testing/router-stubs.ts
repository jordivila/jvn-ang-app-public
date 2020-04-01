import { Observable ,  BehaviorSubject } from 'rxjs';

export class ActivatedRouteStub {

  private paramsValue: {};
  private subject: BehaviorSubject<any>;
  public params: Observable<any>;

  constructor(initialParams: any = {}) {
    this.paramsValue = initialParams;
    this.subject = new BehaviorSubject(this.testParams);
    this.params = this.subject.asObservable();
  }

  get testParams() { return this.paramsValue; }
  set testParams(params: {}) {
    this.paramsValue = params;
    this.subject.next(params);
  }

  get snapshot() {
    return { params: this.testParams };
  }
}
