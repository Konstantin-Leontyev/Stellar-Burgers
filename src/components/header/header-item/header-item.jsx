import React from 'react';

export default function HeaderItem({ item }) {
  const { title, Icon, isActive } = item;

  return (
    <>
      <Icon type={isActive ? "primary" : "secondary"} />
      <span className={`text text_type_main-default ml-2 ${!isActive ? "text_color_inactive" : ""}`}>
        {title}
      </span>
    </>
  )
}
