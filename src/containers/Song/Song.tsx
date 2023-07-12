import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { getChordsFromString } from '../../utils/stringHelper';
import { scrollToTop } from '../../utils/helper';
import { useInterval, useModal, useSettings, useWindowResize } from '../../hooks';
import { ISongRow, NewSong, SortedSongListByAuthors } from '../../constants/SongsData';
import ModalTypes from '../../constants/ModalTypes';
import { useAppNavigation } from '../../components/Navigation';
import { generateLyrics, isChorusLine } from './helper';

import styles from './Song.module.scss';

type SongProps = {
  song: NewSong;
  lyrics: ISongRow[];
  speed: number;
};

const DEFAULT_SPEED = 70;

const Song: FC<SongProps> = ({ song, lyrics, speed: defaultSpeed }) => {
  const { goToAuthor } = useAppNavigation();
  const { isOpen: isModalOpen, openModal} = useModal();
  const { autoscrollEnabled } = useSettings();
  const [adaptiveLyrics, setAdaptiveLyrics] = useState<ISongRow[]>([]);
  const [fontSize, setFontSize] = useState(18);
  const [paused, setPaused] = useState<boolean>(false);
  const scrollable = autoscrollEnabled && !paused && !isModalOpen;

  useEffect(() => {
    setPaused(false);
  }, [location]);

  useEffect(() => {
    const activatePauseScroll = () => setPaused(true);
    const deactivatePauseScroll = () => setPaused(false);

    const stopScrollAfterEnd = () => {
      const pageDiv = document.getElementById('base');
      if (pageDiv && window.scrollY + window.innerHeight >= pageDiv.scrollHeight) {
        setPaused(true);
      }
    };

    document.addEventListener('mousedown', activatePauseScroll);
    document.addEventListener('mouseup', deactivatePauseScroll);
    document.addEventListener('touchstart', activatePauseScroll);
    document.addEventListener('touchend', deactivatePauseScroll);
    document.addEventListener('scroll', stopScrollAfterEnd);

    return () => {
      document.removeEventListener('mousedown', activatePauseScroll);
      document.removeEventListener('mouseup', deactivatePauseScroll);
      document.removeEventListener('touchstart', activatePauseScroll);
      document.removeEventListener('touchend', deactivatePauseScroll);
      document.removeEventListener('scroll', stopScrollAfterEnd);
    };
  }, [location]);

  useInterval(() => window.scrollBy({ top: 0.5, behavior: 'smooth' }),
    scrollable ? DEFAULT_SPEED : null
  );

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

  const onAuthorClick = (author: string) => goToAuthor(author);

  function onChordClick(chordsRow: string) {
    const chords = getChordsFromString(chordsRow);
    if (chords.length) {
      openModal(ModalTypes.CHORDS, chords);
    }
  }

  return (
    <>
      <div className={styles.content}>
        <p className={styles.header}>
          {song.authors.map((author, index) => (
            <>
              <span key={`author-${index}`} { ...( SortedSongListByAuthors[author].length !== 1
                ? { className: styles.authorClickable, onClick: () => onAuthorClick(author) }
                : { className: styles.author }) }
              >
                {author}
              </span>
              {index < song.authors.length - 1 && (
                ' feat. '
              )}
            </>
          ))}
          {` - ${song.name}`}
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
    </>
  );
};

export default Song;
