import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTE } from '../../constants/route';
import ChordsPageRouter from '../../containers/ChordsPageRouter';
import SongList from '../../containers/SongList';
import SongProvider from '../../containers/SongProvider';
import SongListByAuthors from '../../containers/SongListByAuthors';

const MainPage: FC = () => (
  <Routes>
    <Route path={ROUTE.AUTHORS}>
      <Route index element={<SongListByAuthors />} />
      <Route path=":author">
        <Route index element={<SongListByAuthors />} />
        <Route path=":songName" element={<SongProvider />} />
      </Route>
    </Route>
    <Route path={ROUTE.SONGS} element={<SongList />} />
    <Route path={ROUTE.CHORDS} element={<ChordsPageRouter />} />
    <Route path="/" element={<Navigate to={ROUTE.SONGS} replace />} />
  </Routes>
);

export default MainPage;
