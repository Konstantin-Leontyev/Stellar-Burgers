import React, { useState } from 'react';
import styles from './header.module.css';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { HeaderItem } from './header-item/header-item';
import { headerItemsInitialState } from '../utils/constants';
import {NavLink} from "react-router-dom";

export function AppHeader() {
  const [items, setItems] = useState(headerItemsInitialState);
  const navItems = items.filter(item => item.type === 'navItems');
  const authItems = items.filter(item => item.type === 'authItems');

  return (
    <header className={styles.header}>
      <nav className={`${styles.container} pb-4 pt-4`}>
        <ul className={`${styles.ul} ${styles.navItems}`}>
          {navItems.map(item =>
            <NavLink className={styles.link} to={item.route} key={item.name} >
              {({isActive}) => <HeaderItem item={item} isActive={isActive}/>}
            </NavLink>
          )}
        </ul>
        <Logo />
        <ul className={`${styles.ul} ${styles.authItems}`}>
          {authItems.map(item =>
            <NavLink className={styles.link} to={item.route} key={item.name} >
              {({isActive}) => <HeaderItem item={item} isActive={isActive}/>}
            </NavLink>
          )}
        </ul>
      </nav>
    </header>
  );
}
