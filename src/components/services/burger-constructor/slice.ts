import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { TIngredientWithKeyField, TOrderDetailsResponse } from "../../utils/types";
import { getOrderDetails } from './actions';

type TBurgerConstructorStore = {
  currentBun: TIngredientWithKeyField | null,
  currentIngredients: TIngredientWithKeyField[],
  orderDetails: TOrderDetailsResponse | null,
  isOrderDetailsLoading: boolean,
  hasOrderDetailsRequestError: string | unknown,
};

const initialState: TBurgerConstructorStore = {
  currentBun: null,
  currentIngredients: [],
  orderDetails: null,
  isOrderDetailsLoading: false,
  hasOrderDetailsRequestError: null,
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    currentBun: state => state.currentBun,
    currentIngredients: state => state.currentIngredients,
    orderDetails: state => state.orderDetails,
    isOrderDetailsLoading: state => state.isOrderDetailsLoading,
    hasOrderDetailsRequestError: state => state.hasOrderDetailsRequestError,
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
    resetOrderDetails: ((state) => {
      state.currentBun = null;
      state.currentIngredients = [];
      state.orderDetails = null;
}),
  },
  extraReducers: builder => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.isOrderDetailsLoading = true;
        state.hasOrderDetailsRequestError = false;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
        state.isOrderDetailsLoading = false;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.hasOrderDetailsRequestError = action.error?.message;
        state.isOrderDetailsLoading = false;
      })
  }
});

export const {
  currentBun,
  currentIngredients,
  isOrderDetailsLoading,
  hasOrderDetailsRequestError,
  orderDetails,
} = burgerConstructorSlice.selectors;

export const {
  addCurrentBurgerBun,
  addCurrentBurgerIngredient,
  deleteCurrentBurgerIngredient,
  moveIngredients,
  resetOrderDetails,
} = burgerConstructorSlice.actions;
