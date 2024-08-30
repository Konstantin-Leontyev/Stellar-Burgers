import React from 'react';
import styles from '../header.module.css';

export default function HeaderItem({item, handleOnClick}) {
  const {Icon, isActive, name, title} = item;

  return (
    <li
      id={name}
      className={`${styles.li} pr-5 pl-5`}
      key={name}
      onClick={handleOnClick}>
      <Icon type={isActive ? 'primary' : 'secondary'}/>
      <span className={`text text_type_main-default ml-2 ${!isActive ? 'text_color_inactive' : null}`}>
        {title}
      </span>
    </li>
  )
}

