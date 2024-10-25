import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { THeaderItem } from "./types";

export const headerItemsInitialState: THeaderItem[] = [
  {
    title: 'Конструктор',
    name: 'BurgerIcon',
    route: '/',
    type: 'navItems',
    Icon: BurgerIcon,
  },
  {
    title: "Лента заказов",
    name: "ListIcon",
    route: '/feed',
    type: 'navItems',
    Icon: ListIcon,
  },
  {
    title: 'Личный кабинет',
    name: 'ProfileIcon',
    route: '/profile',
    type: 'authItems',
    Icon: ProfileIcon,
  },
];

export const baseUrl: string = 'https://norma.nomoreparties.space/api/';

