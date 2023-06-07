import React, { FC } from 'react';

import { ROUTE } from '../../constants/route';
import NavItem from '../NavItem';

import styles from './Navbar.module.css';

const Navbar: FC = () => (
  <div className={styles.block}>
    <NavItem label="Authors" to={ROUTE.AUTHORS} dataTestId="nav-item-authors" />
    <NavItem label="Songs" to={ROUTE.SONGS} dataTestId="nav-item-songs" />
  </div>
);

export default Navbar;
