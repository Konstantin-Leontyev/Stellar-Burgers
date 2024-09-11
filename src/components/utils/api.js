import {ingredientsUrl} from './constants';

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
  return fetch(ingredientsUrl)
    .then(checkResponse)
    .then(getIngredientsList)
  }
