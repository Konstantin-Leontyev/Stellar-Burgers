import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './app.modules.css';

import { ForgotPassword, Home, Login, Logout, NotFound, Profile, Register, ResetPassword } from '../../pages';
import { IngredientDetails } from "../burger-ingredients";
import { Header } from '../header';
import { OnlyAuth, OnlyUnAuth } from './protected-rout';
import { getIngredients } from '../services/burger-ingredients/actions';
import { checkUserAuth } from '../services/auth/actions';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header/>
      <main>
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/ingredients/:id" element={<IngredientDetails />}/>
          </Routes>
        )}

        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />}/>
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path="/logout" element={<Logout title={"Вы успешно вышли из аккаунта"} />} />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path="*" element={<NotFound title={"Такой страницы не существует"} />} />
        </Routes>
      </main>
    </>
  );
}
