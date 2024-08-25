import React from 'react';
import styles from './burger-constructor.module.css';

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor() {
  return (
    <div className={`${styles.container} pt-25 pl-4 pr-4`}>
      <ul className={`${styles.ul}`}>
        <li className={styles.li}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Картонная булка N-200i (верх)"
            price={20}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
            extraClass="ml-2"
          />
        </li>
        <li className={styles.li}>
          <DragIcon type="primary"/>
          <ConstructorElement
            text="Соус традиционный галактический"
            price={30}
            thumbnail="https://code.s3.yandex.net/react/code/sauce-03.png"
            extraClass="ml-2"
          />
        </li>
        <li className={styles.li}>
          <DragIcon type="primary"/>
          <ConstructorElement
            text="Мясо бессмертных моллюсков Protostomia"
            price={300}
            thumbnail="https://code.s3.yandex.net/react/code/meat-02.png"
          />
        </li>
        <li className={styles.li}>
          <DragIcon type="primary"/>
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={300}
            thumbnail="https://code.s3.yandex.net/react/code/sp_1.png"
            extraClass="ml-2"
          />
        </li>
        <li className={styles.li}>
          <DragIcon type="primary"/>
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={80}
            thumbnail="https://code.s3.yandex.net/react/code/sp_1.png"
          />
        </li>
        <li className={styles.li}>
          <DragIcon type="primary"/>
          <ConstructorElement
            text="Хрустящие минеральные кольца"
            price={80}
            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
            extraClass="ml-2"
          />
        </li>
        <li className={styles.li}>
          <DragIcon type="primary"/>
          <ConstructorElement
            text="Хрустящие минеральные кольца"
            price={80}
            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
            extraClass="ml-2"
          />
        </li>
        <li className={styles.li}>
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
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="large" extraClass="ml-10">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}