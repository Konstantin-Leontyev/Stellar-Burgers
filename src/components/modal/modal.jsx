import React from 'react';
import PropTypes from "prop-types";
import styles from './modal.module.css';

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "./modal-overlay/modal-overlay";
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
      <ModalOverlay onModalClose={onModalClose}>
        <div className={styles.modal}>
        <span className={`${styles.span} text text_type_main-large ml-10 mt-10 mr-10`}>
          <div className={styles.title}>{title}</div>
          <div className={styles.closeIcon}>
            <CloseIcon type="primary" onClick={onModalClose}/>
          </div>
        </span>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalRoot
  );
}
