import React, {useState} from 'react';
import styles from './burger-ingredients-tab.module.css';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

BurgerIngredientsTab.propTypes = {
  titles: PropTypes.oneOf(['Булки', 'Соусы', 'Начинки'])
  // titles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export function BurgerIngredientsTab({titles}){
  const [current, setCurrent] = useState('Булки');
  return (
    <div className={`${styles.container} pb-10`}>
      {titles.map(title =>
        <Tab value={title} active={current === title} onClick={setCurrent}>
          {title}
        </Tab>
      )}
    </div>
  );
}
