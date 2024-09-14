import React from 'react';
import PropTypes from "prop-types";
import styles from './empty-element.module.css'

EmptyElement.propTypes = {
  type: PropTypes.string.isRequired,
  isOver: PropTypes.bool,
};

export function EmptyElement({ type, item, isOver }) {
  const mainType = type === 'main';

  const text = mainType
    ? 'Выберите и перетащите ингредиенты и соус.'
    : 'Выберете и перетащите булку.';

  const rotation = mainType
    ? styles.main
    : type === 'top'
      ? styles.top
      : styles.bottom;

  const isBunDragging = isOver && !mainType && item.type === 'bun';
  const isInnerDragging = isOver && mainType && item.type !== 'bun';

  const borderColor = isBunDragging ? '#008000' : isInnerDragging ? '#008000' : '#2F2F37';

  return (
    <div className={`${styles.container} ${rotation}`} style={{ borderColor }}>
      <span className="text text_type_main-default">
        {text}
      </span>
    </div>
  );
}
