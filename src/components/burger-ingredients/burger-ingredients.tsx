import React from 'react';
import styles from './burger-ingredients.module.css';

import BurgerIngredientsTab from "./burger-ingredients-tab/burger-ingredients-tab";

export default function BurgerIngredients() {
  return (
    <div className={`${styles.container}`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <BurgerIngredientsTab />
    </div>
  );
}