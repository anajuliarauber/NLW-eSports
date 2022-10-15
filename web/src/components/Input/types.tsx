import { InputHTMLAttributes } from 'react';
import { Control } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any, any>;
}
