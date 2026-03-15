'use client';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/SideBar';
import Footer from '@/components/layout/Footer';
import useRequireAuth from '@/components/hooks/auth/useRequireAuth';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { autorizado } = useRequireAuth('/login');

  if (!autorizado) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="min-h-125 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}