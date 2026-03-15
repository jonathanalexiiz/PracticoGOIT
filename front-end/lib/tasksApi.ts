const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL no está definida');
}

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

function getAuthHeaders() {
  const token = localStorage.getItem('access_token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

function getErrorMessage(data: unknown, defaultMessage: string) {
  if (
    data &&
    typeof data === 'object' &&
    'message' in data
  ) {
    const message = (data as { message: unknown }).message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    if (typeof message === 'string') {
      return message;
    }
  }

  return defaultMessage;
}

export async function getTasks(filters?: {
  status?: TaskStatus;
  priority?: TaskPriority;
}): Promise<Tarea[]> {
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(data, 'Error al obtener tareas'));
  }

  return data;
}

export async function createTask(payload: TareaPayload): Promise<Tarea> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(data, 'Error al crear tarea'));
  }

  return data;
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(data, 'Error al actualizar tarea'));
  }

  return data;
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      getErrorMessage(data, 'Error al actualizar el estado de la tarea'),
    );
  }

  return data;
}

export async function deleteTask(taskId: string): Promise<void> {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(getErrorMessage(data, 'Error al eliminar tarea'));
  }
}