import React from 'react';

import { IngredientDetailsCard } from '../ingredient-details-card';
import { Modal } from '../../../modal';

export function IngredientDetails(): React.JSX.Element {

  return (
    <Modal title="Детали ингредиента">
      <IngredientDetailsCard />
    </Modal>
  );
}
