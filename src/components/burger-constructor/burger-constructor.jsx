import React, { useEffect, useState } from 'react';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import styles from './burger-constructor.module.css';

import { BurgerConstructorElement } from './components/constructor-element/burger-constructor-element';
import { BurgerConstructorTotalPrice } from './components/total-price/burgerConstructorTotalPrice';
import { EmptyElement } from "./components/empty-element/empty-element";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";

import {
  addCurrentBurgerBun,
  addCurrentBurgerIngredient,
  currentBun, currentIngredients,
  isOrderDetailsLoading,
  hasOrderDetailsRequestError,
  showOrderDetails,
} from "../services/burger-constructor/reducers";

export function BurgerConstructor() {
  const dispatch = useDispatch();
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

  const [{ isOver, item }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      if (item.type === 'bun') {
        dispatch(addCurrentBurgerBun(item));
      }
      else {
        dispatch(addCurrentBurgerIngredient(item));
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      item: monitor.getItem()
    })
  });

  const isLoading = useSelector(isOrderDetailsLoading);
  const hasError = useSelector(hasOrderDetailsRequestError);
  const showDetails = useSelector(showOrderDetails);

  const scroll = ingredients.length > 5 ? `${styles.scroll} custom-scroll` : 'mr-5';

  return (
    <section className={`${styles.container} pt-25`} ref={dropTarget}>
      <div className={styles.topBottomElement} >
        {
          bun
          ? <BurgerConstructorElement type="top" ingredient={bun} />
          : <EmptyElement type="top" item={item} isOver={isOver} />
        }
      </div>
      <ul className={styles.ul} >
        <div className={scroll}>
          {
            ingredients.length > 0
              ? ingredients.map((ingredient, index) =>
                <li
                  className={`${styles.mainElement} ${index !== ingredients.length - 1 ? "pb-4" : null}`}
                  key={ingredient.key}
                >
                  <BurgerConstructorElement ingredient={ingredient} />
                </li>)
              : <li className={`${styles.mainElement}`}>
                  <EmptyElement type={"main"} item={item} isOver={isOver}/>
                </li>
          }
        </div>
      </ul>
      <div className={styles.topBottomElement} >
        {
          bun
          ? <BurgerConstructorElement type="bottom" ingredient={bun} />
          : <EmptyElement type={"bottom"} item={item} isOver={isOver} />
        }
      </div>
      {
        bun &&
        ingredients.length > 0 &&
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
