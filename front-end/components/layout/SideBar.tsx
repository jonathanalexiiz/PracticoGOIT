import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white">
      <nav className="flex flex-col gap-2 p-4">
        <Link
          href="/dashboard"
          className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
        >
          Dashboard
        </Link>

        <Link
          href="/projects"
          className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
        >
          Projects
        </Link>

        <Link
          href="/tasks"
          className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
        >
          Tasks
        </Link>
      </nav>
    </aside>
  );
}