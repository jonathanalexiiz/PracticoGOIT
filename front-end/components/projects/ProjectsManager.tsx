'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
  type Proyecto,
} from '@/lib/projectsApi';
import type {
  ProjectFormData,
  ProjectsManagerProps,
} from '@/types/projects';
import ProjectForm from './ProjectForm';
import ProjectsList from './ProjectsList';

const initialForm: ProjectFormData = {
  name: '',
  description: '',
  color: '#6366f1',
};

export default function ProjectsManager({
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
  textoEliminar,
  textoEditar,
  textoConfirmacionEliminar,
  textoErrorCargar,
  textoErrorGuardar,
  textoErrorEliminar,
  textoErrorNombreObligatorio,
}: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectFormData>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const tituloFormulario = useMemo(() => {
    return editingId ? tituloFormularioEditar : tituloFormularioNuevo;
  }, [editingId, tituloFormularioEditar, tituloFormularioNuevo]);

  const cargarProyectos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(textoErrorCargar);
      }
    } finally {
      setLoading(false);
    }
  }, [textoErrorCargar]);

  useEffect(() => {
    cargarProyectos();
  }, [cargarProyectos]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError(textoErrorNombreObligatorio);
      return;
    }

    try {
      setSaving(true);
      setError(null);

      if (editingId) {
        await updateProject(editingId, {
          name: form.name,
          description: form.description,
          color: form.color,
        });
      } else {
        await createProject({
          name: form.name,
          description: form.description,
          color: form.color,
        });
      }

      resetForm();
      await cargarProyectos();
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

  const handleEdit = (project: Proyecto) => {
    setError(null);
    setEditingId(project.id);
    setForm({
      name: project.name,
      description: project.description || '',
      color: project.color,
    });
  };

  const handleDelete = async (projectId: string) => {
    const confirmar = window.confirm(textoConfirmacionEliminar);

    if (!confirmar) {
      return;
    }

    try {
      setError(null);
      await deleteProject(projectId);
      await cargarProyectos();

      if (editingId === projectId) {
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

  return (
    <div className="space-y-8">
      <ProjectForm
        tituloFormulario={tituloFormulario}
        subtituloFormulario={subtituloFormulario}
        error={error}
        form={form}
        saving={saving}
        editingId={editingId}
        textoCrear={textoCrear}
        textoActualizar={textoActualizar}
        textoGuardando={textoGuardando}
        textoCancelar={textoCancelar}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      <ProjectsList
        projects={projects}
        loading={loading}
        textoCargando={textoCargando}
        textoVacio={textoVacio}
        tituloListado={tituloListado}
        subtituloListado={subtituloListado}
        textoEditar={textoEditar}
        textoEliminar={textoEliminar}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}