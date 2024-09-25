import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from './pages.module.css';

import { logout } from '../components/services/auth/actions';

Logout.propTypes = {
  title: PropTypes.string.isRequired,
}

export function Logout ({title}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    // eslint-disable-next-line
  }, [])

  return <span className={`${styles.container} text text_type_main-large`}>{title}</span>
}
