import type { LatestTasksListProps } from '@/types/dashboard';
import LatestTaskCard from './LatestTaskCard';

export default function LatestTasksList({
  tasks,
  titulo,
  subtitulo,
  textoVacio,
}: LatestTasksListProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-800">{titulo}</h2>
        <p className="mt-1 text-sm text-gray-500">{subtitulo}</p>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
          {textoVacio}
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <LatestTaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}