import React, {useState} from 'react';
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./auth.module.css";

export function ForgotPassword() {
  const [emailValue, setEmailValue] = useState('');

  const onEmailChange = (event) => {
    setEmailValue(event.target.value)
  }

  return (
    <form className={styles.container}>
      <span className="text text_type_main-medium">Вход</span>
      <EmailInput
        extraClass="mt-6"
        name="email"
        onChange={onEmailChange}
        placeholder="Укажите e-mail"
        value={emailValue}
      />
      <Button
        extraClass="mt-6"
        htmlType="button"
        size={"medium"}
        type="primary"
      >
        Войти
      </Button>
      <span className="text text_type_main-small mt-20">
        Вспомнили пароль?
        <Link className={styles.link} to={'/login'}> Войти</Link>
      </span>
    </form>
  );
}
