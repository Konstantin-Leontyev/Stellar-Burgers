import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./auth.module.css";

import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser } from "../components/services/auth/reducers";
import { register } from "../components/services/auth/actions";


export function Register() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const navigate = useNavigate();
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

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name: inputValue,
      email: emailValue,
      password: passwordValue,
    }
    dispatch(register(formData));
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <form className={styles.container} onSubmit={handleOnSubmit}>
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
        htmlType="submit"
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
