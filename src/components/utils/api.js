import { baseUrl } from './constants';

let defaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Check response status.
 */
function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return response.json().then((error) => Promise.reject(error));
}

/**
 * Send request and check response status.
 */
function request(endpoint, options) {
  return fetch(baseUrl.concat(endpoint), options)
    .then(checkResponse);
}

/**
 * Set JWT tokens to local storage.
 */
function tokenUpload(responseData) {
  if (!responseData.success) {
    return Promise.reject(`Ошибка ${responseData.status} - ${responseData.details}`);
  }

  localStorage.setItem('accessToken', responseData.accessToken);
  localStorage.setItem('refreshToken', responseData.refreshToken);
  return Promise.resolve(responseData);
}

/**
 * Send JWT tokens refresh request and set them to local storage.
 * @example
 * // request body
 * {
 *   "token": "значение refreshToken"
 * }
 * @example
 * // response
 * {
 *   "success": true,
 *   "accessToken": "Bearer ...",
 *   "refreshToken": ""
 * }
 * @permission Auth only.
 * @returns {Object} Refresh request status and new JWT tokens.
 */
function refreshToken() {
  const options = {
    ...defaultOptions,
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  };
  return request('auth/token', options)
    .then((refreshedData) => {
        return tokenUpload(refreshedData);
    });
}

/**
 * Send authenticated with accessToken request and check response status.
 * If accessToken is expired automatically sent refresh token request,
 * and then repeat base request.
 */
async function requestWithRefresh(endpoint, options) {
  try {
    return await request(endpoint, options);
  } catch(error) {
    if (error.message === 'jwt expired') {
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;
      return request(endpoint, options);
    } else {
      throw error;
    }
  }
}

/**
 * Send ingredients list request.
 * @example
 * // response
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "_id": "643d69a5c3f7b9001cfa093c",
 *       "name": "Краторная булка N-200i",
 *       "type": "bun",
 *       "proteins": 80,
 *       "fat": 24,
 *       "carbohydrates": 53,
 *       "calories": 420,
 *       "price": 1255,
 *       "image": "https://code.s3.yandex.net/react/code/bun-02.png",
 *       "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
 *       "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
 *       "__v": 0
 *     },
 *     ...
 *   ]
 * }
 * @permission Allow any.
 * @returns {Object} Ingredient request status and ingredients object list.
 */
export function getIngredients() {
  return request('ingredients')
    .then((jsonResponse) => {
      return jsonResponse.data;
    });
}

/**
 * Send register request and set JWT tokens for local storage.
 * @example
 * // request body
 * {
 *   "email": "",
 *   "password": "",
 *   "name": ""
 * }
 * @example
 * // response
 * {
 *   "success": true,
 *   "user": {
 *     "email": "",
 *     "name": ""
 *   },
 *   "accessToken": "Bearer ...",
 *   "refreshToken": ""
 * }
 * @permission Allow any.
 * @returns {Object} Register request status, JWT tokens and user object.
 */
export function registerUser(formData) {
  console.log(formData)
  const options = {
    ...defaultOptions,
    body: JSON.stringify(formData),
  };

  return request('auth/register', options)
    .then((response) => {
      return tokenUpload(response);
    });
}

/**
 * Send login request and set JWT tokens for local storage.
 * @example
 * // request body
 * {
 *   "email": "",
 *   "password": ""
 * }
 * @example
 * // response
 * {
 *   "success": true,
 *   "accessToken": "Bearer ...",
 *   "refreshToken": "",
 *   "user": {
 *     "email": "",
 *     "name": ""
 *   }
 * }
 * @permission Allow any.
 * @returns {Object} Login request status, JWT tokens and user object.
 */
export function loginUser(formData) {
  const options = {
    ...defaultOptions,
    body: JSON.stringify(formData),
  };

  return request('auth/login', options)
    .then((response) => {
      return tokenUpload(response);
    });
}

