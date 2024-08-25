import React from 'react';

import styles from './header-nav-item.module.css'

// @ts-ignore
// Временно поставил заглушку поскольку не знаю как тип присвоить
export default function HeaderNavItem({ children }) {
  return (
    <li className={`${styles.li} pr-5 pl-5`}>
      {children}
    </li>
  );
}
