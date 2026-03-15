'use client';

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  limpiarSesion,
  guardarAccessToken,
  guardarUsuario,
  obtenerAccessToken,
  obtenerUsuario,
} from '@/lib/authStorage';

type Usuario = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

export type AuthContextValue = {
  token: string | null;
  usuario: Usuario | null;
  estaAutenticado: boolean;
  iniciarSesion: (params: { token: string; usuario: Usuario | null }) => void;
  cerrarSesion: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => obtenerAccessToken());
  const [usuario, setUsuario] = useState<Usuario | null>(() =>
    obtenerUsuario<Usuario>(),
  );

  const iniciarSesion = useCallback(
    ({ token, usuario }: { token: string; usuario: Usuario | null }) => {
      guardarAccessToken(token);
      setToken(token);

      if (usuario) {
        guardarUsuario(usuario);
        setUsuario(usuario);
        return;
      }

      setUsuario(null);
    },
    [],
  );

  const cerrarSesion = useCallback(() => {
    limpiarSesion();
    setToken(null);
    setUsuario(null);
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      token,
      usuario,
      estaAutenticado: Boolean(token),
      iniciarSesion,
      cerrarSesion,
    };
  }, [token, usuario, iniciarSesion, cerrarSesion]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}