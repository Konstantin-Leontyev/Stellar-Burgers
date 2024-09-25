import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BurgerConstructor } from '../components/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients';
import { ModalPreloader } from '../components/modal';
import { getIngredients } from '../components/services/burger-ingredients/actions';
import {
  hasIngredientsListRequestError, ingredientsList,
  isIngredientsListLoading
} from '../components/services/burger-ingredients/reducers';

export function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line
  }, []);

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
        <>
          <BurgerIngredients />
          <BurgerConstructor />
        </>
      }
    </>
  );
}