import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { HeaderItem } from '../header-item';
import { getUser } from "../../services/auth/slice";
import { headerItemsInitialState as items } from '../../utils/constants';
import { useSelector } from "../../services/store";

export function Header(): React.JSX.Element {
  const user = useSelector(getUser)

  const navItems = items.filter(item => item.type === 'navItems');
  const authItems = items.filter(item => item.type === 'authItems');

  return (
    <header className={styles.header}>
      <nav className={`${styles.container} pb-4 pt-4`}>
        <ul data-testid='nav_items' className={`${styles.ul} ${styles.navItems}`}>
          { navItems.map(item =>
            user && item.route === '/feed'
              ? ''
              : <NavLink className={styles.link} to={item.route} key={item.name} >
                  {({isActive}) => <HeaderItem item={item} isActive={isActive}/>}
                </NavLink>
          )}
        </ul >
        <Logo />
        <ul data-testid='auth_items' className={`${styles.ul} ${styles.authItems}`}>
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
