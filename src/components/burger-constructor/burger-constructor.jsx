import React from 'react';
import styles from './burger-constructor.module.css';

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor({ ingredients }) {
  return (
    <section className={`${styles.container} pt-25 pl-4`}>
      <ul className={`${styles.ul}`}>
        <li className={`${styles.li} ${styles.bun}`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Картонная булка N-200i (верх)"
            price={20}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
            extraClass="ml-2"
          />
        </li>
        <ul className={`${styles.ul}  ${styles.scroll} custom-scroll`}>
          {ingredients.filter(ingredients => ingredients.type !== "bun").map(ingredient =>
            <>
              <li className={`${styles.li} ${styles.main}`} key={ingredient.id}>
                <DragIcon type="primary"/>
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                  extraClass="ml-2"
                />
              </li>
            </>
          )}
        </ul>
        <li className={`${styles.li} ${styles.bun}`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Картонная булка N-200i (низ)"
            price={20}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
            extraClass="ml-2"
          />
        </li>
      </ul>
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