import React from 'react';
import { useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';

import { FilledElement } from '../components/filled-element';
import { EmptyElement } from '../components/empty-element';
import { Modal, ModalPreloader } from '../../modal';
import { OrderDetails } from '../components/order-details';
import { TotalPrice } from '../components/total-price';

import { TIngredientWithKeyField } from '../../utils/types';
import {
  addCurrentBurgerBun,
  addCurrentBurgerIngredient,
  currentBun, currentIngredients,
  isOrderInfoLoading,
  hasOrderInfoRequestError,
  resetOrderInfo,
  orderInfo,
} from '../../services/burger-constructor/slice';
import { resetIngredientCount, setIngredientCount } from '../../services/burger-ingredients/slice';
import { useDispatch, useSelector} from "../../services/store";
import { useLocation } from "react-router-dom";

type TCollectedProps = {
  isOver: boolean;
  item: TIngredientWithKeyField;
};

export function BurgerConstructor(): React.JSX.Element {
  const location = useLocation();
  const dispatch = useDispatch();
  const bun  = useSelector(currentBun);
  const ingredients = useSelector(currentIngredients);
  const [{ isOver, item }, dropTarget] = useDrop<TIngredientWithKeyField, unknown, TCollectedProps>({
    accept: 'ingredient',
    drop(item) {
      if (item.type === 'bun') {
        dispatch(addCurrentBurgerBun(item));
      }
      else {
        dispatch(addCurrentBurgerIngredient(item));
      }
      dispatch(setIngredientCount(item));
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      item: monitor.getItem(),
    }),
  });

  const isLoading = useSelector(isOrderInfoLoading);
  const hasError = useSelector(hasOrderInfoRequestError);
  const details = useSelector(orderInfo);
  
  if(details || isLoading){
    location.state = { backgroundLocation : location }
  }

  const scroll = ingredients.length > 5 ? `${styles.scroll} custom-scroll` : 'mr-5';

  function onModalClose() {
    ingredients.map(ingredient => dispatch(resetIngredientCount(ingredient)));
    dispatch(resetIngredientCount(bun));
    dispatch(resetOrderInfo());
  }

  return (
    <section className={`${styles.container} pt-25`} ref={dropTarget}>
      <>
        <div className={styles.topBottomElement} data-testid='bun_drop'>
          {
            bun
            ? <FilledElement type="top" ingredient={bun} />
            : <EmptyElement type="top" item={item} isOver={isOver} />
          }
        </div>
        <ul className={styles.ul} data-testid='ingredient_drop'>
          <div className={scroll}>
            {
              ingredients.length > 0
                ? ingredients.map((ingredient, index) =>
                  <li
                    className={`${styles.mainElement} ${index !== ingredients.length - 1 ? "pb-4" : null}`}
                    key={ingredient.key}
                  >
                    <FilledElement ingredient={ingredient} index={index}/>
                  </li>)
                : <li className={`${styles.mainElement}`}>
                    <EmptyElement type={"main"} item={item} isOver={isOver}/>
                  </li>
            }
          </div>
        </ul>
        <div className={styles.topBottomElement}>
          {
            bun
            ? <FilledElement type="bottom" ingredient={bun} />
            : <EmptyElement type={"bottom"} item={item} isOver={isOver} />
          }
        </div>
        {
          bun &&
          ingredients.length > 0 &&
          <TotalPrice bun={bun} ingredients={ingredients} />
        }
        {
          isLoading
          ? <ModalPreloader title={'Оформление заказа ...'} />
          : !hasError &&
            details &&
            <Modal onClose={onModalClose}>
              <OrderDetails />
            </Modal>
        }
      </>
    </section>
  );
}
