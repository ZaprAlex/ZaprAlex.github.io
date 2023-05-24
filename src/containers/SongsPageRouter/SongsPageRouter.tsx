import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTE } from '../../constants/route';
import SongList from '../SongList/SongList';
import SongProvider from '../SongProvider';

const SongsPageRouter: FC = () => {
  return (
    <Routes>
      <Route index element={<SongList />} />
      {/*<Route path={ROUTE.SONGS}>*/}
      <Route path=":author" element={<SongList />} />
      <Route path=":author/:songName" element={<SongProvider />} />
      {/*</Route>*/}
      {/*<Route path="*" element={<SongList />} />*/}
    </Routes>
  );
};

export default SongsPageRouter;
