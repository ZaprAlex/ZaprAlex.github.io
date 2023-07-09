import React, { FC, PropsWithChildren, useReducer } from 'react';

import {
  CLOSE_MODAL_ACTION,
  OPEN_MODAL_ACTION,
  ModalAction,
  ModalContext,
  ModalState,
  initialModalState
} from '../components/ModalContext';

export function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
  case OPEN_MODAL_ACTION:
    return { ...state, ...action.payload, isOpen: true };
  case CLOSE_MODAL_ACTION:
    return initialModalState;
  default:
    return state;
  } 
}

const ModalContextContainer: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialModalState);
  const contextValue = { state, dispatch } as React.ContextType<typeof ModalContext>;

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};

export default ModalContextContainer;
