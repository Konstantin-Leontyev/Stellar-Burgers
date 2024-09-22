import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './auth.module.css';

import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser } from "../components/services/auth/reducers";
import { login } from "../components/services/auth/actions";
import { useDispatch, useSelector } from "react-redux";


export function Login() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onEmailChange = (event) => {
    setEmailValue(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPasswordValue(event.target.value)
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const formData = {
      email: emailValue,
      password: passwordValue,
    }
    dispatch(login(formData));
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <form className={styles.container} onSubmit={handleOnSubmit}>
      <span className="text text_type_main-medium">Вход</span>
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
        htmlType="submit"
        size={"medium"}
        type="primary"
      >
        Войти
      </Button>
      <span className="text text_type_main-small mt-20">
        Вы - новый пользователь?
        <Link className={styles.link} to={'/register'}> Зарегистрироваться</Link>
      </span>
      <span className="text text_type_main-small mt-4">
        Забыли пароль?
        <Link className={styles.link} to={'/forgot-password'}> Восстановить пароль</Link>
      </span>
    </form>
  );
}
