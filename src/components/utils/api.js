import { baseUrl } from './constants';

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка ${response.status}`);
}

function request(endpoint, options) {
   return fetch(baseUrl.concat(endpoint), options)
    .then(checkResponse)
}

function getIngredientsList(jsonResponse) {
  return jsonResponse.data;
}

export function getIngredients() {
  return request('ingredients')
    .then(getIngredientsList)
}

export function getOrderDetails(burgerIngredients) {
  let options ={
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({'ingredients': burgerIngredients})
  }

  return request('orders', options)
}
