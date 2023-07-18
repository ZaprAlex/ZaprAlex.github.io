import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import IconButton from '../IconButton';
import Navbar from '../Navbar';
import { useSettings } from '../../hooks';
import ArrowBack from '../../assets/ArrowBack';
import Star from '../../assets/Star';
import StarFilled from '../../assets/StarFilled';

import styles from './Header.module.scss';

const Header: FC = () => {
  const navigate = useNavigate();
  const { showFavoritesOnly, switchFavorites } = useSettings();
  const goBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <div
      id="header"
      className={styles.header}
    >
      <div className={styles.slots}>
        <div className={styles.slot}>
          <IconButton onClick={goBack} ariaLabel="go back">
            <ArrowBack />
          </IconButton>
        </div>
        <div className={styles.slot}><Navbar /></div>
        <div className={styles.slot}>
          <IconButton onClick={switchFavorites} ariaLabel="switch favorite">
            {showFavoritesOnly ? <StarFilled /> : <Star />}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
