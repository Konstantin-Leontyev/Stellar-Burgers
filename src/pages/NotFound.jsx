import React from 'react';
import PropTypes from 'prop-types';
import styles from './pages.module.css';

NotFound.propTypes = {
  title: PropTypes.string.isRequired,
}

export function NotFound({title}) {

  return <span className={`${styles.container} text text_type_main-large`}>{title}</span>
}
