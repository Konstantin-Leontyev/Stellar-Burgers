import React, { useCallback } from 'react';
import PropTypes from "prop-types";

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteCurrentBurgerIngredient } from "../../../services/burger-constructor/reducers";
import { ingredientPropTypes } from "../../../utils/constants";
import { useDispatch } from "react-redux";

BurgerConstructorElement.propTypes = {
  type: PropTypes.string,
  ingredient: ingredientPropTypes.isRequired,
};

export function BurgerConstructorElement({ ingredient, type= null }) {
  const dispatch = useDispatch();

  const { price, name, image, key } = ingredient;

  let icon = null;
  let comment = '';

  if(type === 'top') {
    comment = '(верх)';
  } else if (type === 'bottom') {
    comment = '(низ)';
  } else {
    icon = <DragIcon type="primary"/>;
  }

  const  onHandleClose = useCallback(() => {
    dispatch(deleteCurrentBurgerIngredient(key));
  }, [ingredient]);

  return (
    <>
      {icon}
      <ConstructorElement
        type={type}
        text={`${name} ${comment}`}
        price={price}
        isLocked={!!type}
        thumbnail={image}
        extraClass="ml-2"
        handleClose={onHandleClose}
      />
    </>
  );
}
