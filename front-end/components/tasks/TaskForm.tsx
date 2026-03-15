'use client';

import type React from 'react';
import type { Proyecto } from '@/lib/projectsApi';
import type { TaskPriority, TaskStatus } from '@/lib/tasksApi';

type FormData = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
};

type TaskFormProps = {
  tituloFormulario: string;
  error: string | null;
  form: FormData;
  projects: Proyecto[];
  loadingProjects: boolean;
  saving: boolean;
  editingId: string | null;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function TaskForm({
  tituloFormulario,
  error,
  form,
  projects,
  loadingProjects,
  saving,
  editingId,
  onChange,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-800">{tituloFormulario}</h2>
        <p className="mt-1 text-sm text-gray-500">
          Crea, edita y organiza tus tareas por proyecto.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Título</label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Título de la tarea"
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Proyecto</label>
          <select
            name="projectId"
            value={form.projectId}
            onChange={onChange}
            disabled={loadingProjects || projects.length === 0}
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {projects.length === 0 ? (
              <option value="">No hay proyectos disponibles</option>
            ) : (
              projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Descripción de la tarea"
            rows={4}
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Estado</label>
          <select
            name="status"
            value={form.status}
            onChange={onChange}
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white"
          >
            <option value="PENDING">Pendiente</option>
            <option value="IN_PROGRESS">En progreso</option>
            <option value="COMPLETED">Completada</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Prioridad</label>
          <select
            name="priority"
            value={form.priority}
            onChange={onChange}
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white"
          >
            <option value="LOW">Baja</option>
            <option value="MEDIUM">Media</option>
            <option value="HIGH">Alta</option>
          </select>
        </div>

        <div className="md:col-span-2 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving || loadingProjects || projects.length === 0}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving
              ? 'Guardando...'
              : editingId
                ? 'Actualizar tarea'
                : 'Crear tarea'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl bg-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-300"
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>
    </section>
  );
}