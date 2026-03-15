'use client';

import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type TextFieldProps = {
  label: string;
  error?: string;
  register: UseFormRegisterReturn;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextField({
  label,
  error,
  register,
  ...inputProps
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>

      <input
        className={`w-full rounded-xl border bg-slate-50 p-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white ${
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-slate-300 focus:border-blue-500'
        }`}
        {...register}
        {...inputProps}
      />

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}