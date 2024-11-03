import React, {useEffect} from 'react';
import styles from './profile-orders.module.css'

import { Feed } from "../../components/feed";
import { ModalPreloader } from "../../components/modal";
import { ProfileNavigation } from "../../components/profile-navigation";
import { WSS_PRIVET_URL} from "../../components/utils/constants";
import { useDispatch, useSelector } from "../../components/services/store";
import { getFeed } from "../../components/services/websocket/slice";
import { wsConnect, wsDisconnect } from "../../components/services/websocket/actions";

export function ProfileOrders(): React.JSX.Element {
  const dispatch = useDispatch();
  let { orders} = useSelector(getFeed);
  const accessToken = localStorage.getItem('accessToken')?.replace('Bearer ', '');
  const URL = WSS_PRIVET_URL.concat(`?token=${accessToken}`);

  useEffect(() => {

    dispatch(wsConnect(URL));

    return () => {
      dispatch(wsDisconnect());
      console.log('Connection abort')
    }
  // eslint-disable-next-line
  }, []);

  if (!orders) {
    return <ModalPreloader title="Подключение к серверу ..." />
  } else {
    const arrayForSort = [...orders]
    orders = arrayForSort.reverse();
  }

  return (
    <div className={styles.container}>
      <ProfileNavigation />
      <div className={`${styles.wrapper} ml-15`}>
        <Feed orders={orders} />
      </div>
    </div>
  );
}