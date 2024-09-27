import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay';

Modal.propType = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element,
  closeIcon: PropTypes.bool,
};

const modalRoot = document.getElementById('react-modals');

export function Modal({ title, onClose, children, closeIcon = true }) {

  function handleOnKeyDown(event) {
    if (event.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleOnKeyDown);
    return () => {
      document.removeEventListener('keydown', handleOnKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  return createPortal(
    (
      <div className={styles.wrapper} onKeyDown={handleOnKeyDown}>
        <ModalOverlay onClose={onClose}/>
        <div className={styles.modal}>
          <span className={`${styles.span} text text_type_main-large ml-10 mt-10 mr-10`}>
            <div className={styles.title}>{title}</div>
            {
              closeIcon &&
              <div className={styles.closeIcon}>
                <CloseIcon type="primary" onClick={onClose}/>
              </div>
            }
          </span>
            {children}
        </div>
      </div>
    ),
    modalRoot
  );
}
