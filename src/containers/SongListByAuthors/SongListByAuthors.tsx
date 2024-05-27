import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, useSettings } from '../../hooks';
import { scrollToTop } from '../../utils/helper';
import {
  AuthorsAlphabet,
  FavoriteAuthorsAlphabet,
  FavoriteSongDictionaryByAuthors,
  ISongListByAuthors,
  SongDictionaryByAuthors
} from '../../constants/SongsData';
import { useAppNavigation } from '../../components/Navigation';
import AlphabetPanel from '../../components/AlphabetPanel';
import { ReactComponent as MelodyIcon } from '../../assets/melody.svg';

import styles from './SongListByAuthors.module.scss';

type Params = {
  author?: string;
};

const SongListByAuthors: FC = () => {
  const { goToAuthor, goToAuthors, goToSong, goToSongs } = useAppNavigation();
  const { showFavoritesOnly } = useSettings();
  const { author = '' } = useParams<Params>();
  const search = useQuery();
  const char = search.get('char');
  const hasAuthor = Object.keys(SongDictionaryByAuthors).includes(author);
  const authorsList = showFavoritesOnly ? FavoriteSongDictionaryByAuthors : SongDictionaryByAuthors;
  const [filteredAuthors, setFilteredAuthors] = useState<ISongListByAuthors>(authorsList);

  useEffect(scrollToTop, [char]);

  useEffect(() => {
    if (char) {
      setFilteredAuthors(Object.keys(authorsList)
        .filter((author) => author.toUpperCase().startsWith(char))
        .reduce<ISongListByAuthors>((acc, value) => {
          acc[value] = SongDictionaryByAuthors[value];
          return acc;
        }, {}));
    } else {
      setFilteredAuthors(authorsList);
    }
  }, [char, authorsList]);

  useEffect(() => {
    if (author.length && !hasAuthor) {
      goToSongs();
    }

    if (author.length && hasAuthor && SongDictionaryByAuthors[author].length === 1) {
      goToSong(SongDictionaryByAuthors[author][0], author);
    }
  }, [author, goToSong, goToSongs, hasAuthor]);

  const onSignClick = (sign: string) => {
    const filteredAuthors = Object.keys(authorsList).filter((author) => author.toUpperCase().startsWith(sign));
    if (filteredAuthors.length === 1) {
      if (SongDictionaryByAuthors[filteredAuthors[0]].length === 1) {
        goToSong(SongDictionaryByAuthors[filteredAuthors[0]][0], filteredAuthors[0]);
      } else {
        goToAuthor(filteredAuthors[0]);
      }
    } else {
      goToAuthors(sign);
    }
  };

  const onAuthorClick = (value: string) => SongDictionaryByAuthors[value].length === 1
    ? goToSong(SongDictionaryByAuthors[value][0], value)
    : goToAuthor(value);

  return (
    <div className={styles.page}>
      <AlphabetPanel alphabet={showFavoritesOnly ? FavoriteAuthorsAlphabet : AuthorsAlphabet} onClick={onSignClick} />
      <div className={styles.content}>
        {hasAuthor && <p className={styles.header}>{author}</p>}
        <div className={styles.list}>
          {hasAuthor
            ? SongDictionaryByAuthors[author].map((song, index) => (
              <div
                key={`song-${index}`}
                onClick={() => goToSong(song, author)}
                className={styles.text}
              >
                {song.name}
                {song.mp3 && (<MelodyIcon className={styles.icon} />)}
              </div>
            ))
            : Object.keys(filteredAuthors).map((value, index) => (
              <div
                key={`author-${index}`}
                onClick={() => onAuthorClick(value)}
                className={styles.text}
              >
                {value}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SongListByAuthors;
