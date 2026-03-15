import {
  BASE_URL,
  getAuthHeaders,
  parseResponse,
} from '@/lib/clientApi';

const API_URL = `${BASE_URL}/dashboard`;

export type DashboardLatestTask = {
  id: string;
  title: string;
  description?: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  updatedAt: string;
  project: {
    id: string;
    name: string;
    color: string;
  };
};

export type DashboardTopProject = {
  id: string;
  name: string;
  color: string;
  pendingTasksCount: number;
};

export type DashboardResponse = {
  totals: {
    projects: number;
    tasks: number;
  };
  tasksByStatus: {
    pending: number;
    inProgress: number;
    completed: number;
  };
  latestTasks: DashboardLatestTask[];
  topProjectsByPendingTasks: DashboardTopProject[];
};

export async function getDashboardData(): Promise<DashboardResponse> {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  return parseResponse<DashboardResponse>(
    response,
    'Error al obtener el dashboard',
  );
}