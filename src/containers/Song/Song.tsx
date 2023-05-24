import React, { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { useTheme } from '../../hooks/useTheme';
import { getChordsFromString } from '../../utils/stringHelper';
import { scrollToTop } from '../../utils/helper';
import { Themes } from '../../constants/Themes';
import { ISong } from '../../constants/SongsData';
import { useAppNavigation } from '../../components/Navigation';
import ChordsRowPopUp from '../../components/ChordsRowPopUp';
import AutoscrollPanel from '../../components/AutoscrollPanel';

import styles from './Song.module.scss';

type SongProps = {
  author: string;
  song: ISong;
};

type ChordsModalState = {
  activeRowChords?: string[];
  isModalOpen?: boolean;
};

const { DARK } = Themes;

const Song: FC<SongProps> = ({ author, song: { name, lyrics, speed: defaultSpeed = 0 } }) => {
  const { goToAuthor } = useAppNavigation();
  const { theme } = useTheme();
  const [{ isModalOpen, activeRowChords }, setIsModalState] = useState<ChordsModalState>({});
  const [chords, setChords] = useState<string[]>([]);

  useEffect(() => {
    scrollToTop();
    let allChords = new Set<string>();
    lyrics.forEach(([line, isChordsRow]) => {
      if (isChordsRow) {
        allChords = new Set([...Array.from(allChords), ...getChordsFromString(line)]);
      }
    });
    setChords(Array.from(allChords));
  }, [defaultSpeed, lyrics]);

  const onAuthorClick = () => goToAuthor(author);

  function withThemeClassName(className: string) {
    return cn(className, { [styles.dark]: theme === DARK });
  }

  function onChordClick(chordsRow: string) {
    const chords = getChordsFromString(chordsRow);
    setIsModalState({ isModalOpen: true, activeRowChords: chords });
  }

  const onCloseModal = useCallback(() => setIsModalState({}), []);

  return (
    <>
      <div className={styles.content}>
        <p className={withThemeClassName(styles.header)}>
          <span className={withThemeClassName(styles.author)} onClick={onAuthorClick}>
            {author}
          </span>
          {` - ${name}`}
        </p>
        <div className={styles.lyrics}>
          {lyrics.map(([text, isChordsRow], index) =>
            isChordsRow ? (
              <p
                key={`row-${index}`}
                className={withThemeClassName(cn(styles.row, styles.chord))}
                // onClick={() => onChordClick(String(text))}
              >
                {text}
              </p>
            ) : (
              <p key={`row-${index}`} className={withThemeClassName(styles.row)}>
                {text}
              </p>
            )
          )}
        </div>
      </div>
      <div className={styles.buttonsBlock}>
        <AutoscrollPanel defaultSpeed={defaultSpeed} />
      </div>
      <ChordsRowPopUp
        isOpen={isModalOpen}
        chords={activeRowChords ?? chords}
        onClose={onCloseModal}
      />
    </>
  );
};

export default Song;
