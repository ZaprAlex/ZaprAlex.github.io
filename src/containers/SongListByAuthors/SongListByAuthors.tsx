import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { useQuery, useTheme } from '../../hooks';
import { scrollToTop } from '../../utils/helper';
import { AuthorsAlphabet, AuthorsDataKeys, SongsByAuthorsData } from '../../constants/SongsData';
import { Themes } from '../../constants/Themes';
import { useAppNavigation } from '../../components/Navigation';
import AlphabetPanel from '../../components/AlphabetPanel';

import styles from './SongListByAuthors.module.scss';

type Params = {
  author?: string;
};

const SongListByAuthors: FC = () => {
  const { goToAuthor, goToAuthors, goToSong, goToSongs } = useAppNavigation();
  const { theme } = useTheme();
  const { author = '' } = useParams<Params>();
  const search = useQuery();
  const char = search.get('char');
  const hasAuthor = AuthorsDataKeys.includes(author);
  const [filteredAuthors, setFilteredAuthors] = useState<string[]>(AuthorsDataKeys);

  useEffect(scrollToTop, [char]);

  useEffect(() => {
    if (char) {
      setFilteredAuthors(getFilteredAuthors(char));
    } else {
      setFilteredAuthors(AuthorsDataKeys);
    }
  }, [char, goToAuthor]);

  useEffect(() => {
    if (author.length && !hasAuthor) {
      goToSongs();
    }

    if (author.length && hasAuthor && Object.keys(SongsByAuthorsData[author]).length === 1) {
      goToSong(author, Object.keys(SongsByAuthorsData[author])[0]);
    }
  }, [author, goToSong, goToSongs, hasAuthor]);

  function withThemeClassName(classNames: string) {
    return cn(classNames, { [styles.dark]: theme === Themes.DARK });
  }

  const onSignClick = (sign: string) => {
    const authors = getFilteredAuthors(sign);
    if (authors.length === 1) {
      goToAuthor(authors[0]);
    } else {
      goToAuthors(sign);
    }
  };

  const onAuthorClick = (value: string) =>
    Object.keys(SongsByAuthorsData[value]).length === 1
      ? goToSong(value, Object.keys(SongsByAuthorsData[value])[0])
      : goToAuthor(value);

  return (
    <div className={styles.page}>
      <AlphabetPanel alphabet={AuthorsAlphabet} onClick={onSignClick} />
      <div className={styles.content}>
        {hasAuthor && <p className={withThemeClassName(styles.header)}>{author}</p>}
        <div className={styles.list}>
          {hasAuthor
            ? Object.keys(SongsByAuthorsData[author]).map((name, index) => (
              <div
                key={`song-${index}`}
                onClick={() => goToSong(author, name)}
                className={withThemeClassName(styles.text)}
              >
                {name}
              </div>
            ))
            : filteredAuthors.map((value, index) => (
              <div
                key={`author-${index}`}
                onClick={() => onAuthorClick(value)}
                className={withThemeClassName(styles.text)}
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
  return AuthorsDataKeys.filter((author) => author.toUpperCase().startsWith(char));
}

export default SongListByAuthors;
