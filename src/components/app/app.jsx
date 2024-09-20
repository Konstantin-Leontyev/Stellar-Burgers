import React, { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Routes, useLocation, useNavigate} from "react-router-dom";
import './app.modules.css';

import { AppHeader } from '../header/header';
import { IngredientDetails } from "../burger-ingredients/components/ingredient-details/ingredient-details";
import { Home } from "../../pages/Home";
import { Login } from "../../pages/Login";
import { Modal } from "../modal/modal";
import { Register } from "../../pages/Register";
import { ResetPassword } from "../../pages/ResetPassword";
import { ForgotPassword } from "../../pages/ForgotPassword";
import { getIngredients } from '../services/burger-ingredients/actions';
import { ingredientsList, isIngredientsListLoading, hasIngredientsListRequestError } from '../services/burger-ingredients/reducers';
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  // const state = location.state as { backgroundLocation?: location };
  const state = location.state;

  useEffect(() => {
    dispatch(getIngredients())
    // eslint-disable-next-line
  }, []);

  const isLoading = useSelector(isIngredientsListLoading);
  const hasError = useSelector(hasIngredientsListRequestError);
  const ingredients = useSelector(ingredientsList);

  function onModalClose() {
    navigate('/')
  }

  function ModalDetails() {
    return (
      <Modal
        title="Детали ингредиента"
        onClose={onModalClose}>
        <IngredientDetails />
      </Modal>
    );
  }

  return (
    <>
      <AppHeader/>
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
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </DndProvider>
        </main>
      }
    </>
  );
}
