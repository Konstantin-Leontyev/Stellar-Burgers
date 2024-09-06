import React from 'react'
import PropTypes from "prop-types";
import styles from './burger-ingredients-card.module.css'

import { ingredientPropTypes } from "../../utils/constants";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


BurgerIngredientsCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  setItem: PropTypes.func.isRequired
};

export function BurgerIngredientsCard({ ingredient, setItem }) {

  function handleOnClick() {
    setItem({
      ...ingredient
    });
  }

  return(
    <li className={`${styles.container} pl-4 pr-4`} onClick={handleOnClick}>
      <img className={styles.img} src={ingredient.image} alt={ingredient.name}/>
      <Counter count={1} size="default" extraClass="m-1" />
      <div className={`${styles.price} pt-1 pb-1`}>
        <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <div className={styles.title}>
        <span className="text text_type_main-small">{ingredient.name}</span>
      </div>
    </li>
  );
}
