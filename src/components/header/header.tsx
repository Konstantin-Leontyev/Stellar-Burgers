import React from 'react';
import './header.modules.css';

import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import HeaderNavItem from './header-nav-item/header-nav-item'

function AppHeader() {
  return (
    <header>
      <div className="container pb-4 pt-4">
        <nav>
          <ul>
            <li>
              <HeaderNavItem>
                <BurgerIcon type="primary"/>
                <span className="text text_type_main-default ml-2">
                  Конструктор
                </span>
              </HeaderNavItem>
            </li>
            <li>
              <HeaderNavItem>
                <ListIcon type="primary"/>
                <span className="text text_type_main-default text_color_inactive ml-2">
                  Лента заказов
                </span>
              </HeaderNavItem>
            </li>
          </ul>
        </nav>
        <Logo/>
        <nav>
          <ul>
            <li>
              <HeaderNavItem>
                <ProfileIcon type="secondary"/>
                <span className="text text_type_main-default text_color_inactive ml-2">
                    Личный кабинет
                  </span>
              </HeaderNavItem>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
