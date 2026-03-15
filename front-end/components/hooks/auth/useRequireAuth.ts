'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/components/hooks/auth/useAuth';
import useHydrated from '@/components/hooks/auth/useHydrated';

export default function useRequireAuth(redirectTo: string = '/login') {
  const router = useRouter();
  const { estaAutenticado } = useAuth();
  const hydrated = useHydrated();

  useEffect(() => {
    if (hydrated && !estaAutenticado) {
      router.replace(redirectTo);
    }
  }, [hydrated, estaAutenticado, redirectTo, router]);

  return {
    autorizado: hydrated && estaAutenticado,
  };
}