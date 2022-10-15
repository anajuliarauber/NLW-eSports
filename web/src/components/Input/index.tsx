import { Controller } from 'react-hook-form';
import { InputProps } from './types';

export function Input({ name, control, ...rest }: InputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <input
            {...rest}
            className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 border-2 ${
              error ? 'border-yellow-300 ' : 'border-zinc-900'
            }`}
            {...field}
          />
          {error && <span className="text-yellow-300">{error?.message}</span>}
        </>
      )}
    />
  );
}
