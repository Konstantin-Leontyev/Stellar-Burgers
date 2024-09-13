import React from 'react';
import PropTypes from "prop-types";
import styles from './empty-element.module.css'

EmptyElement.propTypes = {
  type: PropTypes.string.isRequired
};

export function EmptyElement({ type }) {
  const text = type === 'main'
    ? 'Выберите и перетащите ингредиенты и соус.'
    : 'Выберете и перетащите булку.';

  const rotation = type === 'main'
    ? styles.main
    : type === 'top'
      ? styles.top
      : styles.bottom;

  return (
    <div className={`${styles.container} ${rotation}`}>
      <span className="text text_type_main-default">
        {text}
      </span>
    </div>
  );
}