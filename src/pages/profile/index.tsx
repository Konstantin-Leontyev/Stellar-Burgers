import React, {ChangeEvent, FormEvent, useState} from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { TUserUpdateData } from "../../components/utils/types";
import { getUser } from "../../components/services/auth/slice";
import { updateUserProfile } from '../../components/services/auth/actions';
import { useForm } from '../../components/utils/useForm';
import { useDispatch, useSelector } from "../../components/services/store";

export function Profile(): React.JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector(getUser)
  const [isChanged, setIsChanged] = useState(false);
  const { formData, handleOnChange } = useForm<TUserUpdateData>({email: user?.email, name: user?.name, password: ""});

  function handleOnReset(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    formData.name = user?.name;
    formData.email = user?.email;
    formData.password = "";
    setIsChanged(false);
  }

  function handleOnFormChange(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsChanged(true);
  }

  function handleOnSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(updateUserProfile(formData))
    setIsChanged(false);
  }

  const active = `${styles.active} text text_type_main-medium`
  const inactive = `${styles.inactive} text text_type_main-medium text_color_inactive`

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <NavLink
              className={({isActive}) => isActive ? active : inactive}
              to="/profile">Профиль
            </NavLink>
          </li>
          <li className={styles.li}>
            <NavLink
              className={({isActive}) => isActive ? active : inactive}
              to="/feed">История заказов
            </NavLink>
          </li>
          <li className={styles.li}>
            <NavLink
              className={({isActive}) => isActive ? active : inactive}
              to="/logout">Выход
            </NavLink>
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
          value={formData.name ?? ''}
        />
        <EmailInput
          extraClass="mt-6"
          isIcon={true}
          name="email"
          onChange={handleOnChange}
          placeholder="Логин"
          value={formData.email ?? ''}
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
