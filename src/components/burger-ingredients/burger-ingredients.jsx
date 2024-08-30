import React from 'react';
import styles from './burger-ingredients.module.css';

import BurgerIngredientsTab from './burger-ingredients-tab/burger-ingredients-tab';
import BurgerIngredientsCard from './burger-ingredients-card/burger-ingredients-card';
import { ingredientsTypes } from '../utils/constants'

export default function BurgerIngredients({ ingredients }) {
  const titles = ingredientsTypes.map(item => item.title);

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <BurgerIngredientsTab titles={titles} />
      <div className={`${styles.scroll} custom-scroll`}>
        {ingredientsTypes.map(item =>
          <div className="pb-10">
            <span className="text text_type_main-medium">{item.title}</span>
            <ul className={`${styles.wrapper} pl-4 pr-4`}>
              {ingredients.filter(ingredient => ingredient.type === item.type)
                .map(ingredient =>
                  <li className={styles.li} key={ingredient.id}>
                    <BurgerIngredientsCard ingredient={ingredient}/>
                  </li>)}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
