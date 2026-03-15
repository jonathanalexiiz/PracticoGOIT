'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/components/hooks/auth/useAuth';

export default function useRedirectIfAuthenticated(
  redirectTo: string = '/dashboard',
) {
  const router = useRouter();
  const { estaAutenticado } = useAuth();

  useEffect(() => {
    if (estaAutenticado) {
      router.replace(redirectTo);
    }
  }, [estaAutenticado, redirectTo, router]);

  return {
    puedeRenderizar: !estaAutenticado,
  };
}