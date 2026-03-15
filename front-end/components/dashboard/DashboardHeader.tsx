import type { DashboardHeaderProps } from '@/types/dashboard';

export default function DashboardHeader({
  titulo,
  subtitulo,
}: DashboardHeaderProps) {
  return (
    <section>
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{titulo}</h1>
        <p className="mt-1 text-sm text-gray-500">{subtitulo}</p>
      </div>
    </section>
  );
}