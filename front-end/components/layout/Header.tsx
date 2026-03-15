'use client';

import { useRouter } from 'next/navigation';
import useAuth from '@/components/hooks/auth/useAuth';

export default function Header() {
  const router = useRouter();
  const { usuario, cerrarSesion } = useAuth();

  const handleLogout = () => {
    cerrarSesion();
    router.replace('/login');
  };

  const inicial = usuario?.name
    ? usuario.name.charAt(0).toUpperCase()
    : usuario?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-lg font-semibold text-gray-800">Mi App</h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            {inicial}
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-gray-800">
              {usuario?.name || 'Usuario'}
            </span>

            <span className="text-xs text-gray-500">
              {usuario?.email || 'Sin correo'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}