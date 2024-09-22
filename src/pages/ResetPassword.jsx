import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";

import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../components/utils/api";

export function ResetPassword() {
  const navigate = useNavigate();
  const [passwordValue, setPasswordValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPasswordValue(event.target.value);
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    let formData = {
      password: passwordValue,
      token: inputValue
    };

    resetPassword(formData)
      .then((response) => {
        if (response.success) {
          localStorage.removeItem('forgotPassword');
          navigate('/')
        }
    })
  }

  useEffect(() => {
    if (!localStorage.getItem('forgotPassword')) {
      navigate('/forgot-password');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <form className={styles.container} onSubmit={handleOnSubmit}>
      <span className="text text_type_main-medium">Восстановление пароля</span>
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
        htmlType="submit"
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
