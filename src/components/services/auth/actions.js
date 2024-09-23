import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../../utils/api";

export const register = createAsyncThunk(
  'auth/register',
  async (formData) => {
    return registerUser(formData);
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData) => {
    return loginUser(formData);
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    return logoutUser();
  }
);

export const getUserInfo = createAsyncThunk(
  'auth/get-user',
  async () => {
    return getUser();
  }
);
