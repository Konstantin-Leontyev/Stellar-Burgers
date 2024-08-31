import React from 'react'
import PropTypes from "prop-types";
import styles from './burger-ingredients-card.module.css'

import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

BurgerIngredientsCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export function BurgerIngredientsCard({image, name, price}) {
  return(
    <div className={`${styles.container} pl-4 pr-4`}>
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
