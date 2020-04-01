import { Guid } from 'src/app/shared/helpers/guid';

export interface BusyIndicatorState {
    id: Guid;
    isOpen: boolean;
    text: string;
}
