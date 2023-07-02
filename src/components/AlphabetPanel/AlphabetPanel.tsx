import React, { FC } from 'react';

import { AlphabetSectionsType } from '../../constants/Aphabet';
import AlphabetSection, { AlphabetSectionProps } from './AlphabetSection';

import styles from './AlphabetPanel.module.scss';

const { NUMBER, RUSSIAN, ENGLISH } = AlphabetSectionsType;

const AlphabetPanel: FC<Omit<AlphabetSectionProps, 'section'>> = ({ alphabet, onClick }) => {
  return (
    <div className={styles.panel}>
      <AlphabetSection alphabet={alphabet} section={NUMBER} onClick={onClick} />
      <AlphabetSection alphabet={alphabet} section={RUSSIAN} onClick={onClick} />
      <AlphabetSection alphabet={alphabet} section={ENGLISH} onClick={onClick} />
    </div>
  );
};

export default AlphabetPanel;
