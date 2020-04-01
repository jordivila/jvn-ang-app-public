import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SessionTimerEventArgs } from '../../shared/components/session-timer/session-timer.dto';
import { AuthGuardState } from 'src/app/core/guards/auth-guard/reducers/auth-guard.store';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { i18nMessages } from 'src/app/core/services/i18n/i18n.config';
import { authGuardGetData } from 'src/app/core/guards/auth-guard/reducers/auth-guard.actions';

@Component({
  selector: 'app-session-timer-sample',
  templateUrl: './session-timer-sample.component.html',
  styleUrls: ['./session-timer-sample.component.scss']
})
export class SessionTimerSampleComponent implements OnInit {

  public sessionTimeoutInMinutes: number;
  public percetageToShowModal: number;
  public explanationMessage: string;

  constructor(
    private store: Store<AuthGuardState>,
    private router: Router,
    private configService: ConfigService) {

  }

  ngOnInit() {
    // this.sessionTimeoutInMinutes = this.configService.SESSION_LOGOUT_TIMER_MINUTS;
    this.sessionTimeoutInMinutes = 1;
    this.percetageToShowModal = 15; // default is 80
    this.explanationMessage = `
    This component controls the time that elapses since the last Http request.
    Each time a request begins, the counter is reset.
    When it reaches a predetermined percentage it shows a modal so that the user can cancel
    the "logout" in case he is NOT absent.`;
  }

  onSessionExpired(event: SessionTimerEventArgs) {
    // TODO: component should be able to "reinitilize" session timer after being fired by Session End event
    // That means, reainitialize Session Timer after LoggedIn event
    if (event.keepAlive) {
      // In my environment I just need to request some API
      // and token is refreshed
      // you might need to perform any other Action
      // feel free to change this method in order to refresh auth token
      this.store.dispatch(authGuardGetData({ jwToken: 'someTokenValue' }));
    } else {
      this.router.navigateByUrl(this.configService.LOGIN_PAGE);
    }
  }
}
