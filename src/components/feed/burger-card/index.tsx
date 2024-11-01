import React from 'react';
import styles from './burger-card.module.css'

import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder } from "../../utils/types";
import { ingredientsList } from "../../services/burger-ingredients/slice";
import { useSelector } from "../../services/store";

type TBurgerCardProps = {
  order: TOrder
};

export function BurgerCard({ order }: TBurgerCardProps): React.JSX.Element {
  const ingredients = useSelector(ingredientsList);
  const burgerIngredients = ingredients.filter(ingredient => order.ingredients.includes(ingredient._id));
  const price = burgerIngredients.reduce((totalSum, ingredient) => totalSum += ingredient.price, 0)

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
            burgerIngredients.map((ingredient, index) =>
              <li className={`${styles.li}`} style={{ left: `${-15 * index}px`, zIndex: `${10 -index}` }} key={ingredient._id}>
                <div className={styles.circle}>
                  <img className={styles.img} src={ingredient.image} alt={ingredient.name}/>
                </div>
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
