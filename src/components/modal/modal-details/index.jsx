import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IngredientDetails } from '../../burger-ingredients/';
import { Modal } from '../modal';

export function ModalDetails() {
  const navigate = useNavigate();

  function onModalClose() {
    navigate('/');
  }

  return (
    <Modal
      title="Детали ингредиента"
      onClose={onModalClose}>
      <IngredientDetails />
    </Modal>
  );
}
