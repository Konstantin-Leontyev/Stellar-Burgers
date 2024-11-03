import React from 'react';
import styles from './ingredients-line-cards.module.css';

import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredient, TIngredientWithCountField} from "../../../utils/types";
import { ingredientsList as list} from "../../../services/burger-ingredients/slice";
import { useSelector } from "../../../services/store";


type TIngredientsLineCardsProps = {
  ingredients: string[];
  date: string;
};

export function IngredientsLineCards({ ingredients, date }: TIngredientsLineCardsProps): React.JSX.Element {
  const ingredientsList = useSelector(list);
  let burgerIngredients: TIngredientWithCountField[] = [];

  ingredients.forEach((ingredient_id) => {
    const ingredient = ingredientsList.find(ingredient => ingredient._id === ingredient_id);
    if(ingredient) {
      const countIngredient: TIngredientWithCountField = { ...ingredient, count: 1 }
      const index = burgerIngredients.findIndex(ingredient => ingredient._id === countIngredient._id);
      if(index !== -1) {
        return burgerIngredients[index].count += 1;
      } else {
        return burgerIngredients.push(countIngredient);
      }
    }
  });

  const price = burgerIngredients.reduce((totalSum, ingredient) => totalSum + ingredient.price , 0)

  const scroll = ingredients.length > 4 ? `${styles.scroll} custom-scroll` : '';

  return (
    <div className={styles.container}>
      <div className={scroll}>
        { burgerIngredients.map(ingredient =>
          <ul className={styles.ul}>
            <li className={styles.li} key={ingredient._id}>
              <div className={styles.wrapper}>
                <div className={`${styles.image} mr-4`}>
                  <div className={styles.circle}>
                    <img className={styles.img} src={ingredient.image} alt={ingredient.name}/>
                  </div>
                </div>
                <div className={styles.name}>
                  <span className={`${styles.span} text text_type_main-default`}>{ingredient.name}</span>

                  <div className={styles.date}>
                    <span className='text text_type_main-mediumd mr-1'>{ingredient.count} x {ingredient.price}</span>
                    <CurrencyIcon type="primary"/>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        )}

      </div>
      <div className={`${styles.wrapper} mt-10 mb-10`}>
        <FormattedDate date={new Date(date)} className={'text_color_inactive'}/>
        <div className={styles.date}>
          <span className='text text_type_main-mediumd mr-1'>{price}</span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
};