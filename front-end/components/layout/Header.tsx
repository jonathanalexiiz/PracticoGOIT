/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Usuario = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function Header() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const userGuardado = localStorage.getItem('user');

    if (userGuardado) {
      setUsuario(JSON.parse(userGuardado));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.replace('/login');
  };

  const inicial = usuario?.name
    ? usuario.name.charAt(0).toUpperCase()
    : usuario?.email.charAt(0).toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">

      {/* Logo / nombre app */}
      <h1 className="text-lg font-semibold text-gray-800">
        Mi App
      </h1>

      {/* Usuario */}
      <div className="flex items-center gap-4">

        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            {inicial}
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-gray-800">
              {usuario?.name || 'Usuario'}
            </span>

            <span className="text-xs text-gray-500">
              {usuario?.email}
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Cerrar sesión
        </button>

      </div>

    </header>
  );
}