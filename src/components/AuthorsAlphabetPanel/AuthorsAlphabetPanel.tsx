import React, { FC } from 'react';

import { SongsData } from '../../constants/SongsData';
import { useAppNavigation } from '../Navigation';

import styles from './AuthorsAlphabetPanel.module.scss';

const AuthorsAlphabetPanel: FC = () => {
  const { goToSign } = useAppNavigation();
  const alphabet = Array.from(new Set(Object.keys(SongsData).map((author) => author.charAt(0))));

  return (
    <div className={styles.panel}>
      {alphabet.map((sign) => (
        <div key={`sign-${sign}`} className={styles.sign} onClick={() => goToSign(sign)}>
          {sign}
        </div>
      ))}
    </div>
  );
};

export default AuthorsAlphabetPanel;
