import React, {useEffect} from 'react';
import styles from './common-feed.module.css';

import { getFeed } from "../../components/services/feed/slice";
import { useDispatch, useSelector } from "../../components/services/store";
import { WSS_URL } from "../../components/utils/constants";
import { wsConnect, wsDisconnect } from "../../components/services/feed/actions";
import { NumberBlock } from "../../components/number-block";


export function CommonFeed(): React.JSX.Element {
  const dispatch = useDispatch();
  const { orders } = useSelector(getFeed);

  // useEffect(() => {
  //   dispatch(wsConnect(WSS_URL));
  //   console.log(orders)
  //
  //   return () => {
  //     dispatch(wsDisconnect());
  //     console.log('Connection abort')
  //   }
  // // eslint-disable-next-line
  // }, []);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large pt-10 pb-5">Лента заказов</h1>
      <div className={styles.wrapper}>
        <div className={styles.feed}></div>
        <div className={`${styles.data} pb-15`}>
          <div className={styles.numbers}>
            <NumberBlock title={'Готовы:'} numbers={[454545, 846751, 796458, 456123, 465321]} colored={true}/>
            <NumberBlock title={'В работе:'} numbers={[454545, 846751, 796458]}/>
          </div>
          <span className='text text_type_main-medium'>Выполнено за всё время:</span>
          <span className='text text_type_digits-large pb-15'>28 752</span>
          <span className='text text_type_main-medium'>Выполнено за сегодня:</span>
          <span className='text text_type_digits-large'>138</span>
        </div>
      </div>
    </div>
  )
}