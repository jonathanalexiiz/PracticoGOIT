'use client';

import type { TasksListProps } from '@/types/tasks';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';

export default function TasksList({
  tasks,
  loading,
  filterStatus,
  filterPriority,
  tituloListado,
  subtituloListado,
  textoCargando,
  textoVacio,
  textoEditar,
  textoEliminar,
  textoCambioRapidoEstado,
  textoFiltroEstado,
  textoFiltroPrioridad,
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
          <h2 className="text-2xl font-bold text-gray-800">{tituloListado}</h2>
          <p className="mt-1 text-sm text-gray-500">{subtituloListado}</p>
        </div>

        <TaskFilters
          filterStatus={filterStatus}
          filterPriority={filterPriority}
          textoFiltroEstado={textoFiltroEstado}
          textoFiltroPrioridad={textoFiltroPrioridad}
          onFilterStatusChange={onFilterStatusChange}
          onFilterPriorityChange={onFilterPriorityChange}
        />
      </div>

      {loading ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
          {textoCargando}
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
          {textoVacio}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              textoEditar={textoEditar}
              textoEliminar={textoEliminar}
              textoCambioRapidoEstado={textoCambioRapidoEstado}
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