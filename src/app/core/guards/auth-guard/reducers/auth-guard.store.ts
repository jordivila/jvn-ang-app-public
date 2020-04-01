import { User } from 'src/app/core/api/user/user-api.dto';

export interface AuthGuardState {
    isInitialized: boolean;
    userInfo?: User;
    userInfoError?: AuthGuardStateErrorDetail;
}

export interface AuthGuardStateErrorDetail {
    message: string;
    stack: string;
}
