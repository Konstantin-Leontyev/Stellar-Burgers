import React, {ChangeEvent, FormEvent, useState} from 'react';
import styles from './profile.module.css';

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileNavigation}  from '../../components/profile-navigation';
import { TUserUpdateRequest } from '../../components/utils/types';
import { getUser } from "../../components/services/auth/slice";
import { updateUserProfile } from '../../components/services/auth/actions';
import { useForm } from '../../components/utils/useForm';
import { useDispatch, useSelector } from '../../components/services/store';



export function Profile(): React.JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [isChanged, setIsChanged] = useState(false);
  const { formData, handleOnChange } = useForm<TUserUpdateRequest>({email: user?.email, name: user?.name, password: ""});

  function handleOnReset(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    formData.name = user?.name;
    formData.email = user?.email;
    formData.password = '';
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

  return (
    <div className={styles.container}>
      <ProfileNavigation />
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
