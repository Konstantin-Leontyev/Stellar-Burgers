import React from 'react';
import styles from './order-details.module.css';

import { orderDetails } from "../../../services/burger-constructor/reducers";
import { useSelector } from "react-redux";
export function OrderDetails() {
  const { order } = useSelector(orderDetails);

  return (
    <div className={`${styles.wrapper} mb-30`}>
      <span className={`${styles.span} text text_type_digits-large mb-8`}>{order.number}</span>
      <span className={`${styles.span} text text_type_main-medium mb-15`}>идентификатор заказа</span>
      <img className={`${styles.img} mb-15`}/>
      <span className={`${styles.span} text text_type_main-small mb-2`}>Ваш заказ начали готовить</span>
      <span className={`${styles.span} text text_type_main-small text_color_inactive`}>Дождитесь готовности на орбитальной станции</span>
    </div>
  )
}
