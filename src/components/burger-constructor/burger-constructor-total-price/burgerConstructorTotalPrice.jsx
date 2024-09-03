import React, {useState} from 'react';
import PropTypes from "prop-types";
import styles from './burger-constructor-total-price.module.css'

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

BurgerConstructorTotalPrice.propTypes = {
  sum: PropTypes.number.isRequired
};

export function BurgerConstructorTotalPrice({sum, handleOnClick}) {

  return (
    <div className={`${styles.total} pt-10`}>
      <span className="text text_type_digits-medium mr-2">{sum}</span>
      <CurrencyIcon type="primary"/>
      <Button htmlType="button" type="primary" size="large" extraClass="ml-10" onClick={handleOnClick}>
        Оформить заказ
      </Button>
    </div>
  );
}
