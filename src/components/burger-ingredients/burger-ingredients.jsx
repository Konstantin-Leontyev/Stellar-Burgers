import React, {useState} from 'react';
import styles from './burger-ingredients.module.css';
import PropTypes from "prop-types";

import {BurgerIngredientsTab} from './burger-ingredients-tab/burger-ingredients-tab';
import {BurgerIngredientsCard} from './burger-ingredients-card/burger-ingredients-card';
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {categories, ingredientPropTypes} from '../utils/constants'
import {Modal} from "../modal/modal";

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export function BurgerIngredients({ingredients}) {
  const [item, setItem] = useState(null)

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <BurgerIngredientsTab categories={categories} />
      <div className={`${styles.scroll} custom-scroll`}>
        {categories.map(category =>
          <div className="pb-10" key={category.type}>
            <span className="text text_type_main-medium">{category.title}</span>
            <ul className={`${styles.wrapper} pl-4 pr-4`}>
              {ingredients.filter(ingredient => ingredient.type === category.type)
                .map(ingredient =>
                  <BurgerIngredientsCard ingredient={ingredient} setItem={setItem} key={ingredient._id}/>
                )}
            </ul>
          </div>
        )}
        {item &&
          <Modal title="Детали ингредиента" setItem={setItem}>
            <IngredientDetails ingredient={item}/>
          </Modal>
        }
      </div>
    </section>
  );
}
