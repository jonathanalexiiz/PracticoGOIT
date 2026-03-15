'use client';

import type { TaskPriority, TaskStatus } from '@/lib/tasksApi';
import type { TaskCardProps } from '@/types/tasks';

function getStatusStyles(status: TaskStatus) {
  if (status === 'PENDING') {
    return 'border-yellow-200 bg-yellow-100 text-yellow-800';
  }

  if (status === 'IN_PROGRESS') {
    return 'border-blue-200 bg-blue-100 text-blue-800';
  }

  return 'border-green-200 bg-green-100 text-green-800';
}

function getPriorityStyles(priority: TaskPriority) {
  if (priority === 'HIGH') {
    return 'border-red-200 bg-red-100 text-red-800';
  }

  if (priority === 'MEDIUM') {
    return 'border-orange-200 bg-orange-100 text-orange-800';
  }

  return 'border-gray-200 bg-gray-100 text-gray-800';
}

function formatStatus(status: TaskStatus) {
  if (status === 'PENDING') {
    return 'Pendiente';
  }

  if (status === 'IN_PROGRESS') {
    return 'En progreso';
  }

  return 'Completada';
}

function formatPriority(priority: TaskPriority) {
  if (priority === 'HIGH') {
    return 'Alta';
  }

  if (priority === 'MEDIUM') {
    return 'Media';
  }

  return 'Baja';
}

export default function TaskCard({
  task,
  textoEditar,
  textoEliminar,
  textoCambioRapidoEstado,
  onEdit,
  onDelete,
  onQuickStatusChange,
}: TaskCardProps) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {task.description || 'Sin descripción'}
          </p>
        </div>

        <span
          className="mt-1 inline-block h-4 w-4 rounded-full"
          style={{ backgroundColor: task.project.color }}
          title={task.project.name}
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyles(task.status)}`}
        >
          {formatStatus(task.status)}
        </span>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${getPriorityStyles(task.priority)}`}
        >
          Prioridad {formatPriority(task.priority)}
        </span>

        <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
          {task.project.name}
        </span>
      </div>

      <div className="mb-4">
        <label
          htmlFor={`quick-status-${task.id}`}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {textoCambioRapidoEstado}
        </label>

        <select
          id={`quick-status-${task.id}`}
          value={task.status}
          onChange={(e) =>
            onQuickStatusChange(task.id, e.target.value as TaskStatus)
          }
          className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white"
        >
          <option value="PENDING">Pendiente</option>
          <option value="IN_PROGRESS">En progreso</option>
          <option value="COMPLETED">Completada</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="flex-1 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black"
        >
          {textoEditar}
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
        >
          {textoEliminar}
        </button>
      </div>
    </article>
  );
}