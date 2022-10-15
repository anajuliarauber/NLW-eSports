import { Controller } from 'react-hook-form';
import { InputProps } from './types';

export function Input({ name, control, ...rest }: InputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
        <input
          {...rest}
          className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
          {...field}
        />
      )}
    />
  );
}
