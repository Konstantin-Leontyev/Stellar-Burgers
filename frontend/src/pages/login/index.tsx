import React, {FormEvent} from 'react';
import { Link } from 'react-router-dom';
import styles from '../pages.module.css';

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { TLoginRequest } from "../../components/utils/types";
import { login } from '../../components/services/auth/actions';
import { useForm } from '../../components/utils/useForm';
import { useDispatch } from "../../components/services/store";

export function Login(): React.JSX.Element {
  const dispatch = useDispatch();
  const { formData, handleOnChange } = useForm<TLoginRequest>({} as TLoginRequest);

  function handleOnSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(login(formData));
  }

  return (
    <form className={styles.container} onSubmit={handleOnSubmit}>
      <span className="text text_type_main-medium">Вход</span>
      <EmailInput
        data-testid='email_input'
        extraClass="mt-6"
        name="email"
        onChange={handleOnChange}
        placeholder="E-mail"
        value={formData.email ?? ""}
      />
      <PasswordInput
        data-testid='password_input'
        extraClass="mt-6"
        name="password"
        onChange={handleOnChange}
        value={formData.password ?? ""}
      />
      <Button
        data-testid='login_button'
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
