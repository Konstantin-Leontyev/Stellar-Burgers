import React, { useEffect, useState } from 'react';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import styles from './burger-constructor.module.css';

import { FilledElement } from './components/filled-element/filled-element';
import { TotalPrice } from './components/total-price/total-price';
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
import {setIngredientCount} from "../services/burger-ingredients/reducers";

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
      dispatch(setIngredientCount(item))
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
          ? <FilledElement type="top" ingredient={bun} />
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
                  <FilledElement ingredient={ingredient} />
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
          ? <FilledElement type="bottom" ingredient={bun} />
          : <EmptyElement type={"bottom"} item={item} isOver={isOver} />
        }
      </div>
      {
        bun &&
        ingredients.length > 0 &&
        <TotalPrice burger={burger} />
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
