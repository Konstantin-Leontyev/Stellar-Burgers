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
