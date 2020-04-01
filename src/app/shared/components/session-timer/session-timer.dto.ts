export class SessionTimerEventArgs {
    keepAlive: boolean;

    constructor(keepAlive: boolean) {
        this.keepAlive = keepAlive;
    }
}
