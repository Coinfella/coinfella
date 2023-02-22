import { Input, InputProps } from './Input';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { memo } from 'react';
import { PropsWithClass } from '@/lib/types';

export interface InputFormFieldProps {
  name: string;
  options?: RegisterOptions;
}
export const InputFormField: React.FC<
  PropsWithClass<InputProps & InputFormFieldProps>
> = memo(({ name, options = {}, ...props }) => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      showError={errors?.[name]?.message ? true : false}
      errorMessage={errors?.[name]?.message?.toString()}
      {...register(name, options)}
      {...props}
    ></Input>
  );
});
