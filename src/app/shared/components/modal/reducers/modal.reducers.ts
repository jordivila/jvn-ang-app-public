import { createReducer, on } from '@ngrx/store';
import { ModalState } from './modal.store';
import { modalShow, modalHide } from './modal.actions';

export const modalReducerInitialState = {
    modalIsOpen: false,
};

const reducer = createReducer(
    modalReducerInitialState,
    on<ModalState>(modalShow, () => {
        return { modalIsOpen: true } as ModalState;
    }),
    on<ModalState>(modalHide, () => {
        return { modalIsOpen: false } as ModalState;
    }),
);

export function modalReducer(state: ModalState, action) {
    return reducer(state, action);
}
