/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { loginUser } from '@/lib/authApi';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [verificandoSesion, setVerificandoSesion] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      router.replace('/dashboard');
      return;
    }

    setVerificandoSesion(false);
  }, [router]);

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    try {
      const res = await loginUser(data.email, data.password);

      if (res?.access_token) {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        router.replace('/dashboard');
      }
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Error al iniciar sesión');
      }
    }
  };

  if (verificandoSesion) {
    return null;
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800">Iniciar sesión</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Correo</label>
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            className={`w-full rounded-xl border bg-slate-50 p-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white ${
              errors.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-slate-300 focus:border-blue-500'
            }`}
            {...register('email', {
              required: 'El correo es obligatorio',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: 'Correo no válido',
              },
            })}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Contraseña</label>

          <div className="relative">
            <input
              type={mostrarPassword ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña"
              className={`w-full rounded-xl border bg-slate-50 p-3 pr-12 text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                errors.password
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-slate-300 focus:border-blue-500'
              }`}
              {...register('password', {
                required: 'La contraseña es obligatoria',
              })}
            />

            <button
              type="button"
              onClick={() => setMostrarPassword(!mostrarPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
            >
              {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.password && (
            <span className="text-sm text-red-500">{errors.password.message}</span>
          )}
        </div>

        {serverError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {serverError}
          </div>
        )}

        <button
          type="submit"
          className="mt-2 rounded-xl bg-blue-600 p-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
        >
          Iniciar sesión
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="font-semibold text-blue-600 hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}