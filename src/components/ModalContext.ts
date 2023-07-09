import React from 'react';

import ModalTypes from '../constants/ModalTypes';

export const CLOSE_MODAL_ACTION = 'CLOSE_MODAL_ACTION';
export const OPEN_MODAL_ACTION = 'OPEN_MODAL_ACTION';

export type ModalState = {
  isOpen: boolean;
  modalType: ModalTypes;
  chords?: string[];
};

export type CloseModalAction = {
  type: typeof CLOSE_MODAL_ACTION;
};

export type OpenModalAction = {
  type: typeof OPEN_MODAL_ACTION;
  payload: {
    modalType: ModalState['modalType'];
    chords: ModalState['chords'];
  };
};

export type ModalAction = CloseModalAction | OpenModalAction;

export interface ModalContext extends React.Context<never> {
  state: ModalState;
  dispatch: React.Dispatch<ModalAction>;
}

export const initialModalState = {
  isOpen: false, modalType: ModalTypes.NONE
};

export const ModalContext = React.createContext<ModalContext>({
  state: initialModalState
} as ModalContext);
