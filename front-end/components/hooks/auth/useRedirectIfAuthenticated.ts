'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/components/hooks/auth/useAuth';
import useHydrated from '@/components/hooks/auth/useHydrated';

export default function useRedirectIfAuthenticated(
  redirectTo: string = '/dashboard',
) {
  const router = useRouter();
  const { estaAutenticado } = useAuth();
  const hydrated = useHydrated();

  useEffect(() => {
    if (hydrated && estaAutenticado) {
      router.replace(redirectTo);
    }
  }, [hydrated, estaAutenticado, redirectTo, router]);

  return {
    puedeRenderizar: hydrated && !estaAutenticado,
  };
}