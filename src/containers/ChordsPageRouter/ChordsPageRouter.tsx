import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTE } from '../../constants/route';
import ChordList from './ChordList/ChordList';
import ChordProvider from './ChordProvider';

const ChordsPageRouter: FC = () => (
  <Routes>
    <Route path={`${ROUTE.CHORDS}/:chordName`} element={<ChordProvider />} />
    <Route path={ROUTE.CHORDS} element={<ChordList />} />
    <Route path="*" element={<Navigate to={ROUTE.CHORDS} replace />} />
  </Routes>
);

export default ChordsPageRouter;
