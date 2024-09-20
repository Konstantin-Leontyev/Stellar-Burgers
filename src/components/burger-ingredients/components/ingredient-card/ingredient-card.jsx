import React from 'react';
import {Link, useLocation } from "react-router-dom";
import { useDrag } from "react-dnd";
import styles from './ingredients-card.module.css';

import { ingredientPropTypes } from "../../../utils/constants";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

IngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};

export function IngredientCard({ ingredient }) {
  const location = useLocation();

  const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
  });

  return(
    <li className={`${styles.li} pl-4 pr-4`} ref={dragRef}>
      <Link
        to={`/ingredients/${ingredient._id}`}
        state={{ backgroundLocation : location }}
        style={{ textDecoration: 'none' }}>
        <div className={`${styles.container}`}>
          <img className={styles.img} src={ingredient.image} alt={ingredient.name}/>
          {
            ingredient.__v > 0 &&
            <Counter count={ingredient.__v} size="default" extraClass="m-1" />
          }
          <div className={`${styles.price} pt-1 pb-1`}>
            <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
            <CurrencyIcon type="primary"/>
          </div>
          <div className={styles.title}>
            <span className="text text_type_main-small">{ingredient.name}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
