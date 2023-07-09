import React from 'react';

import { Chords } from '../../../constants/chords';
import { useModal } from '../../../hooks';
import ChordItem from '../../ChordItem';

import styles from './ChordsRowPopUp.module.scss';

const ChordsRowPopUp: React.FC = () => {
  const { chords, closeModal } = useModal();

  return (
    <div className={styles.content} onClick={closeModal}>
      {chords!.map((value, index) => (
        <div className={styles.block} key={`chord-${index}`}>
          <p className={styles.title}>{value}</p>
          <img src={`/chords/${value.charAt(0)}/${Chords[value].src}`} alt={value} />
          <ChordItem />
        </div>
      ))}
    </div>
  );
};

export default ChordsRowPopUp;
