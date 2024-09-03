import React, {useEffect} from 'react';
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

  const handleOnKeyDown = (e) => {
    if (e.key === "Escape") {
      onModalClose()
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleOnKeyDown);
    return () => {
      document.removeEventListener("keydown", handleOnKeyDown);
    };
  });

  return createPortal(
    (
      <div className={`${styles.container}`}>
        <div className={styles.modal} onClick={onModalClose} onKeyDown={handleOnKeyDown}>
          <span className={`${styles.span} text text_type_main-large ml-10 mt-10 mr-10`}>
            <div className={styles.title}>{title}</div>
            <div className={styles.closeIcon}>
              <CloseIcon type="primary" onClick={onModalClose}/>
            </div>
          </span>
          {children}
        </div>
      </div>
    ),
    modalRoot
  );
}
