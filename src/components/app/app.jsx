import React, { useEffect } from 'react';
import './app.modules.css';

import { AppHeader } from '../header/header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { getIngredients } from '../services/burger-ingredients/actions';
import { burgerIngredients, loadingStatus, errorStatus } from '../services/burger-ingredients/reducers';
import {useDispatch, useSelector} from "react-redux";

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients())
  }, []);

  const isLoading = useSelector(loadingStatus)
  const hasError = useSelector(errorStatus)
  const ingredients = useSelector(burgerIngredients)

  return (
    <>
      <AppHeader/>
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      {!isLoading &&
        !hasError &&
        ingredients.length > 0 &&
        <main>
          <BurgerIngredients ingredients={ingredients}/>
          <BurgerConstructor ingredients={ingredients}/>
        </main>
      }
    </>
  );
}
