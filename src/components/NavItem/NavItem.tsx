import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './NavItem.module.scss';

type Props = {
  label: string;
  to: string;
  dataTestId: string;
}

const NavItem: FC<Props> = ({ label, to, dataTestId }) => (
  <NavLink to={to} data-test-id={dataTestId} className={({ isActive}) => cn(styles.nav, {[styles.active]: isActive})}>
    {label}
  </NavLink>
);

export default NavItem;
