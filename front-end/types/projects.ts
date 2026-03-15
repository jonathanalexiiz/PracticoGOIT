import type { Proyecto } from '@/lib/projectsApi';

export type ProjectFormData = {
  name: string;
  description: string;
  color: string;
};

export type ProjectsManagerProps = {
  tituloFormularioNuevo: string;
  tituloFormularioEditar: string;
  subtituloFormulario: string;
  tituloListado: string;
  subtituloListado: string;
  textoCargando: string;
  textoVacio: string;
  textoCrear: string;
  textoActualizar: string;
  textoGuardando: string;
  textoCancelar: string;
  textoEliminar: string;
  textoEditar: string;
  textoConfirmacionEliminar: string;
  textoErrorCargar: string;
  textoErrorGuardar: string;
  textoErrorEliminar: string;
  textoErrorNombreObligatorio: string;
};

export type ProjectFormProps = {
  tituloFormulario: string;
  subtituloFormulario: string;
  error: string | null;
  form: ProjectFormData;
  saving: boolean;
  editingId: string | null;
  textoCrear: string;
  textoActualizar: string;
  textoGuardando: string;
  textoCancelar: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export type ProjectsListProps = {
  projects: Proyecto[];
  loading: boolean;
  textoCargando: string;
  textoVacio: string;
  tituloListado: string;
  subtituloListado: string;
  textoEditar: string;
  textoEliminar: string;
  onEdit: (project: Proyecto) => void;
  onDelete: (projectId: string) => void;
};

export type ProjectCardProps = {
  project: Proyecto;
  textoEditar: string;
  textoEliminar: string;
  onEdit: (project: Proyecto) => void;
  onDelete: (projectId: string) => void;
};