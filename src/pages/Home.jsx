import React from 'react';

import { BurgerConstructor } from '../components/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients';

export function Home() {
  return (
    <>
      <BurgerIngredients />
      <BurgerConstructor />
    </>
  );
}