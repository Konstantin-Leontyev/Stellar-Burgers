import React from 'react';
import styles from './modal-overlay.module.css';

export function ModalOverlay({ onClose }: { onClose: () => void }): React.JSX.Element {
  return <div data-testid='modal_overlay' className={`${styles.overlay}`} onClick={onClose}></div>
}
