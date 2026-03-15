'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getProjects, type Proyecto } from '@/lib/projectsApi';
import {
  createTask,
  deleteTask,
  getTasks,
  quickUpdateTaskStatus,
  updateTask,
  type Tarea,
  type TaskPriority,
  type TaskStatus,
} from '@/lib/tasksApi';
import type { TaskFormData, TasksManagerProps } from '@/types/tasks';
import TaskForm from './TaskForm';
import TasksList from './TasksList';

const initialForm: TaskFormData = {
  title: '',
  description: '',
  status: 'PENDING',
  priority: 'MEDIUM',
  projectId: '',
};

export default function TasksManager({
  tituloFormularioNuevo,
  tituloFormularioEditar,
  subtituloFormulario,
  tituloListado,
  subtituloListado,
  textoCargando,
  textoVacio,
  textoCrear,
  textoActualizar,
  textoGuardando,
  textoCancelar,
  textoEditar,
  textoEliminar,
  textoCambioRapidoEstado,
  textoFiltroEstado,
  textoFiltroPrioridad,
  textoErrorCargarProyectos,
  textoErrorCargarTareas,
  textoErrorGuardar,
  textoErrorEliminar,
  textoErrorActualizarEstado,
  textoErrorTituloObligatorio,
  textoErrorProyectoObligatorio,
  textoConfirmacionEliminar,
  textoProyectoSinDisponibles,
  textoSeleccionarProyecto,
}: TasksManagerProps) {
  const [tasks, setTasks] = useState<Tarea[]>([]);
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TaskFormData>(initialForm);
  const [filterStatus, setFilterStatus] = useState<TaskStatus | ''>('');
  const [filterPriority, setFilterPriority] = useState<TaskPriority | ''>('');

  const tituloFormulario = useMemo(() => {
    return editingId ? tituloFormularioEditar : tituloFormularioNuevo;
  }, [editingId, tituloFormularioEditar, tituloFormularioNuevo]);

  const cargarProyectos = useCallback(async () => {
    try {
      setLoadingProjects(true);
      setError(null);

      const data = await getProjects();
      setProjects(data);

      setForm((prev) => ({
        ...prev,
        projectId:
          prev.projectId && data.some((project) => project.id === prev.projectId)
            ? prev.projectId
            : data.length > 0
              ? data[0].id
              : '',
      }));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(textoErrorCargarProyectos);
      }
    } finally {
      setLoadingProjects(false);
    }
  }, [textoErrorCargarProyectos]);

  const cargarTareas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getTasks({
        status: filterStatus || undefined,
        priority: filterPriority || undefined,
      });

      setTasks(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(textoErrorCargarTareas);
      }
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterPriority, textoErrorCargarTareas]);

  useEffect(() => {
    Promise.all([cargarProyectos(), cargarTareas()]);
  }, [cargarProyectos, cargarTareas]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setError(null);
    setForm({
      ...initialForm,
      projectId: projects.length > 0 ? projects[0].id : '',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError(textoErrorTituloObligatorio);
      return;
    }

    if (!form.projectId) {
      setError(textoErrorProyectoObligatorio);
      return;
    }

    try {
      setSaving(true);
      setError(null);

      if (editingId) {
        await updateTask(editingId, {
          title: form.title,
          description: form.description,
          status: form.status,
          priority: form.priority,
          projectId: form.projectId,
        });
      } else {
        await createTask({
          title: form.title,
          description: form.description,
          status: form.status,
          priority: form.priority,
          projectId: form.projectId,
        });
      }

      resetForm();
      await cargarTareas();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(textoErrorGuardar);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (task: Tarea) => {
    setError(null);
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      projectId: task.projectId,
    });
  };

  const handleDelete = async (taskId: string) => {
    const confirmar = window.confirm(textoConfirmacionEliminar);

    if (!confirmar) {
      return;
    }

    try {
      setError(null);
      await deleteTask(taskId);
      await cargarTareas();

      if (editingId === taskId) {
        resetForm();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(textoErrorEliminar);
      }
    }
  };

  const handleQuickStatusChange = async (
    taskId: string,
    newStatus: TaskStatus,
  ) => {
    try {
      setError(null);
      await quickUpdateTaskStatus(taskId, newStatus);
      await cargarTareas();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(textoErrorActualizarEstado);
      }
    }
  };

  return (
    <div className="space-y-8">
      <TaskForm
        tituloFormulario={tituloFormulario}
        subtituloFormulario={subtituloFormulario}
        error={error}
        form={form}
        projects={projects}
        loadingProjects={loadingProjects}
        saving={saving}
        editingId={editingId}
        textoCrear={textoCrear}
        textoActualizar={textoActualizar}
        textoGuardando={textoGuardando}
        textoCancelar={textoCancelar}
        textoProyectoSinDisponibles={textoProyectoSinDisponibles}
        textoSeleccionarProyecto={textoSeleccionarProyecto}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      <TasksList
        tasks={tasks}
        loading={loading}
        filterStatus={filterStatus}
        filterPriority={filterPriority}
        tituloListado={tituloListado}
        subtituloListado={subtituloListado}
        textoCargando={textoCargando}
        textoVacio={textoVacio}
        textoEditar={textoEditar}
        textoEliminar={textoEliminar}
        textoCambioRapidoEstado={textoCambioRapidoEstado}
        textoFiltroEstado={textoFiltroEstado}
        textoFiltroPrioridad={textoFiltroPrioridad}
        onFilterStatusChange={setFilterStatus}
        onFilterPriorityChange={setFilterPriority}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onQuickStatusChange={handleQuickStatusChange}
      />
    </div>
  );
}