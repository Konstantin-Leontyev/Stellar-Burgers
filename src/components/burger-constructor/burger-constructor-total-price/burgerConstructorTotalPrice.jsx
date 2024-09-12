import React from 'react';
import PropTypes from "prop-types";
import styles from './burger-constructor-total-price.module.css'

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderDetails } from "../../services/burger-constructor/actions";
import { setOrderDetails } from "../../services/burger-constructor/reducers";
import { useDispatch } from "react-redux";

BurgerConstructorTotalPrice.propTypes = {
  idList: PropTypes.arrayOf(PropTypes.string),
  sum: PropTypes.number.isRequired
};

export function BurgerConstructorTotalPrice({ idList, sum }) {
  const dispatch = useDispatch();
  function handleOnClick() {
    dispatch(getOrderDetails(idList))
    dispatch(setOrderDetails())
  }

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
