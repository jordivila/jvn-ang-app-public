import { messages } from '../../../../environments/environment';


// This is just a wrapper for "messages"
// This way we prevent future developers to import "environment.prod" by mistake
export const i18nMessages = messages;
