'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  getDashboardData,
  type DashboardResponse,
} from '@/lib/dashboardApi';
import type { DashboardManagerProps } from '@/types/dashboard';
import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import LatestTasksList from './LatestTasksList';
import TopProjectsList from './TopProjectsList';

export default function DashboardManager({
  textoCargando,
  textoErrorDefault,
  textoSinDatos,
}: DashboardManagerProps) {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getDashboardData();
      setDashboard(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(textoErrorDefault);
      }
    } finally {
      setLoading(false);
    }
  }, [textoErrorDefault]);

  useEffect(() => {
    cargarDashboard();
  }, [cargarDashboard]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm">
        {textoCargando}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 shadow-sm">
        {error}
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm">
        {textoSinDatos}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        titulo="Dashboard"
        subtitulo="Resumen general de tus proyectos y tareas."
      />

      <DashboardStats
        totalProjects={dashboard.totals.projects}
        totalTasks={dashboard.totals.tasks}
        pending={dashboard.tasksByStatus.pending}
        inProgress={dashboard.tasksByStatus.inProgress}
        completed={dashboard.tasksByStatus.completed}
      />

      <section className="grid gap-6 xl:grid-cols-2">
        <LatestTasksList
          tasks={dashboard.latestTasks}
          titulo="Últimas 5 tareas creadas"
          subtitulo="Actividad reciente de tus tareas."
          textoVacio="No hay tareas creadas todavía."
        />

        <TopProjectsList
          projects={dashboard.topProjectsByPendingTasks}
          titulo="Top 3 proyectos con más pendientes"
          subtitulo="Proyectos que requieren más atención."
          textoVacio="No hay proyectos con tareas pendientes."
        />
      </section>
    </div>
  );
}