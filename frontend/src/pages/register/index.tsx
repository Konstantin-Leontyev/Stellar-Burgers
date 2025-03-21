import React, {FormEvent} from 'react';
import { Link } from 'react-router-dom';
import styles from '../pages.module.css';

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { TRegistrationRequest } from "../../components/utils/types";
import { register } from '../../components/services/auth/actions';
import { useForm } from '../../components/utils/useForm';
import { useDispatch } from "../../components/services/store";

export function Register(): React.JSX.Element {
  const dispatch = useDispatch();
  const { formData, handleOnChange } = useForm<TRegistrationRequest>({} as TRegistrationRequest);

  function handleOnSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(register(formData));
  }

  return (
    <form className={styles.container} onSubmit={handleOnSubmit}>
      <span className="text text_type_main-medium">Регистрация</span>
      <Input
        extraClass="mt-6"
        name="name"
        onChange={handleOnChange}
        placeholder="Имя"
        type="text"
        value={formData.name ?? ""}
      />
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
        Зарегистрироваться
      </Button>
      <span className="text text_type_main-small mt-20">
        Уже зарегистрированы?
        <Link className={styles.link} to={'/login'}> Войти</Link>
      </span>
    </form>
  );
}
