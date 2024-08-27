import React from 'react';
import styles from './burger-ingredients.module.css';

import { data } from '../utils/data'

import BurgerIngredientsTab from "./burger-ingredients-tab/burger-ingredients-tab";
import BurgerIngredientsCard from "./burger-ingredients-card/burger-ingredients-card";

export default function BurgerIngredients() {
  return (
    <section className={`${styles.container}`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <BurgerIngredientsTab/>
      <h2 className="text text_type_main-medium pt-10">Булки</h2>
      <div className={`${styles.wrapper} pt-6 pl-4 pr-4`}>
        {data.filter(
          (obj) => obj.type === "bun").map(
          (item) => (<BurgerIngredientsCard ingredient={item}/>))}
      </div>
      <h2 className="text text_type_main-medium pt-10">Соусы</h2>
      <div className={`${styles.wrapper} pt-6 pl-4 pr-4`}>
        {data.filter(
          (obj) => obj.type === "sauce").map(
          (item) => (<BurgerIngredientsCard ingredient={item}/>))}
      </div>
      <h2 className="text text_type_main-medium pt-10">Начинки</h2>
      <div className={`${styles.wrapper} pt-6 pl-4 pr-4`}>
        {data.filter(
          (obj) => obj.type === "main").map(
          (item) => (<BurgerIngredientsCard ingredient={item}/>))}
      </div>
    </section>
  );
}