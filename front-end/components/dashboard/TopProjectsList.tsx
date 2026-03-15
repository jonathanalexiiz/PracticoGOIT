import type { TopProjectsListProps } from '@/types/dashboard';

export default function TopProjectsList({
  projects,
  titulo,
  subtitulo,
  textoVacio,
}: TopProjectsListProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-800">{titulo}</h2>
        <p className="mt-1 text-sm text-gray-500">{subtitulo}</p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
          {textoVacio}
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                  {index + 1}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className="inline-block h-4 w-4 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />

                  <div>
                    <p className="font-semibold text-gray-800">{project.name}</p>
                    <p className="text-sm text-gray-500">Proyecto priorizado</p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">
                  {project.pendingTasksCount}
                </p>
                <p className="text-xs text-gray-500">pendientes</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}