import PropTypes from 'prop-types';

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

export const headerItemsInitialState = [
  {
    title: "Конструктор",
    name: "BurgerIcon",
    type: "navItems",
    isActive: true,
    Icon: BurgerIcon
  },
  {
    title: "Лента заказов",
    name: "ListIcon",
    type: "navItems",
    isActive: false,
    Icon: ListIcon
  },
  {
    title: "Личный кабинет",
    name: "ProfileIcon",
    type: "authItems",
    isActive: false,
    Icon: ProfileIcon
  }
]

export const ingredientsUrl = "https://norma.nomoreparties.space/api/ingredients"

export const ingredientsPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export const ingredientsTypes = [
  //   titles: ["Булки", "Соусы", "Начинки"],
  // types: ["bun", "sauce", "main"]
  {
    title: "Булки",
    type: "bun"
  },
  {
    title: "Соусы",
    type: "sauce"
  },
  {
    title: "Начинки",
    type: "main"
  },
]
