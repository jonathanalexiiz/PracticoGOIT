'use client';

import type { Tarea, TaskStatus } from '@/lib/tasksApi';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';

type TasksListProps = {
  tasks: Tarea[];
  loading: boolean;
  filterStatus: string;
  filterPriority: string;
  onFilterStatusChange: (value: string) => void;
  onFilterPriorityChange: (value: string) => void;
  onEdit: (task: Tarea) => void;
  onDelete: (taskId: string) => void;
  onQuickStatusChange: (taskId: string, newStatus: TaskStatus) => void;
};

export default function TasksList({
  tasks,
  loading,
  filterStatus,
  filterPriority,
  onFilterStatusChange,
  onFilterPriorityChange,
  onEdit,
  onDelete,
  onQuickStatusChange,
}: TasksListProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mis tareas</h2>
          <p className="mt-1 text-sm text-gray-500">
            Filtra y administra tus tareas por estado y prioridad.
          </p>
        </div>

        <TaskFilters
          filterStatus={filterStatus}
          filterPriority={filterPriority}
          onFilterStatusChange={onFilterStatusChange}
          onFilterPriorityChange={onFilterPriorityChange}
        />
      </div>

      {loading ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
          Cargando tareas...
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
          No hay tareas para mostrar.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onQuickStatusChange={onQuickStatusChange}
            />
          ))}
        </div>
      )}
    </section>
  );
}