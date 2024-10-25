import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { rootReducer as reducer } from './root-reducer';

export const store = configureStore({
  reducer,
  // Пример подключения middleware
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

type TRootState = ReturnType<typeof reducer>;
type TStoreDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<TStoreDispatch>;
export const useSelector = selectorHook.withTypes<TRootState>;

