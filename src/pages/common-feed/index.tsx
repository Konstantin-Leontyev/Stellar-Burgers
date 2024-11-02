import React, {useEffect} from 'react';
import styles from './common-feed.module.css';

import { Feed } from '../../components/feed';
import { ModalPreloader } from '../../components/modal';
import { NumberBlock } from '../../components/number-block';
import { OrderStatus, WSS_PUBLIC_URL } from '../../components/utils/constants';
import { getFeed } from '../../components/services/feed/slice';
import { useDispatch, useSelector } from '../../components/services/store';
import { wsConnect, wsDisconnect } from '../../components/services/feed/actions';

export function CommonFeed(): React.JSX.Element {
  const dispatch = useDispatch();
  const { orders, total, totalToday} = useSelector(getFeed);

  useEffect(() => {
    dispatch(wsConnect(WSS_PUBLIC_URL));

    return () => {
      dispatch(wsDisconnect());
    }
  // eslint-disable-next-line
  }, []);

  if (!orders) {
    return <ModalPreloader title="Подключение к серверу ..." />
  }

  const doneOrdersNumbers = orders
    .filter(order => order.status === OrderStatus.DONE)
    .splice(0, 14)
    .map(order => order.number);

  const pendingOrdersNumber = orders
    .filter(order => order.status === OrderStatus.PENDING)
    .map(order => order.number);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large pt-10 pb-5">Лента заказов</h1>
      <div className={styles.wrapper}>
        <div className={styles.feed}>
          <Feed orders={orders}/>
        </div>
        <div className={`${styles.data} pb-15`}>
          <div className={styles.numbers}>
            <NumberBlock title="Готовы:" numbers={doneOrdersNumbers} colored={true}/>
            <NumberBlock title="В работе:" numbers={pendingOrdersNumber}/>
          </div>
          <span className="text text_type_main-medium">Выполнено за всё время:</span>
          <span className="text text_type_digits-large pb-15">{total}</span>
          <span className="text text_type_main-medium">Выполнено за сегодня:</span>
          <span className="text text_type_digits-large">{totalToday}</span>
        </div>
      </div>
    </div>
  );
}
