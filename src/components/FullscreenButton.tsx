import React, { type FC, useState } from 'react';

import ExpandFullscreen from '../assets/ExpandFullscreen';
import ExitFullscreen from '../assets/ExitFullscreen';
import IconButton from './IconButton';

const FullscreenButton: FC = () => {
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
    <IconButton
      onClick={toggleFullscreen}
      ariaLabel="toggle fullscrean"
    >
      {fullScreenEnabled ? <ExpandFullscreen /> : <ExitFullscreen />}
    </IconButton>
  );
};

export default FullscreenButton;
