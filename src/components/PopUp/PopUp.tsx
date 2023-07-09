import Modal from 'react-modal';

import React, { FC, ReactNode } from 'react';
import { useModal } from '../../hooks';
import ModalTypes from '../../constants/ModalTypes';
import SettingsPanelPopUp from './SettingsPanelPopUp';
import ChordsRowPopUp from './ChordsRowPopUp';

import styles from './PopUp.module.scss';

export function getModalBody(modalType: ModalTypes): ReactNode | null {
  switch (modalType) {
  case ModalTypes.CHORDS:
    return <ChordsRowPopUp />;
  case ModalTypes.SETTINGS:
    return <SettingsPanelPopUp />;
  default:
    return null;
  }
}

const PopUp: FC = () => {
  const { isOpen, modalType, closeModal } = useModal();
  const body = getModalBody(modalType);

  return (
    <Modal
      onRequestClose={closeModal}
      isOpen={isOpen}
      className={styles.modalContent}
      overlayClassName={styles.overlay}
      bodyOpenClassName={styles.bodyOpenClassName}
      ariaHideApp={false}
    >
      {body}
    </Modal>
  );
};

export default PopUp;
