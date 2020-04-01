
// tslint:disable-next-line:max-line-length // organize imports can't break this line ( at the time of writing )
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription, timer as observableTimer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ModalHelperComponent } from '../modal/helper/modal-helper.component';
import { ModalTimeoutComponent } from '../modal/timeout/modalTimeout.component';
import { SessionTimerEventArgs } from './session-timer.dto';
import { HttpLastRequestService } from '../../../core/services/http/http-last-request-service';



@Component({
  selector: 'app-session-timer',
  templateUrl: 'session-timer.component.html',
  styleUrls: ['session-timer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionTimerComponent implements OnInit, OnDestroy {

  @ViewChild(ModalHelperComponent, { static: false }) modalHelper: ModalHelperComponent;
  @Output() sessionExpired: EventEmitter<SessionTimerEventArgs> = new EventEmitter();
  @Input() sessionTimeoutInMinutes: number;
  @Input() percetageToShowModal?: number;

  public modalInstance: ModalTimeoutComponent;

  private timePerCentSpent: number;
  private lastRequest: Observable<Date>;
  private lastRequestDone: Date;
  private lastRequestSubscription: Subscription;
  // private intervalSubscription: NodeJS.Timer;
  private timerSubscription: Subscription;

  constructor(
    private httpLastRequestService: HttpLastRequestService,
    private changeDetectionRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    if (!this.percetageToShowModal) {
      this.percetageToShowModal = 80;
    }
    this.lastRequestObserve();
    this.timerIntervalInit();
  }

  ngOnDestroy() {
    this.dispose();
  }

  public get timePercentageToOpenModal(): number {
    return this.percetageToShowModal;

  }

  private lastRequestObserve(): void {
    this.lastRequestDone = new Date();
    this.lastRequest = this.httpLastRequestService.getLastRequest();
    this.lastRequestSubscription = this.lastRequest.subscribe((newValue) => {
      this.lastRequestDoneSet(newValue);
    });
  }

  private lastRequestDoneSet(when: Date): void {
    this.lastRequestDone = when;
    this.timePerCentSpent = 0;
  }

  private timerIntervalInit(): void {
    // this.intervalSubscription = setInterval(() => {
    //   this.timerIntervalTick();
    // }, 1000);
    this.timerSubscription = observableTimer(0, 1000)
      .pipe(takeWhile(() => this.timerSubscription instanceof Subscription))
      .subscribe(() => {
        this.timerIntervalTick();
      });

  }

  private timerIntervalTick(): void {
    const now = new Date();
    const dif = now.getTime() - this.lastRequestDone.getTime();
    const secondsSinceLastRequest = Math.abs(dif / 1000);
    const sessionInSeconds = this.sessionTimeoutInMinutes * 60;
    const secondsRemaining = sessionInSeconds - secondsSinceLastRequest;

    this.timePerCentSpent = Math.floor((secondsSinceLastRequest / sessionInSeconds) * 100);

    if (this.timePerCentSpent > 100) {
      this.logOut();
    }

    if (this.timePerCentSpent >= this.timePercentageToOpenModal) {
      if (this.modalInstance) {
        // Do nothing. A timeout modal is already open
      } else {
        this.modalInstance = this.timerIntervalShowModal(secondsRemaining);
      }
      this.changeDetectionRef.detectChanges();
    }
  }

  private timerIntervalShowModal(secondsRemaining: number): ModalTimeoutComponent {
    return this.modalHelper.timeout(
      'You will be signed out in',
      'What do you want to do?',
      secondsRemaining,
      0,
      (keepWorking: boolean) => {
        if (keepWorking) {
          this.lastRequestDoneSet(new Date());
          this.reAuthenticate();
        } else {
          this.logOut();
        }
        this.modalInstance = null;
      });
  }

  private logOut(): void {
    this.sessionExpired.emit(new SessionTimerEventArgs(false));
    this.dispose();
  }

  private dispose(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    if (this.lastRequestSubscription) {
      this.lastRequestSubscription.unsubscribe();
    }
  }

  private reAuthenticate(): void {
    this.sessionExpired.emit(new SessionTimerEventArgs(true));
  }

}
