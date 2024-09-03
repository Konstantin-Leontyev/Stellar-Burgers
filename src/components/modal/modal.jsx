import React from 'react';
import PropTypes from "prop-types";
import styles from './modal.module.css';

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {createPortal} from "react-dom";

Modal.propType = {
  title: PropTypes.string,
  setItem: PropTypes.func.isRequired
};

const modalRoot = document.getElementById("react-modals");

export function Modal({title, setItem, children}) {

  function onModalClose() {
    setItem(null);
  }

  return createPortal(
    (
      <div className={`${styles.container}`}>
        <div className={styles.modal}>
          <span className={`${styles.span} text text_type_main-large pl-10 pt-10 pr-10`}>
            {title}
            <CloseIcon type="primary" onClick={onModalClose}/>
          </span>
          {children}
        </div>
      </div>
    ),
    modalRoot
  );
}