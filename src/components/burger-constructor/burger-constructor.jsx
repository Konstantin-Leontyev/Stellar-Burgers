import React, { useMemo } from 'react';
import styles from './burger-constructor.module.css';

import { BurgerConstructorElement } from './burger-constructor-element/burger-constructor-element';
import { BurgerConstructorTotalPrice } from './burger-constructor-total-price/burgerConstructorTotalPrice';
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { ingredientsList } from "../services/burger-ingredients/reducers";
import {
  isOrderDetailsLoading,
  hasOrderDetailsRequestError,
  showOrderDetails
} from "../services/burger-constructor/reducers";
import { useSelector } from "react-redux";

export function BurgerConstructor() {
  const ingredients = useSelector(ingredientsList);
  const bun = useMemo(
    () => ingredients.find(ingredient => ingredient.type === 'bun'),
    [ingredients]
  );
  const inner = useMemo(
    () => ingredients.filter(ingredient => ingredient.type !== 'bun'),
    [ingredients]
  );
  const sum = useMemo(
    () => ingredients.reduce((totalSum, ingredient) => totalSum += ingredient.price, 0),
    [ingredients]
  );
  // const idList = useMemo(
  //   () => ingredients.map(ingredient => ingredient._id),
  //   [ingredients]
  // );

  const idList = [bun._id,
"643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa0942", bun._id]

  console.log(idList)
  const isLoading = useSelector(isOrderDetailsLoading);
  const hasError = useSelector(hasOrderDetailsRequestError);
  const showDetails = useSelector(showOrderDetails);

  return (
    <section className={`${styles.container} pt-25`}>
      <div className={styles.topBottomElement}>
        <BurgerConstructorElement
          type="top"
          price={bun.price}
          text={bun.name}
          thumbnail={bun.image}
        />
      </div>
      <ul className={styles.ul}>
        <div className={`${styles.scroll} custom-scroll`}>
          {inner.map((ingredient, index) =>
            <li
              className={`${styles.mainElement} ${index !== inner.length - 1 ? "pb-4" : null}`}
              key={ingredient._id}
            >
              <BurgerConstructorElement
                type="main"
                price={ingredient.price}
                text={ingredient.name}
                thumbnail={ingredient.image}
              />
            </li>
          )}
        </div>
      </ul>
      <div className={styles.topBottomElement}>
        <BurgerConstructorElement
          type="bottom"
          price={bun.price}
          text={bun.name}
          thumbnail={bun.image}
        />
      </div>
      <BurgerConstructorTotalPrice idList={idList} sum={sum} />
      {
        !isLoading &&
        !hasError &&
        showDetails &&
        <Modal >
          <OrderDetails />
        </Modal>
      }
    </section>
  );
}
