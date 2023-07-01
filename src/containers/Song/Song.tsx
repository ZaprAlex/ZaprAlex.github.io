import React, { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { getChordsFromString } from '../../utils/stringHelper';
import { scrollToTop } from '../../utils/helper';
import { useWindowResize } from '../../hooks/windowEventHooks';
import { ISong, ISongRow, SongsByAuthorsData } from '../../constants/SongsData';
import { useAppNavigation } from '../../components/Navigation';
import ChordsRowPopUp from '../../components/ChordsRowPopUp';
import { generateLyrics, isChorusLine } from './helper';

import styles from './Song.module.scss';

type SongProps = {
  author: string;
  song: ISong;
};

type ChordsModalState = {
  activeRowChords?: string[];
  isModalOpen?: boolean;
};

const Song: FC<SongProps> = ({ author, song: { name, lyrics, speed: defaultSpeed = 0 } }) => {
  const { goToAuthor } = useAppNavigation();
  const [{ isModalOpen, activeRowChords }, setIsModalState] = useState<ChordsModalState>({});
  const [chords, setChords] = useState<string[]>([]);
  const [adaptiveLyrics, setAdaptiveLyrics] = useState<ISongRow[]>([]);
  const [fontSize, setFontSize] = useState(18);

  function generateWrappedLyrics() {
    setAdaptiveLyrics(generateLyrics(lyrics, fontSize));
  }

  useEffect(() => {
    scrollToTop();
    generateWrappedLyrics();
    // let allChords = new Set<string>();
    // lyrics.forEach(({line, isChordsRow}) => {
    //   if (isChordsRow) {
    //     allChords = new Set([...Array.from(allChords), ...getChordsFromString(line)]);
    //   }
    // });
    // setChords(Array.from(allChords));
  }, [lyrics]);

  useWindowResize(generateWrappedLyrics);

  const onAuthorClick = () => goToAuthor(author);

  function onChordClick(chordsRow: string) {
    const chords = getChordsFromString(chordsRow);
    setIsModalState({ isModalOpen: true, activeRowChords: chords });
  }

  const onCloseModal = useCallback(() => setIsModalState({}), []);

  return (
    <>
      <div className={styles.content}>
        <p className={styles.header}>
          <span { ...( Object.keys(SongsByAuthorsData[author]).length !== 1
            ? { className: styles.authorClickable, onClick: onAuthorClick }
            : { className: styles.author }) }
          >
            {author}
          </span>
          {` - ${name}`}
        </p>
        <div className={styles.lyrics}>
          {adaptiveLyrics.map(({line, isChordsRow}, index) => {
            return isChordsRow ? (
              <p
                key={`row-${index}`}
                className={cn(styles.row, styles.chord)}
                // onClick={() => onChordClick(line)}
              >
                {line}
              </p>
            ) : (
              <p key={`row-${index}`} className={cn(styles.row, {[styles.chorus]: isChorusLine(line)})}>
                {line}
              </p>
            );
          })}
        </div>
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
