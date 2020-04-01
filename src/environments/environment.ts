// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { messagesEn } from '../i18n/messages.en';
import { EnvConfig } from './environment.dto';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  LOGIN_PAGE: '/login',
  SESSION_LOGOUT_TIMER_MINUTS: 20,
  ENV: 'DEV',
  API: 'https://s-e-redex-dev01.we-group.com'
} as EnvConfig;

export const messages = messagesEn;
