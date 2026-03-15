import type { LatestTaskCardProps } from '@/types/dashboard';
import type { DashboardLatestTask } from '@/lib/dashboardApi';

function formatStatus(status: DashboardLatestTask['status']) {
  if (status === 'PENDING') {
    return 'Pendiente';
  }

  if (status === 'IN_PROGRESS') {
    return 'En progreso';
  }

  return 'Completada';
}

function getStatusStyles(status: DashboardLatestTask['status']) {
  if (status === 'PENDING') {
    return 'border-yellow-200 bg-yellow-100 text-yellow-800';
  }

  if (status === 'IN_PROGRESS') {
    return 'border-blue-200 bg-blue-100 text-blue-800';
  }

  return 'border-green-200 bg-green-100 text-green-800';
}

export default function LatestTaskCard({ task }: LatestTaskCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-800">{task.title}</h3>
          <p className="text-sm text-gray-500">
            {task.description || 'Sin descripción'}
          </p>
        </div>

        <span
          className="mt-1 inline-block h-4 w-4 rounded-full"
          style={{ backgroundColor: task.project.color }}
          title={task.project.name}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyles(task.status)}`}
        >
          {formatStatus(task.status)}
        </span>

        <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700">
          {task.project.name}
        </span>
      </div>
    </article>
  );
}