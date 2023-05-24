import React, { FC } from 'react';

import { ROUTE } from '../../constants/route';
import NavItem from '../NavItem';

import styles from './Navbar.module.css';

const Navbar: FC = () => (
  <div className={styles.block}>
    <NavItem label="Authors" to={ROUTE.SONGS} dataTestId="nav-item-songs" />
    <NavItem label="Chords" to={ROUTE.CHORDS} dataTestId="nav-item-chords" />
  </div>
);

export default Navbar;
