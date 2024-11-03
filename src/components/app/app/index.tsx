import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import './app.module.css';

import {
  CommonFeed, ForgotPassword, Home,
  Login, Logout, NotFound, Profile,
  ProfileOrders, Register, ResetPassword
} from '../../../pages';
import { BurgerDetails } from "../../feed";
import { IngredientDetails } from '../../burger-ingredients';
import { Header } from '../../header';
import { OnlyAuth, OnlyUnAuth } from '../index';
import { getIngredients } from '../../services/burger-ingredients/actions';
import { checkUserAuth } from '../../services/auth/actions';
import { useDispatch } from '../../services/store';

// TODO check all import fo ', html for ", and ) for; and last line fo _ text prop for ""

export function App(): React.JSX.Element {
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
        { state?.backgroundLocation && (
          <Routes>
            <Route path="/ingredients/:id" element={<IngredientDetails />}/>
            <Route path="/feed/:id" element={<BurgerDetails />}/>
            <Route path="/profile/orders/:id" element={<BurgerDetails />}/>
          </Routes>
        )}

        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<OnlyUnAuth component={<CommonFeed />} />} />
          <Route path="/feed/:id" element={<OnlyUnAuth component={<BurgerDetails />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />}/>
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path="/logout" element={<Logout title="Вы успешно вышли из аккаунта" />} />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
          <Route path="/profile/orders" element={<OnlyAuth component={<ProfileOrders />} />} />
          <Route path="/profile/orders/:id" element={<OnlyAuth component={<BurgerDetails />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path="*" element={<NotFound title="Такой страницы не существует" />} />
        </Routes>
      </main>
    </>
  );
}
