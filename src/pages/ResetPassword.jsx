import React, {useState} from 'react';
import { Link } from "react-router-dom";
import styles from "./auth.module.css";

import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

export function ResetPassword() {
  const [passwordValue, setPasswordValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPasswordValue(event.target.value)
  }

  return (
    <form className={styles.container}>
      <span className="text text_type_main-medium">Регистрация</span>
      <PasswordInput
        extraClass="mt-6"
        name="password"
        onChange={onPasswordChange}
        placeholder="Введите новый пароль"
        value={passwordValue}
      />
      <Input
        extraClass="mt-6"
        name="input"
        onChange={onInputChange}
        placeholder="Введите код из письма"
        type="text"
        value={inputValue}
      />
      <Button
        extraClass="mt-6"
        htmlType="button"
        size={"medium"}
        type="primary"
      >
        Сохранить
      </Button>
      <span className="text text_type_main-small mt-20">
        Вспомнили пароль?
        <Link className={styles.link} to={'/login'}> Войти</Link>
      </span>
    </form>
  );
}
