import React, { useEffect } from 'react';
import styles from '../pages.module.css';

import { logout } from '../../components/services/auth/actions';
import { useDispatch } from "../../components/services/store";

export function Logout ({ title }: { title: string }): React.JSX.Element {
  const dispatch= useDispatch();

  useEffect(() => {
    dispatch(logout());
    // eslint-disable-next-line
  }, [])

  return <span 
    data-testid='logout_title'
    className={`${styles.container} text text_type_main-large`}>{title}</span>
}
