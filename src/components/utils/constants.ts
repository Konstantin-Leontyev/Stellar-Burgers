import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { THeaderItem } from "./types";

export const BASE_URL: string = 'https://norma.nomoreparties.space/api/';

export const DELAY: number = 5000;

export const WSS_URL: string = 'wss://norma.nomoreparties.space/orders/all'

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

export enum OrderStatus {
  CREATED = 'created',
  DONE = 'done',
  PENDING = 'pending'
}

export enum WebsocketStatus {
  CONNECTING = 'Connecting ...',
  OFFLINE = 'Offline',
  ONLINE = 'Online'
}
