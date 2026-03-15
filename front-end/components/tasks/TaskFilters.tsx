'use client';

import type { TaskFiltersProps } from '@/types/tasks';
import type { TaskPriority, TaskStatus } from '@/lib/tasksApi';

export default function TaskFilters({
  filterStatus,
  filterPriority,
  textoFiltroEstado,
  textoFiltroPrioridad,
  onFilterStatusChange,
  onFilterPriorityChange,
}: TaskFiltersProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="filter-status" className="text-sm font-medium text-gray-700">
          {textoFiltroEstado}
        </label>
        <select
          id="filter-status"
          value={filterStatus}
          onChange={(e) => onFilterStatusChange(e.target.value as TaskStatus | '')}
          className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white"
        >
          <option value="">Todos</option>
          <option value="PENDING">Pendiente</option>
          <option value="IN_PROGRESS">En progreso</option>
          <option value="COMPLETED">Completada</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="filter-priority"
          className="text-sm font-medium text-gray-700"
        >
          {textoFiltroPrioridad}
        </label>
        <select
          id="filter-priority"
          value={filterPriority}
          onChange={(e) =>
            onFilterPriorityChange(e.target.value as TaskPriority | '')
          }
          className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white"
        >
          <option value="">Todas</option>
          <option value="LOW">Baja</option>
          <option value="MEDIUM">Media</option>
          <option value="HIGH">Alta</option>
        </select>
      </div>
    </div>
  );
}