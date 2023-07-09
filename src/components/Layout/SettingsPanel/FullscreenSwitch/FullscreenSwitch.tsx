import React, { type FC, useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';

const FullscreenSwitch: FC = () => {
  const [fullScreenEnabled, setFullScreenEnabled] = useState(!!document.fullscreenElement);

  async function toggleFullscreen() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setFullScreenEnabled(true);
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setFullScreenEnabled(false);
      }
    }
  }
  return (
    <FormControlLabel
      control={<Switch checked={fullScreenEnabled} onChange={toggleFullscreen} />}
      label="Fullscreen"
    />
  );
};

export default FullscreenSwitch;
