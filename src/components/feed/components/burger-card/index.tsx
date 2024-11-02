import React from 'react';
import styles from './burger-card.module.css'

import {Counter, CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredientWithCountField, TOrder } from "../../../utils/types";
import { ingredientsList } from "../../../services/burger-ingredients/slice";
import { useSelector } from "../../../services/store";

type TBurgerCardProps = {
  order: TOrder
};

export function BurgerCard({ order }: TBurgerCardProps): React.JSX.Element {
  const ingredients = useSelector(ingredientsList);
  const slice = 6;
  const lastIndex = slice - 1
  let burgerIngredients: TIngredientWithCountField[] = [];

  order.ingredients.forEach((ingredient_id) => {
    const ingredient = ingredients.find(ingredient => ingredient._id === ingredient_id)
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

  const price = burgerIngredients.reduce((totalSum, ingredient) => totalSum += ingredient.price * ingredient.count, 0)

  return (
    <div className={styles.container}>
      <div className={`${styles.header} mt-6`}>
        <span className='text text_type_main-default'>#{order.number}</span>
        <FormattedDate date={new Date(order.createdAt)} className='text_color_inactive'/>
      </div>
      <span className={`${styles.span} text text_type_main-medium mt-6`}>{order.name}</span>
      <div className={`${styles.image} mt-6 mb-6`}>
        <ul className={styles.ul}>
          {
            burgerIngredients.slice(0, slice).map((ingredient, index) =>
              <li className={`${styles.li}`} style={{ left: `${-15 * index}px`, zIndex: `${10 -index}` }} key={ingredient._id}>
                <div className={styles.circle}>
                  {index === lastIndex && burgerIngredients.length - slice > 0
                    ? <>
                      <img className={styles.img} src={ingredient.image} alt={ingredient.name}
                           style={{opacity: `60%`}}/>
                      <div className={`${styles.count} text text_type_main-medium`}>
                        +{burgerIngredients.length - slice}
                      </div>
                    </>
                    : <img className={styles.img} src={ingredient.image} alt={ingredient.name}/>
                  }
                </div>
                {ingredient.count > 1 && <Counter count={ingredient.count} size="small" extraClass="m-1"/> }
              </li>
            )
          }
        </ul>
        <div className={styles.price}>
          <span className='text text_type_main-default mr-1'>{price}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}
