import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from './actions'


const initialState = {
  user: null,
  isAuthChecked: false
}

export const authSlice = createSlice ({
  name: 'auth',
  initialState,
  selectors: {
    getUser: state => state.user,
    getIsAuthChecked: state => state.isAuthChecked
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
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthChecked = false;
      })
  }
})

export const { getIsAuthChecked, getUser } = authSlice.selectors;
