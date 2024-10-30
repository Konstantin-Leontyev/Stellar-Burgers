import React, {useEffect} from 'react';

import { useDispatch, useSelector } from "../../services/store";
import {wsConnect, wsDisconnect} from "../../services/feed/actions";
import { WSS_URL } from "../../utils/constants";
import { getFeed } from "../../services/feed/slice";

export function Feed(): React.JSX.Element {
  const dispatch = useDispatch();
  const { orders } = useSelector(getFeed);

  useEffect(() => {
    dispatch(wsConnect(WSS_URL));
    console.log(orders)

    return () => {
      dispatch(wsDisconnect());
      console.log('Connection abort')
    }
  // eslint-disable-next-line
  }, []);

  return <span>Feed page</span>
}