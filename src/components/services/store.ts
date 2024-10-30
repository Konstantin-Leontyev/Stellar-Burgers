import {configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { rootReducer as reducer } from './root-reducer';
import { socketMiddleware } from "./middleware/websocket";
import {TExternalFeedActions, wsConnect, wsDisconnect} from "./feed/actions";
import {TInternalFeedActions, wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "./feed/slice";
import { TExternalAuthActions } from "./auth/actions";
import { TInternalAuthActions } from "./auth/slice";
import {TInternalBurgerConstructorActions} from "./burger-constructor/slice";
import {TInternalBurgerIngredientsActions} from "./burger-ingredients/slice";

const webSocketMiddleware = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onConnecting: wsConnecting,
  onClose: wsClose,
  onError: wsError,
  onOpen: wsOpen,
  onMessage: wsMessage,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webSocketMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type TRootState = ReturnType<typeof reducer>;

type TAppActions =
  TExternalAuthActions
  | TInternalAuthActions
  | TExternalFeedActions
  | TInternalFeedActions
  | TInternalBurgerConstructorActions
  | TInternalBurgerIngredientsActions

type TStoreDispatch = ThunkDispatch<TRootState, unknown, TAppActions>;

export const useDispatch = dispatchHook.withTypes<TStoreDispatch>();
export const useSelector = selectorHook.withTypes<TRootState>();
