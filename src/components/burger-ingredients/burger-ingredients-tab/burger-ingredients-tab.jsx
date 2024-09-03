import React, {useState} from 'react';
import PropTypes from "prop-types";
import styles from './burger-ingredients-tab.module.css';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

BurgerIngredientsTab.propTypes = {
  titles: PropTypes.oneOf(['Булки', 'Соусы', 'Начинки'])
};

export function BurgerIngredientsTab({titles}){
  const [current, setCurrent] = useState('Булки');
  return (
    <div className={`${styles.container} pb-10`}>
      {titles.map((title, index) =>
        <Tab value={title} active={current === title} onClick={setCurrent} key={index}>
          {title}
        </Tab>
      )}
    </div>
  );
}
