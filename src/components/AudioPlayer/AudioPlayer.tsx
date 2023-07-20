import { FC } from 'react';
import ReactAudioPlayer from 'react-audio-player';

import styles from './AudioPlayer.module.scss';

type Props = {
  mp3?: string | null;
};

const AudioPlayer: FC<Props> = ({ mp3 }) => {
  console.log(mp3);
  return mp3 ? (
    <div className={styles.player}>
      <ReactAudioPlayer
        src={`/mp3/${mp3}`}
        autoPlay={false}
        controls
        controlsList={'nodownload nofullscreen noremoteplayback'}
      />
    </div>) : null;
};

export default AudioPlayer;
