import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Chords } from '../../../constants/chords';
import { useAppNavigation } from '../../../components/Navigation';
import { scrollToTop } from '../../../utils/helper';

import styles from './ChordList.module.scss';

type Params = {
  note?: string;
};

const ChordList: FC = () => {
  const { note = '' } = useParams<Params>();
  const { goToChord, goToChords } = useAppNavigation();
  const [list, setList] = useState<string[]>([]);
  const hasNote = !!Chords[note.charAt(0)];

  if (note.length && !hasNote) {
    goToChords();
  }

  useEffect(() => {
    scrollToTop();
    setList(
      hasNote
        ? Object.keys(Chords).filter((value) => value.charAt(0) === note.charAt(0))
        : Object.keys(Chords)
    );
  }, [note, hasNote]);

  return (
    <>
      {hasNote && <p className={styles.header}>{note.charAt(0)}</p>}
      <div className={styles.content}>
        {list.map((name, index) => (
          <div
            key={`chord-${index}`}
            onClick={() => goToChord(name)}
            className={styles.text}
          >
            {name}
          </div>
        ))}
      </div>
    </>
  );
};

export default ChordList;