/**
 * Send logout request and delete tokens from local storage.
 * @example
 * // request body
 * {
 *   "token": "refreshToken value"
 * }
 * @example
 * // response
 * {
 *   "success": true,
 *   "message": "Successful logout"
 * }
 * @permission Auth user only.
 * @returns {Object} Logout request status.
 */
export function logoutUser() {
  const options = {
    ...defaultOptions,
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  };

  return request('auth/logout', options)
  .then((response) => {
    if (!response.success) {
      return Promise.reject(response);
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return response;
  });
}

/**
 * Send password reset conformation request.
 * @param {Object} email Submitted user email.
 * @example
 * // request body
 * {
 *   "email": ""
 * }
 * @example
 * // response
 * {
 *   "success": true,
 *   "message": "Reset email sent"
 * }
 * @permission Auth user only.
 * @returns {Object} Email conformation sent status.
 */
export async function sendPasswordResetConformationEmail(email) {
  const options = {
    ...defaultOptions,
    body: JSON.stringify(email)
  }

  return await request('password-reset', options);
}

/**
 * Send reset password request.
 * @param {Object} formData Submitted form data.
 * @example
 * // request body
 * {
 *   "password": "",
 *   "token": ""
 * }
 * @example
 * // response
 * {
 *   "success": true,
 *   "message": "Password successfully reset"
 * }
 * @permission Auth user only.
 * @returns {Object} Password reset request status.
 */
export async function resetPassword(formData) {
  const options = {
    ...defaultOptions,
    body: JSON.stringify(formData)
  }

  return await request(`password-reset/reset`, options);
}

/**
 * Send order details requests.
 * @param {Array<string>} ingredients Burger ingredients _id list.
 * @example
 * // request body
 * {
 *   "ingredients": [
 *     "643d69a5c3f7b9001cfa093d",
 *     "643d69a5c3f7b9001cfa0942",
 *     "643d69a5c3f7b9001cfa0941",
 *     "643d69a5c3f7b9001cfa093d"
 *   ]
 * }
 * @example
 * // response
 * {
 *   "success": true,
 *   "name": "Флюоресцентный spicy био-марсианский бургер",
 *   "order": {
 *     "number": 9422
 *   }
 * }
 * @note Id list should start and end by the same bun ingredient _id, otherwise an error will be returned.
 * @permisson Auth user only.
 * @returns {Object} Order details object.
 */
export function getOrderDetails(ingredients) {
  const options = {
    ...defaultOptions,
    body: JSON.stringify({ingredients}),
    headers: {
        ...defaultOptions.headers,
        authorization: localStorage.getItem("accessToken")
    }
  }

  return request('orders', options);
}

/**
 * Get auth user data.
 * @example
 * // response
 * {
 *   "success": true,
 *   "user": {
 *     "email": "",
 *     "name": ""
 *   }
 * }
 * @permission Auth user only.
 * @returns {Object} Request status and user data.
 */
export async function getUser() {
  const options = {
    ...defaultOptions,
    method: 'GET',
    headers: {
      ...defaultOptions.headers,
      authorization: localStorage.getItem('accessToken')
    }
  }

  try {
    return await requestWithRefresh('auth/user', options)
      .then((response) => {
        tokenUpload(response);
      });
  } catch(error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    throw error;
  }
}

/**
 * Update auth user data.
 * @param {Object} formData Submitted form data.
 * @example
 * // request body
 * {
 *   "email": "",
 *   "password": "",
 *   "name": ""
 * }
 * @example
 * // response
 * {
 *   "success": true,
 *   "user": {
 *     "email": "",
 *     "name": ""
 *   }
 * }
 * @permission Auth user only.
 * @returns {Object} Request status and user data.
 */
export function updateUser(formData) {
  const options = {
    ...defaultOptions,
    method: 'PATCH',
    headers: {
      ...defaultOptions.headers,
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify(formData)
  }

  return requestWithRefresh('auth/user', options);
}
