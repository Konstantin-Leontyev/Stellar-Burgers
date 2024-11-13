import React from 'react';
import styles from './number-block.module.css'

type TNumberBlockProps = {
  title: string;
  numbers: number[];
  colored?: boolean;
}

export function NumberBlock({ title, numbers, colored }: TNumberBlockProps): React.JSX.Element {
  return (
    <div className={styles.container}>
      <span className={`${styles.span} text text_type_main-medium pb-6`}>{title}</span>
      <div className={`${styles.block} pb-15`}>
        <ul className={styles.ul}>
          {
            numbers.map(number =>
              <li className={`${styles.li} pb-2`} key={number}>
                <span className={`text text_type_digits-default ${(colored ? styles.colored : '')}`}>{number}</span>
              </li>)
          }
        </ul>
      </div>
    </div>
  )
}