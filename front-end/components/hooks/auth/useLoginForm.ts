'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/authApi';
import { guardarUsuario } from '@/lib/authStorage';
import type { LoginFormData } from '@/types/auth';

type UseLoginFormParams = {
  redirectAfterSuccess: string;
  textoErrorDefault?: string;
};

export default function useLoginForm({
  redirectAfterSuccess,
  textoErrorDefault = 'Error al iniciar sesión',
}: UseLoginFormParams) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const iniciarSesion = async (data: LoginFormData) => {
    setServerError(null);

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (response.user) {
        guardarUsuario(response.user);
      }

      router.replace(redirectAfterSuccess);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError(textoErrorDefault);
      }

      throw error;
    }
  };

  const limpiarErrorServidor = () => {
    setServerError(null);
  };

  return {
    serverError,
    iniciarSesion,
    limpiarErrorServidor,
  };
}