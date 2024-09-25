import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './pages.module.css';

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser } from '../components/services/auth/reducers';
import { login } from '../components/services/auth/actions';
import { useForm } from '../components/utils/useForm';

export function Login() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const { formData, handleOnChange } = useForm({});

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(login(formData));
  }

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <form className={styles.container} onSubmit={handleOnSubmit}>
      <span className="text text_type_main-medium">Вход</span>
      <EmailInput
        extraClass="mt-6"
        name="email"
        onChange={handleOnChange}
        placeholder="E-mail"
        value={formData.email ?? ""}
      />
      <PasswordInput
        extraClass="mt-6"
        name="password"
        onChange={handleOnChange}
        value={formData.password ?? ""}
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
