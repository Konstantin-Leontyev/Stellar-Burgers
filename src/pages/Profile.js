import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.css';

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser } from '../components/services/auth/reducers';
import { updateUserProfile } from '../components/services/auth/actions';
import { useForm } from '../components/utils/useForm';

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const [isChanged, setIsChanged] = useState(false);
  const { formData, handleOnChange } = useForm({ name: user?.name ?? "", email: user?.email ?? "" });

  function handleOnReset(event) {
    event.preventDefault();

    formData.name = user?.name ?? "";
    formData.email = user?.email ?? "";
    setIsChanged(false);
  }

  function handleOnFormChange(event) {
    event.preventDefault();

    setIsChanged(true);
  }

  function handleOnSubmit(event) {
    event.preventDefault();

    dispatch(updateUserProfile(formData));
  }

  const handleOnLogoutClick = (event) => {
    event.preventDefault();
    navigate('/logout');
  }

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
            <button className={`${styles.logout_button} text text_type_main-medium`} onClick={handleOnLogoutClick}>Выход</button>
          </li>
        </ul>
        <span className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      <form className="ml-25" onChange={handleOnFormChange} onSubmit={handleOnSubmit} onReset={handleOnReset}>
        <Input
          name="name"
          icon="EditIcon"
          onChange={handleOnChange}
          placeholder="Имя"
          type="text"
          value={formData.name}
        />
        <EmailInput
          extraClass="mt-6"
          icon="EditIcon"
          name="email"
          onChange={handleOnChange}
          placeholder="Логин"
          value={formData.email}
        />
        <PasswordInput
          extraClass="mt-6"
          icon="EditIcon"
          name="password"
          onChange={handleOnChange}
          placeholder="Пароль"
          value={formData.password ?? ""}
        />
        { isChanged &&
        <div className={`${styles.buttons}`}>
          <Button
            className={styles.reset_button}
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
        }
      </form>
    </div>
  );
}
