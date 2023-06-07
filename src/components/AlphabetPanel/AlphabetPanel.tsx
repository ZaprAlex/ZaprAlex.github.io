import React, { FC } from 'react';

import styles from './AlphabetPanel.module.scss';

type AlphabetPanelProps = {
  alphabet: string[];
  onClick: (sign: string) => void;
}

const AlphabetPanel: FC<AlphabetPanelProps> = ({ alphabet, onClick }) => {
  return (
    <div className={styles.panel}>
      {alphabet.map((sign) => (
        <div key={`sign-${sign}`} className={styles.sign} onClick={() => onClick(sign)}>
          {sign}
        </div>
      ))}
    </div>
  );
};

export default AlphabetPanel;
