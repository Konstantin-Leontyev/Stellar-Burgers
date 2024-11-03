import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import styles from './burger-details-cad.module.css';

import { ModalPreloader } from "../../../modal";
import { getFeed } from "../../../services/websocket/slice";
import { useSelector } from "../../../services/store";
import { getOrderDetails } from "../../../utils/api";
import {TOrder} from "../../../utils/types";

export function BurgerDetailsCard(): React.JSX.Element {
  const { id } = useParams();
  const { orders } = useSelector(getFeed);
  let order: TOrder | undefined;

  useEffect(() => {
    if (orders) {
      order = orders.find(order => order._id === id);
      // TODO delete log
      // console.log(order);
    }

    if (id && !order) {

      // TODO delete log
      console.log(order);
    }
    // eslint-disable-next-line
  }, []);

  return (
    // {isLoading && <ModalPreloader title='Загрузка данных ингредиента ...' />}

      <div className={styles.container}></div>

  );
}