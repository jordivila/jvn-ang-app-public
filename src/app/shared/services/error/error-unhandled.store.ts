export interface ErrorUnhandledState {
    error?: ErrorUnhandledDetail;
}

export interface ErrorUnhandledDetail {
    message: string;
    stack: string;
}
