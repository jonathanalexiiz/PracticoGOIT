import {
  BASE_URL,
  getAuthHeaders,
  parseResponse,
  parseVoidResponse,
} from '@/lib/clientApi';

const API_URL = `${BASE_URL}/tasks`;

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export type Tarea = {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  project: {
    id: string;
    name: string;
    color: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type TareaPayload = {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  projectId: string;
};

export type GetTasksFilters = {
  status?: TaskStatus;
  priority?: TaskPriority;
};

export async function getTasks(filters?: GetTasksFilters): Promise<Tarea[]> {
  const params = new URLSearchParams();

  if (filters?.status) {
    params.append('status', filters.status);
  }

  if (filters?.priority) {
    params.append('priority', filters.priority);
  }

  const url = params.toString()
    ? `${API_URL}?${params.toString()}`
    : API_URL;

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  return parseResponse<Tarea[]>(response, 'Error al obtener tareas');
}

export async function createTask(payload: TareaPayload): Promise<Tarea> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return parseResponse<Tarea>(response, 'Error al crear tarea');
}

export async function updateTask(
  taskId: string,
  payload: Partial<TareaPayload>,
): Promise<Tarea> {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return parseResponse<Tarea>(response, 'Error al actualizar tarea');
}

export async function quickUpdateTaskStatus(
  taskId: string,
  status: TaskStatus,
): Promise<Tarea> {
  const response = await fetch(`${API_URL}/${taskId}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });

  return parseResponse<Tarea>(
    response,
    'Error al actualizar el estado de la tarea',
  );
}

export async function deleteTask(taskId: string): Promise<void> {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return parseVoidResponse(response, 'Error al eliminar tarea');
}