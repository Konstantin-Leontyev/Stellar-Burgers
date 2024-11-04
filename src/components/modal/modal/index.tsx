import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from "react-router-dom";
import styles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay';

type TModalProps = {
  children: React.JSX.Element;
  closeIcon?: boolean;
  onClose?: () => void;
  title?: string;
};

const modalRoot = document.getElementById('react-modals') as HTMLElement;

export function Modal({ title, children, onClose, closeIcon = true }: TModalProps): React.JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  function onModalClose(): void {
    if (onClose) {
      onClose();
    } else if (isModal) {
      navigate('/');
    }
  }

  useEffect(() => {
    function handleOnKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        onModalClose();
      }
    }
    document.addEventListener('keydown', handleOnKeyDown,);
    return () => {
      document.removeEventListener('keydown', handleOnKeyDown);
    };
    // eslint-disable-next-line
  }, []);


  const textStyle = children.type.name === 'BurgerDetailsCard' ?  'digits-default' : 'main-large';
  const isModal = location.state !== null;
  const justifyContent = isModal ? { justifyContent: 'space-between' } : { justifyContent: 'center' };
  const backgroundColor = isModal ? { backgroundColor: '#1c1c21' } : {};

  return createPortal(
    (
      <div className={styles.container}>
        <ModalOverlay onClose={onModalClose}/>
        <div className={styles.modal} style={backgroundColor}>
          <div className={`${styles.wrapper} mt-10`} style={justifyContent}>
            <span className={`${styles.span} text text_type_${textStyle}`}>{title}</span>
            {
              closeIcon && isModal &&
                <CloseIcon type="primary" onClick={onModalClose}/>
            }
          </div>
          {children}
        </div>
      </div>
    ),
    modalRoot
  );
}
