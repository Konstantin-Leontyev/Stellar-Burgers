import React from 'react';

import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerConstructorElement({type, price, text, thumbnail}) {

  let icon = null
  let comment = ''

  if(type === 'top') {
    comment = '(верх)'
  } else if (type === 'bottom') {
    comment = '(низ)'
  } else {
    icon = <DragIcon type="primary"/>
  }

  return (
    <>
      {icon}
      <ConstructorElement
        type={type}
        text={`${text} ${comment}`}
        price={price}
        thumbnail={thumbnail}
        extraClass="ml-2"
      />
    </>
  )
}