import React, {useState} from 'react';
import { Link } from "react-router-dom";
import styles from "./auth.module.css";

import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

export function Register() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const onEmailChange = (event) => {
    setEmailValue(event.target.value)
  }

  const onInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPasswordValue(event.target.value)
  }

  return (
    <form className={styles.container}>
      <span className="text text_type_main-medium">Регистрация</span>
      <Input
        extraClass="mt-6"
        name="input"
        onChange={onInputChange}
        placeholder="Имя"
        type="text"
        value={inputValue}
      />
      <EmailInput
        extraClass="mt-6"
        name="email"
        onChange={onEmailChange}
        placeholder="E-mail"
        value={emailValue}
      />
      <PasswordInput
        extraClass="mt-6"
        name="password"
        onChange={onPasswordChange}
        value={passwordValue}
      />
      <Button
        extraClass="mt-6"
        htmlType="button"
        size={"medium"}
        type="primary"
      >
        Зарегистрироваться
      </Button>
      <span className="text text_type_main-small mt-20">
        Уже зарегистрированы?
        <Link className={styles.link} to={'/login'}> Войти</Link>
      </span>
    </form>
  );
}
