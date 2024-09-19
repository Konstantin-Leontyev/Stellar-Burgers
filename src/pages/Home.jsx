import React from 'react';

import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";

export function Home() {
  return (
    <>
      <BurgerIngredients />
      <BurgerConstructor />
    </>
  );
}