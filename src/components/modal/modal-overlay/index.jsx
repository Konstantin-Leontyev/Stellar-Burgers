import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export function ModalOverlay({ onClose }){
  return <div className={`${styles.overlay}`} onClick={onClose}></div>
}
