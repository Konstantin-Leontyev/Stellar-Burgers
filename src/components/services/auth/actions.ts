import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getUser,
  loginUser, logoutUser,
  registerUser, updateUser,
} from '../../utils/api';
import { TLoginData, TUser, TUserRegisterData, TUserUpdateData } from "../../utils/types";
import { setIsAuthChecked } from './slice';


export const register = createAsyncThunk(
  'auth/register',
  async (formData: TUserRegisterData) => {
    return registerUser(formData);
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData: TLoginData) => {
    return loginUser(formData);
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    return logoutUser();
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/patch',
  async (formData: TUserUpdateData) => {
    return updateUser(formData);
  }
);

export const setUser = createAction<TUser>('auth/setUser');

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    try {
      if (localStorage.getItem('accessToken')) {
        return getUser()
          .then((user) => dispatch(setUser(user)))
      }
    } catch(error) {
      throw error
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  }
);
