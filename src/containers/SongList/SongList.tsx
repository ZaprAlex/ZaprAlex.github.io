import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { scrollToTop } from '../../utils/helper';
import { AUTHORS_UNION_BLOCK } from '../../constants/common';
import {
  SongsAlphabet,
  SongList,
  ISong,
  SongDictionaryByAuthors,
  FavoriteSongsAlphabet,
  FavoriteSongList
} from '../../constants/SongsData';
import { useQuery, useSettings } from '../../hooks';
import { useAppNavigation } from '../../components/Navigation';
import AlphabetPanel from '../../components/AlphabetPanel';

import styles from './SongList.module.scss';

const EMPTY_LIST_ERROR = 'С выбранными фильтрами ничего не нашлось. \n' +
'Отключите режим "Избранное" или выберите другой фильтр';

function getFilteredSongs(showFavoritesOnly: boolean, char: string | null) {
  const allSongs = showFavoritesOnly ? FavoriteSongList : SongList;
  return char ? allSongs.filter(({ songAlphabet }) => songAlphabet.includes(char)) : allSongs;
}

const SongListByAuthors: FC = () => {
  const { goToSong, goToSongs } = useAppNavigation();
  const { showFavoritesOnly } = useSettings();
  const allSongs = showFavoritesOnly ? FavoriteSongList : SongList;
  const search = useQuery();
  const char = search.get('char');
  const [songs, setSongs] = useState<ISong[]>(getFilteredSongs(showFavoritesOnly, char));

  useEffect(scrollToTop, [char]);

  useEffect(() => {
    setSongs(getFilteredSongs(showFavoritesOnly, char));
  }, [char, showFavoritesOnly]);

  const onSignClick = (sign: string) => {
    const filteredSongs = allSongs.filter(({ songAlphabet }) => songAlphabet.includes(sign));
    if (filteredSongs.length === 1) {
      const song = filteredSongs[0];
      goToSong(song, song.authors[0]);
    } else {
      goToSongs(sign);
    }
  };

  return (
    <div className={styles.content}>
      <AlphabetPanel alphabet={showFavoritesOnly ? FavoriteSongsAlphabet : SongsAlphabet} onClick={onSignClick} />
      <div className={styles.list}>
        {songs.length ? songs.map((song, index) => {
          const { name, authors } = song;
          return (
            <div
              key={`song-${index}`}
              onClick={() => goToSong(song, authors[0])}
              className={styles.text}
            >
              {`${name} - `}
              {authors.map((author, index1) =>
                (
                  <span key={`author-${index1}`}>
                    {index1 > 0 && (
                      <span>{AUTHORS_UNION_BLOCK}</span>
                    )}
                    <span key={`author-${index}-${index1}`} className={cn(styles.author, {[styles.active]: SongDictionaryByAuthors[author].length > 1})}>{author}</span>
                  </span>
                ))}
            </div>
          );
        }) : (
          <p className={styles.emptyListError}>{EMPTY_LIST_ERROR}</p>
        )}
      </div>
    </div>
  );
};

export default SongListByAuthors;
