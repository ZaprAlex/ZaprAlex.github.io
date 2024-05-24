import React, { FC } from 'react';

import { useSettings } from '../../../../hooks';

import { FormControlLabel, Switch } from '@mui/material';

const ShowChordsSwitch: FC = () => {
  const { showChords, toggleShowChords } = useSettings();

  return (
    <FormControlLabel
      control={<Switch checked={showChords} onChange={toggleShowChords} />}
      label="Отображать аккорды"
    />
  );
};

export default ShowChordsSwitch;
