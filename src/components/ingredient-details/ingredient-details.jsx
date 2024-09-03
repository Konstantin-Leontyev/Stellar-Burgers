import React from 'react';
import styles from './ingredient-details.module.css';

import {ingredientPropTypes} from "../utils/constants";

IngredientDetails.prorType = {
  ingredient: ingredientPropTypes.isRequired
};

export function IngredientDetails({ingredient}) {
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.img}
        src={ingredient.image_large}
        alt={ingredient.name}/>
      <span className={`${styles.span} text text_type_main-medium pt-4 pb-8`}>{ingredient.name}</span>
      <ul className={`${styles.ul} pb-15`}>
        <li className={styles.li}>
          <span className="text text_type_main-sml text_color_inactive">Калории, ккал</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredient.calories}</span>
        </li>
        <li className={styles.li}>
          <span className="text text_type_main-small text_color_inactive">Белки, г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</span>
        </li>
        <li className={styles.li}>
          <span className="text text_type_main-small text_color_inactive">Жиры, г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredient.fat}</span>
        </li>
        <li className={styles.li}>
          <span className="text text_type_main-small text_color_inactive">Углеводы, г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
}
