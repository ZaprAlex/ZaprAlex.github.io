import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '../../hooks';
import { scrollToTop } from '../../utils/helper';
import {
  AuthorsAlphabet,
  ISongListByAuthors,
  SortedSongListByAuthors
} from '../../constants/SongsData';
import { useAppNavigation } from '../../components/Navigation';
import AlphabetPanel from '../../components/AlphabetPanel';

import styles from './SongListByAuthors.module.scss';

type Params = {
  author?: string;
};

const SongListByAuthors: FC = () => {
  const { goToAuthor, goToAuthors, goToSong, goToSongs } = useAppNavigation();
  const { author: authorName = '' } = useParams<Params>();
  const search = useQuery();
  const char = search.get('char');
  const author = authorName.split(' feat. ')[0];
  const hasAuthor = Object.keys(SortedSongListByAuthors).includes(author);
  const [filteredAuthors, setFilteredAuthors] = useState<ISongListByAuthors>(SortedSongListByAuthors);

  useEffect(scrollToTop, [char]);

  useEffect(() => {
    if (char) {
      setFilteredAuthors(Object.keys(SortedSongListByAuthors).filter((author) => author.toUpperCase().startsWith(char)).reduce<ISongListByAuthors>((acc, value) => {
        acc[value] = SortedSongListByAuthors[value];
        return acc;
      }, {}));
    } else {
      setFilteredAuthors(SortedSongListByAuthors);
    }
  }, [char]);

  useEffect(() => {
    if (author.length && !hasAuthor) {
      goToSongs();
    }

    if (author.length && hasAuthor && SortedSongListByAuthors[author].length === 1) {
      goToSong(SortedSongListByAuthors[author][0]);
    }
  }, [author, goToSong, goToSongs, hasAuthor]);

  const onSignClick = (sign: string) => {
    const authors = getFilteredAuthors(sign);
    if (authors.length === 1) {
      goToAuthor(authors[0]);
    } else {
      goToAuthors(sign);
    }
  };

  const onAuthorClick = (value: string) => SortedSongListByAuthors[value].length === 1
    ? goToSong(SortedSongListByAuthors[value][0])
    : goToAuthor(value);

  return (
    <div className={styles.page}>
      <AlphabetPanel alphabet={AuthorsAlphabet} onClick={onSignClick} />
      <div className={styles.content}>
        {hasAuthor && <p className={styles.header}>{author}</p>}
        <div className={styles.list}>
          {hasAuthor
            ? SortedSongListByAuthors[author].map((song, index) => (
              <div
                key={`song-${index}`}
                onClick={() => goToSong(song)}
                className={styles.text}
              >
                {song.name}
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

function getFilteredAuthors(char: string) {
  return Object.keys(SortedSongListByAuthors).filter((author) => author.toUpperCase().startsWith(char));
}

export default SongListByAuthors;
