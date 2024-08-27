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
            {/*
            TODO
            Пока не умею передавать компоненты в компонент.
            Перенести теги ли в компонент HeaderNavItem, было плохой идеей им там не место.
            Дале дале верну их обратно и оберну теги в цикл.
          */}
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
        {/*
        TODO
        Далее мною добавлен еще один список.
        Предполагается, у авторизованного пользователя
        будет еще ссылка на страницу смены пароля и выйти.
        Потому тут предполагается свой цикл.
      */}
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
