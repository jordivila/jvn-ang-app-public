import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { EnvConfig } from '../../../../environments/environment.dto';
import { environment } from '../../../../environments/environment';

// Main pupose of this file if to wrap environment config
// and prevent as much as posible developer mistakes importing
// wrong environment.ts files by mistake

@Injectable()
export class ConfigService implements EnvConfig {

    readonly API?: string = environment.API;
    readonly ENV?: string = environment.ENV;
    readonly LOGIN_PAGE?: string = environment.LOGIN_PAGE;
    readonly SESSION_LOGOUT_TIMER_MINUTS?: number = environment.SESSION_LOGOUT_TIMER_MINUTS;
    readonly production: boolean = environment.production;
    readonly LOCALE: string;

    constructor(@Inject(LOCALE_ID) private locale: string) {
        this.LOCALE = locale;
    }

}
