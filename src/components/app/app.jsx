import React, { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Routes } from "react-router-dom";
import './app.modules.css';

import { AppHeader } from '../header/header';
import { Home } from "../../pages/Home";
import { getIngredients } from '../services/burger-ingredients/actions';
import { ingredientsList, isIngredientsListLoading, hasIngredientsListRequestError } from '../services/burger-ingredients/reducers';
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients())
  }, []);

  const isLoading = useSelector(isIngredientsListLoading);
  const hasError = useSelector(hasIngredientsListRequestError);
  const ingredients = useSelector(ingredientsList);

  return (
    <>
      <AppHeader/>
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      {!isLoading &&
        !hasError &&
        ingredients.length > 0 &&
        <main>
          <DndProvider backend={HTML5Backend}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </DndProvider>
        </main>
      }
    </>
  );
}
