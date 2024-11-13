import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { TIngredientWithKeyField, TOrderInfoResponse } from '../../utils/types';
import { getOrderInfo } from './actions';

export type TBurgerConstructorStore = {
  currentBun: TIngredientWithKeyField | null,
  currentIngredients: TIngredientWithKeyField[],
  orderInfo: TOrderInfoResponse | null,
  isOrderInfoLoading: boolean,
  hasOrderInfoRequestError: string | unknown,
};

export const initialState: TBurgerConstructorStore = {
  currentBun: null,
  currentIngredients: [],
  orderInfo: null,
  isOrderInfoLoading: false,
  hasOrderInfoRequestError: null,
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    currentBun: state => state.currentBun,
    currentIngredients: state => state.currentIngredients,
    orderInfo: state => state.orderInfo,
    isOrderInfoLoading: state => state.isOrderInfoLoading,
    hasOrderInfoRequestError: state => state.hasOrderInfoRequestError,
  },
  reducers: {
    addCurrentBurgerBun: ((state, action: PayloadAction<TIngredientWithKeyField>) => {
      state.currentBun = action.payload;
    }),
    addCurrentBurgerIngredient: {
      reducer: ((state, action: PayloadAction<TIngredientWithKeyField>) => {
        state.currentIngredients = [...state.currentIngredients, action.payload];
      }),
      prepare: (ingredient) => {
        return { payload: {...ingredient, key: nanoid()} }
      }
    },
    deleteCurrentBurgerIngredient: ((state, action: PayloadAction<string>) => {
      state.currentIngredients = [...state.currentIngredients.filter(ingredient => ingredient.key !== action.payload)];
    }),
    moveIngredients: ((state, action) => {
      const { hoverIndex, dragIndex } = action.payload;
      const newIngredients = [...state.currentIngredients];
      newIngredients.splice(hoverIndex, 0, newIngredients.splice(dragIndex, 1)[0]);
      state.currentIngredients = newIngredients;
    }),
    resetOrderInfo: ((state) => {
      state.currentBun = null;
      state.currentIngredients = [];
      state.orderInfo = null;
}),
  },
  extraReducers: builder => {
    builder
      .addCase(getOrderInfo.pending, (state) => {
        state.isOrderInfoLoading = true;
        state.hasOrderInfoRequestError = false;
      })
      .addCase(getOrderInfo.fulfilled, (state, action) => {
        state.orderInfo = action.payload;
        state.isOrderInfoLoading = false;
      })
      .addCase(getOrderInfo.rejected, (state, action) => {
        state.hasOrderInfoRequestError = action.error?.message;
        state.isOrderInfoLoading = false;
      })
  }
});

export const {
  currentBun,
  currentIngredients,
  isOrderInfoLoading,
  hasOrderInfoRequestError,
  orderInfo,
} = burgerConstructorSlice.selectors;

export const {
  addCurrentBurgerBun,
  addCurrentBurgerIngredient,
  deleteCurrentBurgerIngredient,
  moveIngredients,
  resetOrderInfo,
} = burgerConstructorSlice.actions;

type TActionsCreator = typeof burgerConstructorSlice.actions;

export type TInternalBurgerConstructorActions = ReturnType<TActionsCreator[keyof TActionsCreator]>;
