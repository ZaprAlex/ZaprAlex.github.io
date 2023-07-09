import React, { FC } from 'react';

import { useSettings } from '../../../../hooks';

import { FormControlLabel, Switch } from '@mui/material';

const AutoscrollSwitch: FC = () => {
  const { autoscrollEnabled, toggleAutoscroll } = useSettings();

  return (
    <FormControlLabel
      control={<Switch checked={autoscrollEnabled} onChange={toggleAutoscroll} />}
      label="Autoscroll"
    />
  );
};

export default AutoscrollSwitch;
