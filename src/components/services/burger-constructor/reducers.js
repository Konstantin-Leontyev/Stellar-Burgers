import { createSlice, nanoid } from '@reduxjs/toolkit';

import { getOrderDetails } from './actions';

const initialState = {
  currentBun: null,
  currentIngredients: [],
  orderDetails: null,
  isOrderDetailsLoading: false,
  hasOrderDetailsRequestError: false,
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
    addCurrentBurgerBun: ((state, action) => {
      state.currentBun = action.payload;
    }),
    addCurrentBurgerIngredient: {
      reducer: ((state, action) => {
        state.currentIngredients = [...state.currentIngredients, action.payload];
      }),
      prepare: (ingredient) => {
        return { payload: {...ingredient, key: nanoid()} }
      }
    },
    deleteCurrentBurgerIngredient: ((state, action) => {
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
