import React from 'react';
import styles from './burger-constructor.module.css';

import {BurgerConstructorElement} from './burger-constructor-element/burger-constructor-element';
import {BurgerConstructorTotalPrice} from './burger-constructor-total-price/burgerConstructorTotalPrice';
import {ingredientsPropTypes} from "../utils/constants";

BurgerConstructor.propTypes = {
  ingredients: ingredientsPropTypes.isRequired,
};

export function BurgerConstructor({ingredients}) {
  const bun = ingredients.find(ingredient => ingredient.type === 'bun');
  const inner = ingredients.filter(ingredient => ingredient.type !== 'bun');
  const sum = ingredients.reduce((totalSum, ingredient) => totalSum += ingredient.price, 0);

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
            <>
              <li
                className={`${styles.mainElement} ${index !== inner.length - 1 ? "pb-4" : null}`}
                key={ingredient.id}
              >
                <BurgerConstructorElement
                  type="main"
                  price={ingredient.price}
                  text={ingredient.name}
                  thumbnail={ingredient.image}
                />
              </li>
            </>
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
      <BurgerConstructorTotalPrice sum={sum} />
    </section>
  );
}
