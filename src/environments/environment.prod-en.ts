import { messagesEn } from '../i18n/messages.en';
import { commonProdEnvironment } from './environment.prod';

export const messages = messagesEn;
export const environment = Object.assign({}, commonProdEnvironment, {});
