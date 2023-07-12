import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getLyrics } from '../api/songService';
import { ISongRow, NewSong, SortedSongListByAuthors } from '../constants/SongsData';
import { useAppNavigation } from '../components/Navigation';
import Song from './Song';

type Params = {
  author: string;
  songName: string;
};

const SongProvider: FC = () => {
  const { goTo404 } = useAppNavigation();
  const { author = '', songName  = ''} = useParams<Params>();
  const [{ song, lyrics, speed = 0 }, setState] = useState<{ song?: NewSong, lyrics: ISongRow[], speed?: number }>({ lyrics: []});

  useEffect(() => {
    (async () => {
      try {
        const song = SortedSongListByAuthors[author].find(({ name }) => name === songName);
        if (song) {
          const lyrics = await getLyrics(song);
          setState({ song, lyrics });
        } else {
          goTo404();
        }
      } catch (e) {
        goTo404();
      }
    })();
  }, [author, goTo404, songName]);

  return song && author ? <Song song={song} lyrics={lyrics} speed={speed} /> : null;
};

export default SongProvider;
