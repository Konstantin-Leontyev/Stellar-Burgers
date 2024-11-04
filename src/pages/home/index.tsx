import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerConstructor } from '../../components/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients';
import { ModalPreloader } from '../../components/modal';
import {
  hasIngredientsListRequestError, ingredientsList,
  isIngredientsListLoading
} from '../../components/services/burger-ingredients/slice';
import { useSelector } from "../../components/services/store";

export function Home(): React.JSX.Element {
  const isLoading = useSelector(isIngredientsListLoading);
  const hasError = useSelector(hasIngredientsListRequestError);
  const ingredients = useSelector(ingredientsList);

  return (
    <>
      {isLoading && <ModalPreloader title={'Загрузка ингредиентов ...'} />}
      {hasError && 'Произошла ошибка'}
      {
        !isLoading &&
        !hasError &&
        ingredients.length > 0 &&
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      }
    </>
  );
}
