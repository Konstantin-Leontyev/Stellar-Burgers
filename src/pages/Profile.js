import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import styles from './profile.module.css';

import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser } from "../components/services/auth/reducers";
import { useSelector } from "react-redux";

export function Profile() {
  const user = useSelector(getUser);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nameValue, setNameValue] = useState('');

  const onEmailChange = (event) => {
    setEmailValue(event.target.value)
  }

  const onNameChange = (event) => {
    setNameValue(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPasswordValue(event.target.value)
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    }
    // dispatch(profileUpdate(formData));
  }

  const handleOnReset = (event) => {
    event.preventDefault();

    // dispatch(profileUpdate(formData));
  }

  useEffect(() => {
    console.log(user)
    // setNameValue(user.name)
    // setEmailValue(user.email)
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link className={`${styles.link} text text_type_main-medium`} to="/profile">Профиль</Link>
          </li>
          <li className={styles.li}>
            <Link className={`${styles.link} text text_type_main-medium`} to="/feed">История заказов</Link>
          </li>
          <li className={styles.li}>
            <Link className={`${styles.link} text text_type_main-medium`} to="/logout">Выход</Link>
          </li>
        </ul>
        <span className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      <form className="ml-25" onSubmit={handleOnSubmit} onReset={handleOnReset}>
        <Input
          name="name"
          icon="EditIcon"
          onChange={onNameChange}
          placeholder="Имя"
          type="text"
          value={nameValue}
        />
        <EmailInput
          extraClass="mt-6"
          icon="EditIcon"
          name="email"
          onChange={onEmailChange}
          placeholder="Логин"
          value={emailValue}
        />
        <PasswordInput
          extraClass="mt-6"
          icon="EditIcon"
          name="password"
          onChange={onPasswordChange}
          placeholder="Пароль"
          value={passwordValue}
        />
        <div className={`${styles.buttons} mt-6`}>
          <Button
            className={styles.abort_button}
            htmlType="reset"
            size={"medium"}
          >
            Отмена
          </Button>
          <Button
            extraClass="mt-6 ml-6"
            htmlType="submit"
            size={"medium"}
            type="primary"
          >
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}
