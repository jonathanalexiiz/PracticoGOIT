'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/components/hooks/auth/useAuth';

export default function useRequireAuth(redirectTo: string = '/login') {
  const router = useRouter();
  const { estaAutenticado } = useAuth();

  useEffect(() => {
    if (!estaAutenticado) {
      router.replace(redirectTo);
    }
  }, [estaAutenticado, redirectTo, router]);

  return {
    autorizado: estaAutenticado,
  };
}