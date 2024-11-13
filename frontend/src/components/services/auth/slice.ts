import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import { TUser } from "../../utils/types";
import { login, logout, register, setUser, updateUserProfile } from './actions'


export type TAuthStore = {
  user: TUser | null,
  isAuthChecked: boolean
};

export const initialState: TAuthStore= {
  user: null,
  isAuthChecked: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    getUser: state => state.user,
    getIsAuthChecked: state => state.isAuthChecked,
  },
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(setUser, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
  },
});

export const { setIsAuthChecked } = authSlice.actions;

export const { getIsAuthChecked, getUser } = authSlice.selectors;

type TActionsCreator = typeof authSlice.actions;

export type TInternalAuthActions = ReturnType<TActionsCreator[keyof TActionsCreator]>;
