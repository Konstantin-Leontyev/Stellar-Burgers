import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from "prop-types";
import styles from './total-price.module.css'

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderDetails } from "../../../services/burger-constructor/actions";
import { ingredientPropTypes } from "../../../utils/constants";
import { useDispatch } from "react-redux";

TotalPrice.propTypes = {
  bun: ingredientPropTypes.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export function TotalPrice({ bun, ingredients }) {
  const dispatch = useDispatch();
  const [burger, setBurger] = useState([])

  useEffect(() => {
    setBurger([
      bun,
      ...ingredients,
      bun,
    ])
  }, [bun, ingredients]);

  const idList = useMemo(
    () => burger.map(ingredient => ingredient._id),
    [burger]
  );

  const sum = useMemo(
    () => burger.reduce((totalSum, ingredient) => totalSum += ingredient.price, 0),
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
