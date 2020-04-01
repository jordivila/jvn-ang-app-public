import { ViewContainerRef } from '@angular/core';

export class NotificationServiceMockClass {
    success(message: string) { }
    error(message: string, title?: string, options?: any) { }
    errorUnhandled(message: string, title: string, doneFn: () => void, viewContainerRef: ViewContainerRef) {

    }
}
