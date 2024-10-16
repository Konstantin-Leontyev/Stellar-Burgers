import React, { useState } from 'react';

type TFormData = {
  [key: string]: string;
};

type TUseForm = {
  formData: TFormData;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

export function useForm(initialState: TFormData): TUseForm {
  const [formData, setFormData] = useState(initialState);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value}
    );
  }

  return { formData, handleOnChange };
}
