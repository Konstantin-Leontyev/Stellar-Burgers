import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes, useLocation } from 'react-router-dom';
import './app.modules.css';

import { ForgotPassword, Home, Login, NotFound, Profile, Register, ResetPassword } from '../../pages';
import { Header } from '../header';
import { ModalDetails } from '../modal';
import { getIngredients } from '../services/burger-ingredients/actions';
import { ingredientsList, isIngredientsListLoading, hasIngredientsListRequestError } from '../services/burger-ingredients/reducers';
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line
  }, []);

  const isLoading = useSelector(isIngredientsListLoading);
  const hasError = useSelector(hasIngredientsListRequestError);
  const ingredients = useSelector(ingredientsList);

  return (
    <>
      <Header/>
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      {!isLoading &&
        !hasError &&
        ingredients.length > 0 &&
        <main>
          {state?.backgroundLocation && (
            <Routes>
              <Route path="/ingredients/:id" element={<ModalDetails />}/>
            </Routes>
          )}

          <DndProvider backend={HTML5Backend}>
            <Routes location={state?.backgroundLocation || location}>
              <Route index element={<Home />} />
              <Route path="/ingredients/:id" element={<ModalDetails />}/>
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<NotFound title={"Вы успешно вышли из аккаунта"} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound title={"Такой страницы не существует"} />} />
            </Routes>
          </DndProvider>
        </main>
      }
    </>
  );
}
