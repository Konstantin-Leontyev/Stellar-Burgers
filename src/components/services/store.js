import { configureStore } from '@reduxjs/toolkit';

import { rootReducer as reducer } from './root-reducer';

export const store = configureStore({
  reducer,
  // Пример подключения middleware
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});
