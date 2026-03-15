import type { Proyecto } from '@/lib/projectsApi';
import type { Tarea, TaskPriority, TaskStatus } from '@/lib/tasksApi';

export type TaskFormData = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
};

export type TasksManagerProps = {
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
  textoEditar: string;
  textoEliminar: string;
  textoCambioRapidoEstado: string;
  textoFiltroEstado: string;
  textoFiltroPrioridad: string;
  textoErrorCargarProyectos: string;
  textoErrorCargarTareas: string;
  textoErrorGuardar: string;
  textoErrorEliminar: string;
  textoErrorActualizarEstado: string;
  textoErrorTituloObligatorio: string;
  textoErrorProyectoObligatorio: string;
  textoConfirmacionEliminar: string;
  textoProyectoSinDisponibles: string;
  textoSeleccionarProyecto: string;
};

export type TaskCardProps = {
  task: Tarea;
  textoEditar: string;
  textoEliminar: string;
  textoCambioRapidoEstado: string;
  onEdit: (task: Tarea) => void;
  onDelete: (taskId: string) => void;
  onQuickStatusChange: (taskId: string, newStatus: TaskStatus) => void;
};

export type TaskFiltersProps = {
  filterStatus: TaskStatus | '';
  filterPriority: TaskPriority | '';
  textoFiltroEstado: string;
  textoFiltroPrioridad: string;
  onFilterStatusChange: (value: TaskStatus | '') => void;
  onFilterPriorityChange: (value: TaskPriority | '') => void;
};

export type TaskFormProps = {
  tituloFormulario: string;
  subtituloFormulario: string;
  error: string | null;
  form: TaskFormData;
  projects: Proyecto[];
  loadingProjects: boolean;
  saving: boolean;
  editingId: string | null;
  textoCrear: string;
  textoActualizar: string;
  textoGuardando: string;
  textoCancelar: string;
  textoProyectoSinDisponibles: string;
  textoSeleccionarProyecto: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export type TasksListProps = {
  tasks: Tarea[];
  loading: boolean;
  filterStatus: TaskStatus | '';
  filterPriority: TaskPriority | '';
  tituloListado: string;
  subtituloListado: string;
  textoCargando: string;
  textoVacio: string;
  textoEditar: string;
  textoEliminar: string;
  textoCambioRapidoEstado: string;
  textoFiltroEstado: string;
  textoFiltroPrioridad: string;
  onFilterStatusChange: (value: TaskStatus | '') => void;
  onFilterPriorityChange: (value: TaskPriority | '') => void;
  onEdit: (task: Tarea) => void;
  onDelete: (taskId: string) => void;
  onQuickStatusChange: (taskId: string, newStatus: TaskStatus) => void;
};