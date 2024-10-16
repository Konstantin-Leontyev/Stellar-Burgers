type TAccessToken = {
  accessToken: string;
};

type TEmail = {
  email: string;
};

type TMessage = {
  message: string;
}

type TName = {
  name: string;
};

type TPassword = {
  password: string;
};

type TRefreshToken = {
  refreshToken: string;
};

type TSuccess = {
  success: boolean;
};

type TUserData = { user: TEmail & TName };

export type TUserUpdateData = {
  email?: string;
  name?: string;
  password?: string;
};

export type TRefreshedData = TSuccess & TAccessToken & TRefreshToken;

export type TMessageResponse = TSuccess & TMessage;

export type TLoginData = TEmail & TPassword;
export type TLoginResponse = TRefreshedData & TUserData;

export type TLogoutResponse = TMessageResponse;

export type TPasswordResetData = TPassword & { token: string };
export type TPasswordConfirmationResponse = TMessageResponse;
export type TPasswordResetResponse = TMessageResponse;

export type TUserDataResponse = TSuccess & TUserData;

export type TUserRegisterData = TUserData & TPassword;
export type TUserRegisterResponse = TRefreshedData & TUserData;

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobil: string;
  image_large: string;
  __v: number;
};

export type TIngredientID = Pick<TIngredient, '_id'>;

export type TIngredientsResponse = TSuccess & { data: TIngredient[] };

export type TOrderDetails = TSuccess & TName & { order: { number: number} };
