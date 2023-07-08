import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import IconButton from '../IconButton';
import Navbar from '../Navbar';
import { useSongPreferences } from '../../hooks';
import { HeaderProps } from './types';
import ArrowBack from '../../assets/ArrowBack';
import Star from '../../assets/Star';
import StarFilled from '../../assets/StarFilled';

import styles from './Header.module.scss';

const Header: FC<HeaderProps> = ({
  position = 'sticky',
  className
}) => {
  const navigate = useNavigate();
  const {showFavoritesOnly, switchFavorites} = useSongPreferences();
  const goBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <div
      id="header"
      className={cn(styles.header, styles[position], className)}
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
