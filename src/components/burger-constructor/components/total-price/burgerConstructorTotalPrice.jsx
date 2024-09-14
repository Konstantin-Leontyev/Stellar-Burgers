import React, { useCallback, useMemo } from 'react';
import PropTypes from "prop-types";
import styles from './burger-constructor-total-price.module.css'

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderDetails } from "../../../services/burger-constructor/actions";
import { useDispatch } from "react-redux";

BurgerConstructorTotalPrice.propTypes = {
  burger: PropTypes.array.isRequired
};

export function BurgerConstructorTotalPrice({ burger }) {
  const dispatch = useDispatch();

  const sum = useMemo(
    () => burger.reduce((totalSum, ingredient) => totalSum += ingredient.price, 0),
    [burger]
  );
  const idList = useMemo(
    () => burger.map(ingredient => ingredient._id),
    [burger]
  );

  const handleOnClick = useCallback(() => {
    dispatch(getOrderDetails(idList));
  }, [burger]);


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
