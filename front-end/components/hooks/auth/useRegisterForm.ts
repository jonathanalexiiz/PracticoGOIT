'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/authApi';
import type { RegisterFormData } from '@/types/auth';

type UseRegisterFormParams = {
  redirectAfterSuccess: string;
  textoErrorDefault?: string;
};

export default function useRegisterForm({
  redirectAfterSuccess,
  textoErrorDefault = 'Error al registrar usuario',
}: UseRegisterFormParams) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const registrarUsuario = async (data: RegisterFormData) => {
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
    registrarUsuario,
    limpiarErrorServidor,
  };
}