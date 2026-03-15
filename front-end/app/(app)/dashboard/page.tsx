import DashboardManager from '@/components/dashboard/DashboardManager';

export default function DashboardPage() {
  return (
    <DashboardManager
      textoCargando="Cargando dashboard..."
      textoErrorDefault="Error al cargar el dashboard"
      textoSinDatos="No hay datos disponibles."
    />
  );
}