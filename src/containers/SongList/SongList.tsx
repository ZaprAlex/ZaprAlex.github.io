import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { scrollToTop } from '../../utils/helper';
import { SongsData, SongsByAuthorsData, SongsAlphabet, SongsDataKeys } from '../../constants/SongsData';
import { useQuery } from '../../hooks';
import { useAppNavigation } from '../../components/Navigation';
import AlphabetPanel from '../../components/AlphabetPanel';

import styles from './SongList.module.scss';

const SongListByAuthors: FC = () => {
  const { goToSong, goToSongs } = useAppNavigation();
  const [filteredSongs, setFilteredSongs] = useState<string[]>(SongsDataKeys);
  const search = useQuery();
  const char = search.get('char');

  useEffect(scrollToTop, []);

  useEffect(() => {
    if (char) {
      setFilteredSongs(getFilteredSongs(char));
    } else {
      setFilteredSongs(SongsDataKeys);
    }
  }, [char, goToSong]);

  const onSignClick = (sign: string) => {
    const songs = getFilteredSongs(sign);
    if (songs.length === 1) {
      goToSong(SongsData[songs[0]].author, SongsData[songs[0]].name);
    } else {
      goToSongs(sign);
    }
  };

  return (
    <div className={styles.content}>
      <AlphabetPanel alphabet={SongsAlphabet} onClick={onSignClick} />
      <div className={styles.list}>
        {filteredSongs.map((value, index) => {
          const author = SongsData[value].author;
          const song = SongsData[value].name;

          return (
            <div
              key={`author-${index}`}
              onClick={() => goToSong(author, song)}
              className={styles.text}
            >
              {`${song} - `}<span className={cn(styles.author, {[styles.active]: Object.keys(SongsByAuthorsData[author]).length > 1})}>{author}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function getFilteredSongs(char: string) {
  return SongsDataKeys.filter((value) => value.toUpperCase().startsWith(char));
}

export default SongListByAuthors;
