import React from 'react'
import styles from './burger-ingredients-card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerIngredientsCard(props: any) {
  const { image, name, price } = props.ingredient;
  console.log(image, name, price)
  return(
    <div className={`${styles.container} pt-6 pl-4 pr-4`}>
      <img className={styles.img} src={image} alt={name}/>
      <Counter count={1} size="default" extraClass="m-1" />
      <div className={`${styles.price} pt-1 pb-1`}>
        <span className="text text_type_digits-default mr-2">{price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <div className={styles.title}>
        <span className="text text_type_main-small">{name}</span>
      </div>
    </div>
  );
}