import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import styles from './modal.module.css';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "./modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { resetIngredientDetails, showIngredientDetails } from "../services/ingredient-datails/reducer";
import { resetOrderDetails, showOrderDetails } from "../services/burger-constructor/reducers";
import { useDispatch, useSelector } from "react-redux";

Modal.propType = {
  title: PropTypes.string,
  children: PropTypes.element
};

const modalRoot = document.getElementById("react-modals");

export function Modal({ title, children }) {
  const dispatch = useDispatch();
  const ingredients = useSelector(showIngredientDetails);
  const constructor = useSelector(showOrderDetails);

  function onModalClose() {
    if (ingredients) {
      dispatch(resetIngredientDetails());
    }
    if (constructor) {
      dispatch(resetOrderDetails());
    }
  }

  function handleOnKeyDown(event) {
    if (event.key === "Escape") {
      onModalClose();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleOnKeyDown);
    return () => {
      document.removeEventListener("keydown", handleOnKeyDown);
    };
  }, []);

  return createPortal(
    (
      <div className={styles.wrapper} onKeyDown={handleOnKeyDown}>
        <ModalOverlay onModalClose={onModalClose}/>
        <div className={styles.modal}>
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
