import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { memo } from 'react';
import { DatePicker, DatePickerProps } from './DatePicker';
import { PropsWithClass } from '@/lib/types';

export interface DatePickerFormFieldProps {
  name: string;
  options?: RegisterOptions;
}
export const DatePickerFormField: React.FC<
  PropsWithClass<
    Omit<DatePickerProps, 'onChange' | 'value'> & DatePickerFormFieldProps
  >
> = memo(({ name, options = {}, ...props }) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref, onBlur } }) => (
        <DatePicker
          showError={errors?.[name]?.message ? true : false}
          errorMessage={errors?.[name]?.message?.toString()}
          {...props}
           onChange={(value) => {
            onChange(value);
            trigger(name);
          }}
          onBlur={onBlur}
          value={value}
          ref={ref}
        />
      )}
    />
  );
});
