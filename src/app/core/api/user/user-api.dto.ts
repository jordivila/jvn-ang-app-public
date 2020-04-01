import { Guid } from '../../../shared/helpers/guid';
import { GridRow } from '../../../shared/components/crud/grid/models/grid-row';

export class User {
    id?: Guid;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
}

export interface UserDetails extends User {
    isPrivilegedContact: boolean;
    isUserAccountActive: boolean;
    lastActivationDeactivationDate: Date;
}

export interface UserRow extends GridRow {
    userId: Guid;
    email: string;
    fullName: string;
    loginName: string;
    primaryCompanyName: string;
    activationOrDeactivationDate: Date;
    isActive: boolean;
    isPrivileged?: boolean;
}

export interface UserPostPut {
    id?: Guid;
    firstName: string;
    lastName: string;
    email: string;
    sendEmailConfirmation: boolean;
    caseId: string;
    userName: string;
}
