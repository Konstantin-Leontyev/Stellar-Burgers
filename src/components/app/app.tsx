import React from 'react';
import './app.modules.css';

import AppHeader from "../header/header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

export default function App() {
  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
}
