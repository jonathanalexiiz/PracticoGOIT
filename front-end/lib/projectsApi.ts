import {
  BASE_URL,
  getAuthHeaders,
  parseResponse,
  parseVoidResponse,
} from '@/lib/clientApi';

const API_URL = `${BASE_URL}/projects`;

export type Proyecto = {
  id: string;
  name: string;
  description?: string | null;
  color: string;
  totalTasks: number;
  tasksByStatus: {
    pending: number;
    inProgress: number;
    completed: number;
  };
};

export type ProyectoPayload = {
  name: string;
  description?: string;
  color: string;
};

export async function getProjects(): Promise<Proyecto[]> {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  return parseResponse<Proyecto[]>(response, 'Error al obtener proyectos');
}

export async function createProject(
  payload: ProyectoPayload,
): Promise<Proyecto> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return parseResponse<Proyecto>(response, 'Error al crear proyecto');
}

export async function updateProject(
  projectId: string,
  payload: ProyectoPayload,
): Promise<Proyecto> {
  const response = await fetch(`${API_URL}/${projectId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return parseResponse<Proyecto>(response, 'Error al actualizar proyecto');
}

export async function deleteProject(projectId: string): Promise<void> {
  const response = await fetch(`${API_URL}/${projectId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return parseVoidResponse(response, 'Error al eliminar proyecto');
}