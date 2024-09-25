import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import styles from './ingredients-tab.module.css';

import { categoryPropTypes } from '../../../utils/constants';
import { currentTab } from '../../../services/burger-ingredients/reducers';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

IngredientsTab.propTypes = {
  categories: PropTypes.arrayOf(categoryPropTypes).isRequired,
};

export function IngredientsTab({ categories }){
  const current = useSelector(currentTab);

  return (
    <div className={`${styles.container} pb-10`}>
      {categories.map(category =>
        <Tab value={category.title} active={current === category.title} key={category.type}>
          {category.title}
        </Tab>
      )}
    </div>
  );
}
