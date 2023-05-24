import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { useTheme } from '../../../hooks/useTheme';
import { scrollToTop } from '../../../utils/helper';
import { Chords, IChord } from '../../../constants/chords';
import { Themes } from '../../../constants/Themes';
import FullscreenButton from '../../../components/FullscreenButton';

import styles from './Chord.module.scss';
import { useAppNavigation } from '../../../components/Navigation';

type ChordProps = {
  chord: IChord;
};

const { DARK } = Themes;

const Chord: FC<ChordProps> = ({ chord: { chord, name, src } }) => {
  const { goToChord } = useAppNavigation();
  const { theme } = useTheme();
  const [chordsSameNote, setChordsSameNote] = useState<string[]>([]);
  const note = chord.charAt(0);

  useEffect(() => {
    scrollToTop();
    setChordsSameNote(Object.keys(Chords).filter((value) => value.charAt(0) === note));
  }, [note]);

  function withThemeClassName(className: string) {
    return cn(className, { [styles.dark]: theme === DARK });
  }

  return (
    <>
      <div className={styles.content}>
        <p className={withThemeClassName(styles.header)}>{chord}</p>
        <p className={withThemeClassName(styles.description)}>{name}</p>
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
      <div className={styles.buttonsBlock}>
        <FullscreenButton />
      </div>
    </>
  );
};

export default Chord;
