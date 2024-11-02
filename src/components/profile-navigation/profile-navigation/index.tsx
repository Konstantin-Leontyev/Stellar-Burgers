import React from 'react';
import styles from './profile-navigation.module.css';

import { NavLink } from 'react-router-dom';

export function ProfileNavigation(): React.JSX.Element {

  const active = `${styles.active} text text_type_main-medium`
  const inactive = `${styles.inactive} text text_type_main-medium text_color_inactive`

  return (
    <div className={styles.navigation}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <NavLink
            className={({isActive}) => isActive ? active : inactive}
            to="/profile">Профиль
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink
            className={({isActive}) => isActive ? active : inactive}
            to="/feed">История заказов
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink
            className={({isActive}) => isActive ? active : inactive}
            to="/logout">Выход
          </NavLink>
        </li>
      </ul>
      <span className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </span>
    </div>
  );
}
