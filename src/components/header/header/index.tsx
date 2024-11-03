import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { HeaderItem } from '../header-item';
import { getUser } from "../../services/auth/slice";
import { headerItemsInitialState as items } from '../../utils/constants';
import { useSelector } from "../../services/store";

export function Header(): React.JSX.Element {
  const navItems = items.filter(item => item.type === 'navItems');
  const authItems = items.filter(item => item.type === 'authItems');
  const user = useSelector(getUser);

  return (
    <header className={styles.header}>
      <nav className={`${styles.container} pb-4 pt-4`}>
        <ul className={`${styles.ul} ${styles.navItems}`}>
          { navItems.map(item =>
            item.route === '/websocket' && user
              ? null
              : <NavLink className={styles.link} to={item.route} key={item.name} >
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
