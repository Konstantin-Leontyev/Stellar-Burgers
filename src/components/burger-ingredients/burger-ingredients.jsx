import React from 'react';
import styles from './burger-ingredients.module.css';

import { BurgerIngredientsTab } from './burger-ingredients-tab/burger-ingredients-tab';
import { BurgerIngredientsCard } from './burger-ingredients-card/burger-ingredients-card';
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../modal/modal";
import { ingredientsList } from "../services/burger-ingredients/reducers";
import { categories } from '../utils/constants';
import { showIngredientDetails } from "../services/ingredient-datails/reducer";
import { useSelector } from "react-redux";

export function BurgerIngredients() {
  const ingredients = useSelector(ingredientsList);
  const showDetails = useSelector(showIngredientDetails);

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
                  <BurgerIngredientsCard ingredient={ingredient} key={ingredient._id}/>
                )}
            </ul>
          </div>
        )}
        {showDetails &&
          <Modal title="Детали ингредиента" >
            <IngredientDetails />
          </Modal>
        }
      </div>
    </section>
  );
}
