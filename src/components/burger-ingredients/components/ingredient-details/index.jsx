import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IngredientDetailsCard } from '../ingredient-details-card';
import { Modal } from '../../../modal';

export function IngredientDetails() {
  const navigate = useNavigate();

  function onModalClose() {
    navigate('/');
  }

  return (
    <Modal
      title="Детали ингредиента"
      onClose={onModalClose}>
      <IngredientDetailsCard />
    </Modal>
  );
}
