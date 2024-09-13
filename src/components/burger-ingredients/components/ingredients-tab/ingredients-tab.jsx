import React from 'react';
import PropTypes from "prop-types";
import styles from './ingredients-tab.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { categoryPropTypes } from "../../../utils/constants";
import { currentTab } from "../../../services/burger-ingredients/reducers";
import { useSelector } from "react-redux";


IngredientsTab.propTypes = {
  categories: PropTypes.arrayOf(categoryPropTypes).isRequired
};

export function IngredientsTab({ categories }){
  const current = useSelector(currentTab)

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
