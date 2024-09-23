import React from 'react';
import PropTypes from "prop-types";
import styles from '../header.module.css';
import {NavLink} from "react-router-dom";

const ingredientsPropTypes = PropTypes.shape({
  Icon: PropTypes.elementType.isRequired,
  route: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

HeaderItem.propTypes = {
  item: ingredientsPropTypes.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export function HeaderItem({ item, isActive}) {
  const {Icon, name, title} = item;

  return (
    <li
      id={name}
      className={`${styles.li} pr-5 pl-5`}
    >
      <Icon type={isActive ? "primary" : "secondary"}/>
      <span className={`text text_type_main-default ml-2 ${!isActive ? "text_color_inactive" : null}`}>
        {title}
      </span>
    </li>
  );
}

