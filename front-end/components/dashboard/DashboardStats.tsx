import type { DashboardStatsProps } from '@/types/dashboard';

export default function DashboardStats({
  totalProjects,
  totalTasks,
  pending,
  inProgress,
  completed,
}: DashboardStatsProps) {
  return (
    <section>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total proyectos</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {totalProjects}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total tareas</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">{totalTasks}</p>
        </div>

        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 shadow-sm">
          <p className="text-sm text-yellow-700">Pendientes</p>
          <p className="mt-2 text-3xl font-bold text-yellow-800">{pending}</p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <p className="text-sm text-blue-700">En progreso</p>
          <p className="mt-2 text-3xl font-bold text-blue-800">
            {inProgress}
          </p>
        </div>

        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <p className="text-sm text-green-700">Completadas</p>
          <p className="mt-2 text-3xl font-bold text-green-800">
            {completed}
          </p>
        </div>
      </div>
    </section>
  );
}