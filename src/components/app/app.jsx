import React, { useEffect, useState } from 'react';
import './app.modules.css';

import { AppHeader } from '../header/header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { ingredientsUrl } from '../utils/constants';

export default function App() {
  const [state, setState] = useState({
    ingredients: [],
    isLoading: false,
    hasError: false
  });

  useEffect(() => {
    const getIngredients = async () => {
      setState({...state, hasError: false, isLoading: true});

      await fetch(ingredientsUrl)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(`Ошибка ${response.status}`);
        })
        .then(jsonResponse => {
          const ingredients = jsonResponse.data;
          setState({...state, ingredients, isLoading: false});
        })
        .catch(error => {
          setState({...state, hasError: true, isLoading: false});
        })
    }

    getIngredients();
  }, []);

  const { ingredients, isLoading, hasError } = state;

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
