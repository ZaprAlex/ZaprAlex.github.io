import React, { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { getChordsFromString } from '../../utils/stringHelper';
import { scrollToTop } from '../../utils/helper';
import { ISong, ISongRow, SongsByAuthorsData } from '../../constants/SongsData';
import { useAppNavigation } from '../../components/Navigation';
import ChordsRowPopUp from '../../components/ChordsRowPopUp';

import styles from './Song.module.scss';
import { getTextWidth } from '../../utils/canvasHelper';
import { useWindowResize } from '../../hooks/windowEventHooks';

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

  useEffect(() => {
    scrollToTop();
    setAdaptiveLyrics(generateLyrics(lyrics, fontSize));
    // let allChords = new Set<string>();
    // lyrics.forEach(({line, isChordsRow}) => {
    //   if (isChordsRow) {
    //     allChords = new Set([...Array.from(allChords), ...getChordsFromString(line)]);
    //   }
    // });
    // setChords(Array.from(allChords));
  }, [lyrics]);

  useWindowResize(() => setAdaptiveLyrics(generateLyrics(lyrics, fontSize)));

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
              <p key={`row-${index}`} className={cn(styles.row, {[styles.chorus]: line.startsWith('Припев:')})}>
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

function generateLyrics(lyrics: ISongRow[], fontSize: number){
  const screenWidth = window.innerWidth - 32;
  const newLyrics: ISongRow[] = [];

  const calcWidth = (line: string) => getTextWidth(line, fontSize);

  // console.log(lyrics);
  for (let i = 0; i < lyrics.length; ++i) {
    const { line, isChordsRow } = lyrics[i];
    const lineWidth = calcWidth(line);
    const trimmedLine = line.trim();

    if (trimmedLine === '\n' || !trimmedLine.length) {
      newLyrics.push({ line });
      continue;
    }

    if (isChordsRow && i + 1 < lyrics.length && !lyrics[i + 1].isChordsRow) {
      let chordsLine = line;
      let songLine = lyrics[i + 1].line;
      const songLineWidth = calcWidth(songLine);

      if (songLineWidth > screenWidth) {
        const delta = Math.round(songLine.length * screenWidth / songLineWidth);

        while (songLine.length || chordsLine.length) {
          const lastSpaceIndexInSongPart = songLine.lastIndexOf(' ', delta);

          if (chordsLine.length) {
            // TODO: проверить перенос посередине аккорда
            const lastSpaceIndexInChordsPart = chordsLine.length > delta ? chordsLine.lastIndexOf(' ', songLine.length > 1 ? lastSpaceIndexInSongPart : delta) : -1;
            const chordsLinePart = chordsLine.substring(0, (lastSpaceIndexInChordsPart === -1 ? chordsLine.length : lastSpaceIndexInChordsPart) + 1);
            newLyrics.push({line: chordsLinePart, isChordsRow: true });
            chordsLine = lastSpaceIndexInChordsPart !== -1 ? chordsLine.substring(lastSpaceIndexInChordsPart + 1, chordsLine.length) : '';
          }

          if (songLine.length) {
            const songDelta = lastSpaceIndexInSongPart === -1 || !chordsLine.length ? songLine.length : lastSpaceIndexInSongPart + 1;
            const songLinePart = songLine.substring(0, songDelta);
            newLyrics.push({line: songLinePart });
            songLine = songLine.length > songDelta ? songLine.substring(songDelta, songLine.length) : '';
          }
        }
        i++;
      } else if (lineWidth > screenWidth) {
        const delta = Math.round(chordsLine.length * screenWidth / lineWidth);

        while (chordsLine.length) {
          const lastSpaceIndex = chordsLine.lastIndexOf(' ', delta);
          const chordsLinePart = chordsLine.substring(0, (lastSpaceIndex === -1 ? chordsLine.length : lastSpaceIndex) + 1);
          newLyrics.push({line: chordsLinePart, isChordsRow: true });
          chordsLine = lastSpaceIndex !== -1 ? chordsLine.substring(lastSpaceIndex + 1, chordsLine.length) : '';
        }
      } else {
        newLyrics.push({ line, isChordsRow });
      }

      // TODO: переработать и избавиться от continue
      continue ;
    }

    newLyrics.push({ line, isChordsRow });
  }
  return newLyrics;
}

export default Song;
