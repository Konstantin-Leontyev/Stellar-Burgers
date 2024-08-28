import React from 'react';
import styles from './header.module.css';

import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import HeaderNavItem from './header-nav-item/header-nav-item'

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} pb-4 pt-4`}>
        <nav>
          <ul className={`${styles.ul} ${styles.navItems}`}>
            <HeaderNavItem>
              <BurgerIcon type="primary"/>
              <span className="text text_type_main-default ml-2">
              Конструктор
            </span>
            </HeaderNavItem>
            <HeaderNavItem>
              <ListIcon type="primary"/>
              <span className="text text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </span>
            </HeaderNavItem>
          </ul>
        </nav>
        <div className={styles.logo}>
          <Logo/>
        </div>
        <nav>
          <ul className={`${styles.ul} ${styles.authItems}`}>
            <HeaderNavItem>
              <ProfileIcon type="secondary"/>
              <span className="text text_type_main-default text_color_inactive ml-2">
                Личный кабинет
              </span>
            </HeaderNavItem>
          </ul>
        </nav>
      </div>
    </header>
  );
}
