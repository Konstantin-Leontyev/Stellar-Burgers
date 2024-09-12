import { baseUrl } from './constants';

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка ${response.status}`);
}

function getIngredientsList(jsonResponse) {
  return jsonResponse.data;
}

export function getIngredients() {
  return fetch(baseUrl.concat('ingredients'))
    .then(checkResponse)
    .then(getIngredientsList)
}

export function getOrderDetails(burgerIngredients) {
  return fetch(baseUrl.concat('orders'), {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({'ingredients': burgerIngredients})
  })
    .then(checkResponse)
}
