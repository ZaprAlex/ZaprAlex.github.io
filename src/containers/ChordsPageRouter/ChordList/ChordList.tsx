import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Chords } from '../../../constants/chords';
import { Themes } from '../../../constants/Themes';
import { useAppNavigation } from '../../../components/Navigation';
import { useTheme } from '../../../hooks/useTheme';
import { scrollToTop } from '../../../utils/helper';

import styles from './ChordList.module.scss';

type Params = {
  note?: string;
};

const ChordList: FC = () => {
  const { theme } = useTheme();
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

  function withThemeClassName(classNames: string) {
    return cn(classNames, { [styles.dark]: theme === Themes.DARK });
  }

  return (
    <>
      {hasNote && <p className={withThemeClassName(styles.header)}>{note.charAt(0)}</p>}
      <div className={styles.content}>
        {list.map((name, index) => (
          <div
            key={`chord-${index}`}
            onClick={() => goToChord(name)}
            className={withThemeClassName(styles.text)}
          >
            {name}
          </div>
        ))}
      </div>
    </>
  );
};

export default ChordList;
