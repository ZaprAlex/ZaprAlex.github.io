import React, { FC, useEffect, useState } from 'react';

import { scrollToTop } from '../../../utils/helper';
import { Chords, IChord } from '../../../constants/chords';
import { useAppNavigation } from '../../../components/Navigation';

import styles from './Chord.module.scss';

type ChordProps = {
  chord: IChord;
};

const Chord: FC<ChordProps> = ({ chord: { chord, name, src } }) => {
  const { goToChord } = useAppNavigation();
  const [chordsSameNote, setChordsSameNote] = useState<string[]>([]);
  const note = chord.charAt(0);

  useEffect(() => {
    scrollToTop();
    setChordsSameNote(Object.keys(Chords).filter((value) => value.charAt(0) === note));
  }, [note]);

  return (
    <>
      <div className={styles.content}>
        <p className={styles.header}>{chord}</p>
        <p className={styles.description}>{name}</p>
        <img className={styles.chordImage} src={`/chords/${note}/${src}`} alt={name} />
        <div className={styles.note} onClick={() => goToChord(note)}>
          {note}
        </div>
        <div className={styles.chordsSameNoteBlock}>
          {chordsSameNote.map((value, index) => (
            <div
              key={`same-note-chord-${index}`}
              className={styles.chord}
              onClick={() => goToChord(value)}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Chord;
