import React, { useState } from 'react';
import styles from './header.module.css';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

import { HeaderItem } from './header-item/header-item'
import { headerItemsInitialState } from '../utils/constants'

export function AppHeader() {
  const [items, setItems] = useState(headerItemsInitialState)
  const navItems = items.filter(item => item.type === 'navItems')
  const authItems = items.filter(item => item.type === 'authItems')

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
          {navItems.map(item =>
            <HeaderItem item={item} handleOnClick={handleOnClick} key={item.name}/>)
          }
        </ul>
        <Logo/>
        <ul className={`${styles.ul} ${styles.authItems}`}>
          {authItems.map(item =>
            <HeaderItem item={item} handleOnClick={handleOnClick} key={item.name}/>)
          }
        </ul>
      </nav>
    </header>
  );
}
