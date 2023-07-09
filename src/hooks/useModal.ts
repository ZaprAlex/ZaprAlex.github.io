import { useContext } from 'react';

import { CLOSE_MODAL_ACTION, ModalContext, OPEN_MODAL_ACTION } from '../components/ModalContext';
import ModalTypes from '../constants/ModalTypes';


export const useModal = () => {
  const {
    state: { isOpen, modalType, chords },
    dispatch
  } = useContext(ModalContext);

  const openModal = (type: ModalTypes, chords?: string[]) => {
    dispatch({
      type: OPEN_MODAL_ACTION,
      payload: { modalType: type, chords }
    });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL_ACTION });
  };

  return { isOpen, modalType, chords, dispatch, openModal, closeModal };
};
