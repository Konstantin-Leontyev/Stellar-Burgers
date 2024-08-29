import React, {useState} from 'react';
import styles from './header.module.css';

import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'

import HeaderItem from './header-item/header-item'
import {headerItemsInitialState} from '../utils/constants'

export default function AppHeader() {
  const [items, setItems] = useState(headerItemsInitialState)

  function handleOnClick(e) {
    items.map(item => item.name === e.currentTarget.id ? item.isActive = true : item.isActive = false)
    setItems([
      ...items
    ])
  }

  return (
    <header className={styles.header}>
      <nav className={`${styles.container} pb-4 pt-4`}>
        <ul className={`${styles.ul} ${styles.navItems}`}>
          {items.filter(item => item.type === 'navItems')
            .map(item =>
              <li
                id={item.name}
                className={`${styles.li} pr-5 pl-5`}
                key={item.name}
                onClick={handleOnClick}>
                <HeaderItem item={item}/>
              </li>
            )}
        </ul>
        <Logo/>
        <ul className={`${styles.ul} ${styles.authItems}`}>
          {items.filter(item => item.type === 'authItems')
            .map(item =>
              <li
                id={item.name}
                className={`${styles.li} pr-5 pl-5`}
                key={item.name}
                onClick={handleOnClick}>
                <HeaderItem item={item}/>
              </li>
            )}
        </ul>
      </nav>
    </header>
  );
}
