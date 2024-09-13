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
    Icon: BurgerIcon,
  },
  {
    title: "Лента заказов",
    name: "ListIcon",
    type: "navItems",
    isActive: false,
    Icon: ListIcon,
  },
  {
    title: "Личный кабинет",
    name: "ProfileIcon",
    type: "authItems",
    isActive: false,
    Icon: ProfileIcon,
  }
];

export const baseUrl = "https://norma.nomoreparties.space/api/";


export const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export const categoryPropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});
