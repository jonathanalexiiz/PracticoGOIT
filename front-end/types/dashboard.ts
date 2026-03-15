export type DashboardManagerProps = {
  textoCargando: string;
  textoErrorDefault: string;
  textoSinDatos: string;
};

export type DashboardHeaderProps = {
  titulo: string;
  subtitulo: string;
};

export type DashboardStatsProps = {
  totalProjects: number;
  totalTasks: number;
  pending: number;
  inProgress: number;
  completed: number;
};

export type LatestTasksListProps = {
  tasks: import('@/lib/dashboardApi').DashboardLatestTask[];
  titulo: string;
  subtitulo: string;
  textoVacio: string;
};

export type LatestTaskCardProps = {
  task: import('@/lib/dashboardApi').DashboardLatestTask;
};

export type TopProjectsListProps = {
  projects: import('@/lib/dashboardApi').DashboardTopProject[];
  titulo: string;
  subtitulo: string;
  textoVacio: string;
};