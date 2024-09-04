import React, {useState} from 'react';
import PropTypes from "prop-types";
import styles from './burger-ingredients-tab.module.css';

import {categoryPropTypes} from "../../utils/constants";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';


BurgerIngredientsTab.propTypes = {
  categories: PropTypes.arrayOf(categoryPropTypes).isRequired
};

export function BurgerIngredientsTab({categories}){
  const [current, setCurrent] = useState('Булки');
  return (
    <div className={`${styles.container} pb-10`}>
      {categories.map(category =>
        <Tab value={category.title} active={current === category.title} onClick={setCurrent} key={category.type}>
          {category.title}
        </Tab>
      )}
    </div>
  );
}
