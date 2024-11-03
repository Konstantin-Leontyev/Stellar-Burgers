import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styles from './burger-details-cad.module.css';

import { BurgerNameAndStatus } from "../burger-name-and-status";
import { IngredientsLineCards } from "../ingredients-line-cards";
import { ModalPreloader } from '../../../modal';
import { TOrder } from '../../../utils/types';
import { useDispatch, useSelector } from '../../../services/store';
import { getOrderDetails } from '../../../services/order-details/actions';
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerDetailsCard(): React.JSX.Element {
  const dispatch = useDispatch();
  const { number } = useParams();
  const order: TOrder | null = useSelector(state => {
    if (number) {
      let orderDetails = state.websocket.feed.orders?.find(obj => obj.number === +number);
      if (orderDetails) {
        return orderDetails;
      }
    }

    return state.order.orderDetails;
  });


  useEffect(() => {
      if (!order && number) {
        dispatch(getOrderDetails(+number))
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      { !order && <ModalPreloader title='Загрузка данных о заказе ...' /> }
      { order &&
        <>
          <BurgerNameAndStatus name={order.name} status={order.status} extraClass={40}/>
          <span className={`${styles.span} text text_type_main-medium ml-10 mt-15 mb-6`}>Состав:</span>
          <IngredientsLineCards ingredients={order.ingredients} date={order.createdAt}/>
        </>
      }
    </>
  );
}