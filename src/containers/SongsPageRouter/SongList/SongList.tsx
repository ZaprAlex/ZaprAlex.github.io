import React, { FC, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';

import { useTheme } from '../../../hooks/useTheme';
import useQuery from "../../../hooks/useQuery";
import { scrollToTop } from '../../../utils/helper';
import { SongsData } from '../../../constants/SongsData';
import { ROUTE } from '../../../constants/route';
import { Themes } from '../../../constants/Themes';
import { useAppNavigation } from '../../../component/Navigation';
import AuthorsAlphabetPanel from '../../../component/AuthorsAlphabetPanel';

import styles from './SongList.module.scss';

type Params = {
    author?: string;
};

const SongList: FC = () => {
    const history = useHistory();
    const { theme } = useTheme();
    const { author = '' } = useParams<Params>();
    const search = useQuery();
    const char = search.get('char');
    const { goToSongs } = useAppNavigation();
    const hasAuthor = !!SongsData[author];
    const [filteredAuthors, setFilteredAuthors] = useState<string[]>(Object.keys(SongsData));

    const goToSong = useCallback((name: string) => history.push(`${ROUTE.SONGS}/${author}/${name}`), [history, author]);

    const goToAuthor = useCallback((value: string) => history.push(`${ROUTE.SONGS}/${value}`), [history]);

    useEffect(scrollToTop, []);

    useEffect(() => {
        const authors = char ? Object.keys(SongsData).filter((author) => author.startsWith(char)) : Object.keys(SongsData);
        if (authors.length === 1) {
            goToAuthor(authors[0]);
        } else {
            setFilteredAuthors(authors);
        }
    }, [char, goToAuthor]);

    useEffect(() => {
        if (author.length && !hasAuthor) {
            goToSongs();
        }

        if (author.length && hasAuthor && Object.keys(SongsData[author]).length === 1) {
            goToSong(Object.keys(SongsData[author])[0]);
        }
    }, [author, goToSong, goToSongs, hasAuthor]);

    function withThemeClassName(classNames: string) {
        return cn(classNames, { [styles.dark]: theme === Themes.DARK });
    }

    return (
        <div className={styles.content}>
            <AuthorsAlphabetPanel />
            {hasAuthor && <p className={withThemeClassName(styles.header)}>{author}</p>}
            <div className={styles.list}>
                {hasAuthor
                    ? Object.keys(SongsData[author]).map((name, index) => (
                          <div
                              key={`song-${index}`}
                              onClick={() => goToSong(name)}
                              className={withThemeClassName(styles.text)}
                          >
                              {name}
                          </div>
                      ))
                    : filteredAuthors.map((value, index) => (
                          <div
                              key={`song-${index}`}
                              onClick={() => goToAuthor(value)}
                              className={withThemeClassName(styles.text)}
                          >
                              {value}
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default SongList;
