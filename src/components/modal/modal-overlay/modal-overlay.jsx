import React from 'react';
import PropTypes from "prop-types";
import styles from './modal-overlay.module.css';

ModalOverlay.propTypes = {
  onModalClose: PropTypes.func.isRequired
};

export function ModalOverlay({ onModalClose }){

  return <div className={`${styles.overlay}`} onClick={onModalClose}></div>
}
