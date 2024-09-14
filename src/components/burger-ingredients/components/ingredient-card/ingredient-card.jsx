import React, { useCallback } from 'react';
import { useDrag } from "react-dnd";
import styles from './ingredients-card.module.css';

import { ingredientPropTypes } from "../../../utils/constants";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setIngredientDetails } from "../../../services/ingredient-datails/reducer";
import { useDispatch } from "react-redux";

IngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};

export function IngredientCard({ ingredient }) {
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
  });

  const handleOnClick = useCallback(() => {
    dispatch(setIngredientDetails(ingredient))
  }, [ingredient]);

  return(
    <li className={`${styles.container} pl-4 pr-4`} onClick={handleOnClick} ref={dragRef}>
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
    </li>
  );
}
