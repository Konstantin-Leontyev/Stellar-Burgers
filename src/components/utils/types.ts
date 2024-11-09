import React from "react";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

import { OrderStatus } from "./constants";

//
// Base types
// ----------------------------------------------------------------------

// accessToken field type
type TAccessToken = { accessToken: string; };

// accessToken field type
type TCount = { count: number; };

// email field type
type TEmail = { email: string; };

// ingredients ID field type
export type TIngredientsId = { ingredients: string[]; };

// ingredient type with key field
export type TIngredientWithKeyField = TIngredient & TKey;

// ingredient type with count field
export type TIngredientWithCountField = TIngredient & TCount;

// key field type
type TKey = { key: string; };

// message field type
type TMessage = { message: string; };

// name field type
type TName = { name: string; };

// number field type
export type TNumber = { number: number; };

// order field type returned by the server to an order request
export type TOrder = TOrderStatus & TName & TNumber & TIngredientsId &
  {
    _id: string;
    createdAt: string;
    updatedAt: string;
    owner?: TUser;
    __v?: number;
  };

// order status field type
export type TOrderStatus = {
  status: OrderStatus;
};

// order number field type
type TOrderNumber = { order: TNumber; };

// password field type
type TPassword = { password: string; };

// refreshToken field type
type TRefreshToken = { refreshToken: string; };

// rout field type
type TRoute = { route: string; };

// success field type
type TSuccess = { success: boolean; };

// title field type
type TTitle = { title: string; };

// type field type
type TType = { type: string; }

// Icon field type
type TIcon = { Icon: ({type}: TIconProps) => React.JSX.Element };

// header item type
export type THeaderItem = TTitle & TName & TRoute & TType & TIcon;

// user data type
export type TUser = TEmail & TName

// user field type
export type TUserData = { user: TUser };

//
// API types
// ----------------------------------------------------------------------

// ingredient type returned by the server to an ingredient request
export type TIngredient = TName & TType & {
  _id: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

// type of response returned by the server to an ingredient request
export type TIngredientsResponse = TSuccess & { data: TIngredient[]; };

// type of response returned by the server to a login request
export type TLoginResponse = TRefreshedTokensResponse & TUserData;

// login request body type
export type TLoginRequest = TEmail & TPassword;

// type of response returned by the server to a logout request
export type TLogoutResponse = TMessageResponse;

// generic server response type, including only success and message base typed fields
export type TMessageResponse = TSuccess & TMessage;

// type of response returned by the server to an order details request
export type TOrderInfoResponse = TSuccess & TName & TOrderNumber;

// type of websocket message returned by the server
export type TOrderList = TSuccess & {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

// type of response returned by the server to an order request
export type TOrderDetailsResponse = TSuccess & {
  orders: TOrder[];
}

// type of response returned by the server to a password reset request
export type TPasswordResetResponse = TMessageResponse;

// password request body type
export type TPasswordResetRequest = TPassword & { token: string };

// password reset email conformation request body type
export type TPasswordConformationRequest = TEmail;

// type of response returned by the server to a password reset confirmation email request
export type TPasswordConfirmationResponse = TMessageResponse;

// type of response returned by the server to a token refresh request
export type TRefreshedTokensResponse = TSuccess & TAccessToken & TRefreshToken;

// user register request body type
export type TRegistrationRequest = TName & TEmail & TPassword;

// type of response returned by the server to a user registration request
export type TRegistrationResponse = TRefreshedTokensResponse & TUserData;

// type of response returned by the server to a user data request
export type TUserDataResponse = TSuccess & TUserData;

// type of response returned by the server to a user update request
export type TUserUpdateResponse = TUserDataResponse;

// user update request body type
export type TUserUpdateRequest = {
  email?: string;
  name?: string;
  password?: string;
};
