import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTE } from '../../constants/route';
import ChordsPageRouter from '../../containers/ChordsPageRouter';
import SongList from '../../containers/SongList';
import SongProvider from '../../containers/SongProvider';

const MainPage: FC = () => (
  <Routes>
    <Route path={ROUTE.SONGS}>
      <Route index element={<SongList />} />
      <Route path=":author">
        <Route index element={<SongList />} />
        <Route path=":songName" element={<SongProvider />} />
      </Route>
    </Route>
    <Route path={ROUTE.CHORDS} element={<ChordsPageRouter />} />
    <Route path="/" element={<Navigate to={ROUTE.SONGS} replace />} />
  </Routes>
);

export default MainPage;
