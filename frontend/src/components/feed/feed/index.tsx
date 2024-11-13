import React from 'react';
import styles from './feed.module.css';

import { BurgerCard } from '../components/burger-card';
import { TOrder } from "../../utils/types";

type TFeedProps = {
  orders: TOrder[];
};


export function Feed({ orders }: TFeedProps): React.JSX.Element {
  return (
    <div className={styles.feed}>
      <div className={`${styles.scroll} custom-scroll`}>
        <ul className={styles.ul}>
          {
            orders.map(order =>
              <li className={`${styles.li} mb-4`} key={order.number}>
                <BurgerCard order={order} />
              </li>
            )
          }
        </ul>
      </div>
    </div>
  );
}
