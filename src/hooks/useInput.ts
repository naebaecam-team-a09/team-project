import { useState } from 'react';

export const useInputs = <T>(initialValue: T) => {
  const [inputs, setInputs] = useState<T>(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const reset = () => {
    setInputs(initialValue);
  };
  return [inputs, onChange, reset] as const;
};
