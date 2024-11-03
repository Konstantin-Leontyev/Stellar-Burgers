import React from 'react';

import { BurgerDetailsCard } from "../burger-details-card";
import { Modal } from '../../../modal';

export function BurgerDetails(): React.JSX.Element {

  return (
    <Modal title="Детали ингредиента">
      <BurgerDetailsCard />
    </Modal>
  );
}