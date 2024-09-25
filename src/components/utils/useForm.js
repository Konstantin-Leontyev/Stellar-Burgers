import { useState } from 'react';

export function useForm(initialState) {
  const [formData, setFormData] = useState(initialState);

  function handleOnChange(event) {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value}
    );
  }

  return { formData, handleOnChange };
}
