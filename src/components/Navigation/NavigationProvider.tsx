import React, { FC, PropsWithChildren, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTE } from '../../constants/route';
import { encodeChord } from '../../utils/stringHelper';
import { ISong } from '../../constants/SongsData';
import { AppNavigationCtx } from '.';

const NavigationProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const goBack = useCallback(() => navigate(-1), [navigate]);

  const goRoot = useCallback(() => navigate(ROUTE.SONGS), [navigate]);

  const goToSongs = useCallback((sign?: string) => navigate(`${ROUTE.SONGS}${sign ? `?char=${sign}`: ''}`), [navigate]);

  const goToAuthors = useCallback((sign?: string) => navigate(`${ROUTE.AUTHORS}${sign ? `?char=${sign}`: ''}`), [navigate]);

  const goToAuthor = useCallback(
    (author: string) => navigate(`${ROUTE.AUTHORS}/${author}`),
    [navigate]
  );

  const goToSong = useCallback(
    ({ name }: ISong, author: string) => navigate(`${ROUTE.AUTHORS}/${author}/${name}`),
    [navigate]
  );

  const goToChords = useCallback(() => navigate(ROUTE.CHORDS), [navigate]);

  const goToChord = useCallback(
    (chord: string) => navigate(`${ROUTE.CHORDS}/${encodeChord(chord)}`),
    [navigate]
  );

  const goTo404 = useCallback(() => navigate(ROUTE._404), [navigate]);

  const navigation = useMemo(
    () => ({
      goBack,
      goRoot,
      goToSongs,
      goToSong,
      goToAuthor,
      goToAuthors,
      goToChords,
      goToChord,
      goTo404
    }),
    [goBack, goRoot, goToAuthor, goToAuthors, goToChord, goToChords, goToSongs, goTo404]
  );

  return <AppNavigationCtx.Provider value={navigation}>{children}</AppNavigationCtx.Provider>;
};

export default NavigationProvider;
