import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { memo } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectInputProps,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './Select';
import { PropsWithClass } from '@/lib/types';
import { ErrorMessage } from './ErrorMessage';

export interface SelectFormFieldProps {
  name: string;
  options?: RegisterOptions;
}

export const SelectFormField: React.FC<
  PropsWithClass<
    Omit<SelectInputProps, 'onSelectChange'> & SelectFormFieldProps
  >
> = memo(({ name, options = {}, selectOptions, label, labelId, ...props }) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <div>
          {label && <label htmlFor={labelId ?? label}>{label}</label>}
          <Select
            value={value}
            onValueChange={(value) => {
              onChange(value);
              trigger(name);
            }}
            onOpenChange={onBlur}
          >
            <SelectTrigger id={labelId ?? label}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {selectOptions.map((v) => (
                <SelectItem key={v.value} value={v.value}>
                  {v.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ErrorMessage
            showError={errors?.[name]?.message ? true : false}
            message={errors?.[name]?.message?.toString()}
          />
        </div>
      )}
    />
  );
});
