'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { registerUser } from '@/lib/authApi';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);
  const [verificandoSesion, setVerificandoSesion] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      router.replace('/dashboard');
      return;
    }

    setVerificandoSesion(false);
  }, [router]);

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);

    try {
      await registerUser(data.name, data.email, data.password);
      router.replace('/login');
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Error al registrar usuario');
      }
    }
  };

  if (verificandoSesion) {
    return null;
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800">Crear cuenta</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Nombre</label>
          <input
            type="text"
            placeholder="Tu nombre completo"
            className={`w-full rounded-xl border bg-slate-50 p-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white ${
              errors.name
                ? 'border-red-500 focus:border-red-500'
                : 'border-slate-300 focus:border-blue-500'
            }`}
            {...register('name', {
              required: 'El nombre es obligatorio',
              minLength: {
                value: 2,
                message: 'El nombre debe tener al menos 2 caracteres',
              },
            })}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

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
              placeholder="Crea una contraseña"
              className={`w-full rounded-xl border bg-slate-50 p-3 pr-12 text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                errors.password
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-slate-300 focus:border-blue-500'
              }`}
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
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

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">
            Confirmar contraseña
          </label>

          <div className="relative">
            <input
              type={mostrarConfirmPassword ? 'text' : 'password'}
              placeholder="Repite tu contraseña"
              className={`w-full rounded-xl border bg-slate-50 p-3 pr-12 text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                errors.confirmPassword
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-slate-300 focus:border-blue-500'
              }`}
              {...register('confirmPassword', {
                required: 'Debes confirmar la contraseña',
                validate: (value) =>
                  value === password || 'Las contraseñas no coinciden',
              })}
            />

            <button
              type="button"
              onClick={() =>
                setMostrarConfirmPassword(!mostrarConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
            >
              {mostrarConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.confirmPassword && (
            <span className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </span>
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
          Registrarse
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="font-semibold text-blue-600 hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}