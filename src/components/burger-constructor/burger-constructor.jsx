import React, { useEffect, useState } from 'react';
import styles from './burger-constructor.module.css';

import { BurgerConstructorElement } from './components/constructor-element/burger-constructor-element';
import { BurgerConstructorTotalPrice } from './components/total-price/burgerConstructorTotalPrice';
import { EmptyElement } from "./components/empty-element/empty-element";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";

import {
  currentBun, currentIngredients,
  isOrderDetailsLoading,
  hasOrderDetailsRequestError,
  showOrderDetails,
} from "../services/burger-constructor/reducers";
import { useSelector } from "react-redux";

export function BurgerConstructor() {
  const bun = useSelector(currentBun);
  const ingredients = useSelector(currentIngredients);

  const [burger, setBurger] = useState([])

  useEffect(() => {
    setBurger([
      bun,
      ...ingredients,
      bun
    ])
  }, [bun, ingredients]);

  const isLoading = useSelector(isOrderDetailsLoading);
  const hasError = useSelector(hasOrderDetailsRequestError);
  const showDetails = useSelector(showOrderDetails);

  return (
    <section className={`${styles.container} pt-25`}>
      <div className={styles.topBottomElement}>
        {
          bun
          ? <BurgerConstructorElement
              type="top"
              price={bun.price}
              text={bun.name}
              thumbnail={bun.image}
            />
          : <EmptyElement type="top"/>
        }
      </div>
      <ul className={styles.ul}>
        {
          ingredients.length > 0
            ? ingredients.map((ingredient, index) =>
              <div className={`${styles.scroll} custom-scroll`}>
                <li
                  className={`${styles.mainElement} ${index !== ingredients.length - 1 ? "pb-4" : null}`}
                  key={ingredient._id}
                >
                  <BurgerConstructorElement
                    type="main"
                    price={ingredient.price}
                    text={ingredient.name}
                    thumbnail={ingredient.image}
                  />
                </li>
              </div>)
            : <li className={`${styles.mainElement}`}>
                <EmptyElement type={"main"}/>
              </li>
        }

            </ul>
            <div className={styles.topBottomElement}>
        {
          bun
          ? <BurgerConstructorElement
            type="bottom"
            price={bun.price}
            text={bun.name}
            thumbnail={bun.image}
          />
          : <EmptyElement type={"bottom"}/>
        }
      </div>
      {
        bun &&
        ingredients &&
        <BurgerConstructorTotalPrice burger={burger} />
      }
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
