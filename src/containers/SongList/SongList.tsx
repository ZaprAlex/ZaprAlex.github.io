import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { scrollToTop } from '../../utils/helper';
import {
  SongsAlphabet,
  SongList,
  NewSong,
  SortedSongListByAuthors
} from '../../constants/SongsData';
import { useQuery } from '../../hooks';
import { useAppNavigation } from '../../components/Navigation';
import AlphabetPanel from '../../components/AlphabetPanel';

import styles from './SongList.module.scss';

const SongListByAuthors: FC = () => {
  const { goToSong, goToSongs } = useAppNavigation();
  const [filteredSongs, setFilteredSongs] = useState<NewSong[]>(SongList);
  const search = useQuery();
  const char = search.get('char');

  useEffect(scrollToTop, [char]);

  useEffect(() => {
    if (char) {
      setFilteredSongs(SongList.filter(({ songAlphabet }) => songAlphabet.includes(char)));
    } else {
      setFilteredSongs(SongList);
    }
  }, [char, goToSong]);

  const onSignClick = (sign: string) => {
    const songs = SongList.filter(({ songAlphabet }) => songAlphabet.includes(sign));
    if (songs.length === 1) {
      goToSong(songs[0]);
    } else {
      goToSongs(sign);
    }
  };

  return (
    <div className={styles.content}>
      <AlphabetPanel alphabet={SongsAlphabet} onClick={onSignClick} />
      <div className={styles.list}>
        {filteredSongs.map((song, index) => {
          const { name, authors } = song;
          return (
            <div
              key={`song-${index}`}
              onClick={() => goToSong(song)}
              className={styles.text}
            >
              {`${name} - `}
              {authors.map((author, index1) => (
                <span key={`author-${index}-${index1}`} className={cn(styles.author, {[styles.active]: SortedSongListByAuthors[author].length > 1})}>{author}</span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SongListByAuthors;
