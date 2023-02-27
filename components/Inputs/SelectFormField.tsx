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
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <div>
          {label && <label  htmlFor={labelId ?? label}>{label}</label>}
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger id={labelId ?? label}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {selectOptions.map((v) => (
                <SelectItem value={v.value}>{v.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
});
