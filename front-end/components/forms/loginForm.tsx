'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import AuthCard from '@/components/ui/AuthCard';
import PasswordField from '@/components/ui/PasswordField';
import TextField from '@/components/ui/TextField';
import useRedirectIfAuthenticated from '@/components/hooks/auth/useRedirectIfAuthenticated';
import { loginUser } from '@/lib/authApi';
import useAuth from '@/components/hooks/auth/useAuth';
import type { LoginFormData, LoginFormProps } from '@/types/auth';
import { useState } from 'react';

export default function LoginForm({
  titulo,
  textoBoton,
  textoBotonCargando,
  textoFooter,
  textoLink,
  hrefLink,
  redirectIfAuthenticated,
  redirectAfterSuccess,
}: LoginFormProps) {
  const router = useRouter();
  const { iniciarSesion } = useAuth();
  const { puedeRenderizar } = useRedirectIfAuthenticated(
    redirectIfAuthenticated,
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      iniciarSesion({
        token: response.access_token,
        usuario: response.user ?? null,
      });

      router.replace(redirectAfterSuccess);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Error al iniciar sesión');
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
          placeholder="Ingresa tu contraseña"
          error={errors.password?.message}
          register={register('password', {
            required: 'La contraseña es obligatoria',
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