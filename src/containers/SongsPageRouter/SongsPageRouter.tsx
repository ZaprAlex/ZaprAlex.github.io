import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import SongList from '../SongList';
import SongProvider from '../SongProvider';

const SongsPageRouter: FC = () => {
  return (
    <Routes>
      <Route index element={<SongList />} />
      <Route path=":author" element={<SongList />} />
      <Route path=":author/:songName" element={<SongProvider />} />
    </Routes>
  );
};

export default SongsPageRouter;
