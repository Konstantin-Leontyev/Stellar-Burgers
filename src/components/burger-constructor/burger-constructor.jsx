import React from 'react';
import styles from './burger-constructor.module.css';

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerConstructorElement} from "./burger-constructor-element/burger-constructor-element";

export default function BurgerConstructor({ingredients}) {
  const bun = ingredients.find(ingredient => ingredient.type === 'bun');
  const inner = ingredients.filter(ingredient => ingredient.type !== 'bun');

  return (
    <section className={`${styles.container} pt-25`}>
      <div className={styles.topBottomElement}>
        <BurgerConstructorElement
          type='top'
          price={bun['price']}
          text={bun.name}
          thumbnail={bun.image}
        />
      </div>
      <ul className={styles.ul}>
        <div className={`${styles.scroll} custom-scroll`}>
          {inner.map((ingredient, index) =>
            <>
              <li className={`${styles.mainElement} ${index !== inner.length - 1 ? 'pb-4' : null}`} key={ingredient.id}>
                <BurgerConstructorElement
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
          type='bottom'
          price={bun.price}
          text={bun.name}
          thumbnail={bun.image}
        />
      </div>
      <div className={`${styles.total} pt-10`}>
        <span className="text text_type_digits-medium mr-2">610</span>
        <CurrencyIcon type="primary"/>
        <Button htmlType="button" type="primary" size="large" extraClass="ml-10">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}