import { EnvConfig } from './environment.dto';

export const commonProdEnvironment = {
  production: true,
  LOGIN_PAGE: '/login',
  SESSION_LOGOUT_TIMER_MINUTS: 20,
  ENV: 'PROD',
  API: 'https://s-e-redex-dev01.we-group.com'
}  as EnvConfig;
