import { limpiarSesion } from '@/lib/authStorage';

type CerrarSesionOptions = {
  redirectTo?: string;
};

export function cerrarSesion(options?: CerrarSesionOptions) {
  limpiarSesion();

  const redirectTo = options?.redirectTo ?? '/login';

  if (typeof window !== 'undefined') {
    window.location.href = redirectTo;
  }
}