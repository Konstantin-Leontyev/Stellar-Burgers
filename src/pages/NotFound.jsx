import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import styles from './auth.module.css';

import { logout } from "../components/services/auth/actions";

NotFound.propTypes = {
  title: PropTypes.string.isRequired
}

export function NotFound({title}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout())
    // eslint-disable-next-line
  }, [])

  return <span className={`${styles.container} text text_type_main-large`}>{title}</span>
}
