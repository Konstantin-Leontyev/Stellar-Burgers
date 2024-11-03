import React from 'react';
import styles from './burger-name-and-satus.module.css'

import { OrderStatus } from "../../../utils/constants";
import { useLocation } from "react-router-dom";

type TBurgerNameAndStatusProps = {
  name: string;
  status: OrderStatus;
  extraClass?: number;
};

export function BurgerNameAndStatus({ name, status, extraClass=24 }: TBurgerNameAndStatusProps): React.JSX.Element {
  const location = useLocation();
  const orderStatus = status === 'done' ? 'Выполнен' : status === 'created' ? 'Создан' : 'Готовиться';
  const showStatus = location.pathname !== '/feed';

  const padding = { width: `calc(100% - ${extraClass * 2}px)`}

  return (
    <div className={styles.wrapper} style={padding}>
      <span className="text text_type_main-medium mt-6">{name}</span>
      { showStatus &&
        <span className="text text_type_main-default mt-2"
              style={ status === 'done' ? { color: '#00CCCC'} : {}}>
          {orderStatus}
        </span>
      }
    </div>
  );
}