'use client';

import { useEffect, useMemo, useState } from 'react';
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
import { getProjects, type Proyecto } from '@/lib/projectsApi';
import TaskForm from './TaskForm';
import TaskList from './TasksList';

type FormData = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
};

const initialForm: FormData = {
  title: '',
  description: '',
  status: 'PENDING',
  priority: 'MEDIUM',
  projectId: '',
};

export default function TasksManager() {
  const [tasks, setTasks] = useState<Tarea[]>([]);
  const [projects, setProjects] = useState<Proyecto[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(initialForm);

  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('');

  const tituloFormulario = useMemo(() => {
    return editingId ? 'Editar tarea' : 'Nueva tarea';
  }, [editingId]);

  const cargarProyectos = async () => {
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
        setError('Error al cargar proyectos');
      }
    } finally {
      setLoadingProjects(false);
    }
  };

  const cargarTareas = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getTasks({
        status: filterStatus ? (filterStatus as TaskStatus) : undefined,
        priority: filterPriority ? (filterPriority as TaskPriority) : undefined,
      });

      setTasks(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al cargar tareas');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const inicializar = async () => {
      await Promise.all([cargarProyectos(), cargarTareas()]);
    };

    inicializar();
  }, []);

  useEffect(() => {
    cargarTareas();
  }, [filterStatus, filterPriority]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError('El título de la tarea es obligatorio');
      return;
    }

    if (!form.projectId) {
      setError('Debes seleccionar un proyecto');
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
        setError('Error al guardar tarea');
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
    const confirmar = window.confirm('¿Seguro que deseas eliminar esta tarea?');

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
        setError('Error al eliminar tarea');
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
        setError('Error al actualizar estado');
      }
    }
  };

  return (
    <div className="space-y-8">
      <TaskForm
        tituloFormulario={tituloFormulario}
        error={error}
        form={form}
        projects={projects}
        loadingProjects={loadingProjects}
        saving={saving}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      <TaskList
        tasks={tasks}
        loading={loading}
        filterStatus={filterStatus}
        filterPriority={filterPriority}
        onFilterStatusChange={setFilterStatus}
        onFilterPriorityChange={setFilterPriority}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onQuickStatusChange={handleQuickStatusChange}
      />
    </div>
  );
}