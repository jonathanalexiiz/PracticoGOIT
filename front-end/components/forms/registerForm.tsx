'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AuthCard from '@/components/ui/AuthCard';
import PasswordField from '@/components/ui/PasswordField';
import TextField from '@/components/ui/TextField';
import useRedirectIfAuthenticated from '@/components/hooks/auth/useRedirectIfAuthenticated';
import { registerUser } from '@/lib/authApi';
import type { RegisterFormData, RegisterFormProps } from '@/types/auth';
import { useRouter } from 'next/navigation';

export default function RegisterForm({
  titulo,
  textoBoton,
  textoBotonCargando,
  textoFooter,
  textoLink,
  hrefLink,
  redirectIfAuthenticated,
  redirectAfterSuccess,
}: RegisterFormProps) {
  const router = useRouter();
  const { puedeRenderizar } = useRedirectIfAuthenticated(
    redirectIfAuthenticated,
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);

    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      router.replace(redirectAfterSuccess);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Error al registrar usuario');
      }
    }
  };

  if (!puedeRenderizar) {
    return null;
  }

  return (
    <AuthCard titulo={titulo}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <TextField
          label="Nombre"
          type="text"
          placeholder="Tu nombre completo"
          error={errors.name?.message}
          register={register('name', {
            required: 'El nombre es obligatorio',
            minLength: {
              value: 2,
              message: 'El nombre debe tener al menos 2 caracteres',
            },
          })}
        />

        <TextField
          label="Correo"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          error={errors.email?.message}
          register={register('email', {
            required: 'El correo es obligatorio',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: 'Correo no válido',
            },
          })}
        />

        <PasswordField
          label="Contraseña"
          placeholder="Crea una contraseña"
          error={errors.password?.message}
          register={register('password', {
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          })}
        />

        <PasswordField
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          error={errors.confirmPassword?.message}
          register={register('confirmPassword', {
            required: 'Debes confirmar la contraseña',
            validate: (value) =>
              value === password || 'Las contraseñas no coinciden',
          })}
        />

        {serverError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-xl bg-blue-600 p-3 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? textoBotonCargando : textoBoton}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        {textoFooter}{' '}
        <Link
          href={hrefLink}
          className="font-semibold text-blue-600 hover:underline"
        >
          {textoLink}
        </Link>
      </p>
    </AuthCard>
  );
}