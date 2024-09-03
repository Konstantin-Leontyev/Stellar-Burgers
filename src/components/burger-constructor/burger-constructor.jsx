import React, {useState} from 'react';
import styles from './burger-constructor.module.css';

import {BurgerConstructorElement} from './burger-constructor-element/burger-constructor-element';
import {BurgerConstructorTotalPrice} from './burger-constructor-total-price/burgerConstructorTotalPrice';
import {ingredientPropTypes} from "../utils/constants";
import {Modal} from "../modal/modal";
import {IngredientDetails} from "../ingredient-details/ingredient-details";

BurgerConstructor.propTypes = {
  ingredients: ingredientPropTypes.isRequired,
};

export function BurgerConstructor({ingredients}) {
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const bun = ingredients.find(ingredient => ingredient.type === 'bun');
  const inner = ingredients.filter(ingredient => ingredient.type !== 'bun');
  const sum = ingredients.reduce((totalSum, ingredient) => totalSum += ingredient.price, 0);

  const handleOnClick = () => setShowOrderDetails(!showOrderDetails)

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
              key={index}
            >
              <BurgerConstructorElement
                type="main"
                price={ingredient.price}
                text={ingredient.name}
                thumbnail={ingredient.image}
                key={ingredient.id}
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
      <BurgerConstructorTotalPrice sum={sum} handleOnClick={setShowOrderDetails}/>
      {
        showOrderDetails &&
        <Modal setItem={setShowOrderDetails}>
          <IngredientDetails />
        </Modal>
      }
    </section>
  );
}
