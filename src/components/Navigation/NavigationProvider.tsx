import React, { FC, PropsWithChildren, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTE } from '../../constants/route';
import { encodeChord } from '../../utils/stringHelper';
import { AppNavigationCtx } from '.';

const NavigationProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const goBack = useCallback(() => navigate(-1), [navigate]);

  const goRoot = useCallback(() => navigate(ROUTE.SONGS), [navigate]);

  const goToSongs = useCallback(() => navigate(ROUTE.SONGS), [navigate]);

  const goToAuthor = useCallback(
    (author: string) => {
      // console.log(`${ROUTE.SONGS}/${author}`)
      return navigate(`${ROUTE.SONGS}/${author}`);
    },
    [navigate]
  );

  const goToSign = useCallback(
    (sign: string) => navigate(`${ROUTE.SONGS}/?char=${sign}`),
    [navigate]
  );

  const goToSong = useCallback(
    (author: string, name: string) => navigate(`${ROUTE.SONGS}/${author}/${name}`),
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
      goToSign,
      goToChords,
      goToChord,
      goTo404
    }),
    [goBack, goRoot, goToAuthor, goToChord, goToChords, goToSign, goToSong, goToSongs, goTo404]
  );

  return <AppNavigationCtx.Provider value={navigation}>{children}</AppNavigationCtx.Provider>;
};

export default NavigationProvider;
