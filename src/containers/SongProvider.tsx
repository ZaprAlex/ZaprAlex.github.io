import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getSong } from '../api/songService';
import { ISong } from '../constants/SongsData';
import { useAppNavigation } from '../components/Navigation';
import Song from './Song';

type Params = {
  author: string;
  songName: string;
};

const SongProvider: FC = () => {
  const { goTo404 } = useAppNavigation();
  const { author, songName } = useParams<Params>();
  const [song, setSong] = useState<ISong | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getSong(author, songName);
        setSong(res);
      } catch (e) {
        goTo404();
      }
    })();
  }, [author, goTo404, songName]);

  return song && author ? <Song author={author} song={song} /> : null;
};

export default SongProvider;
