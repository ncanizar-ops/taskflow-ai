import { useEffect, useMemo, useRef } from 'react';
import { useTaskStore } from './store/taskStore';
import { AddTaskForm } from './components/AddTaskForm';
import { FilterBar } from './components/FilterBar';
import { TaskItem } from './components/TaskItem';
import { EmptyState } from './components/EmptyState';

export default function App() {
  const { tasks, statusFilter, priorityFilter } = useTaskStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () =>
      tasks.filter((t) => {
        if (statusFilter === 'active' && t.completed) return false;
        if (statusFilter === 'completed' && !t.completed) return false;
        if (priorityFilter !== 'all' && t.priority !== priorityFilter)
          return false;
        return true;
      }),
    [tasks, statusFilter, priorityFilter]
  );

  const remaining = tasks.filter((t) => !t.completed).length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        containerRef.current
          ?.querySelector<HTMLInputElement>('input[type="text"], input:not([type])')
          ?.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        containerRef.current
          ?.querySelector<HTMLButtonElement>('[data-filter-first]')
          ?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col gap-6 px-4 py-10">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold text-neutral-100">
          Task<span className="text-accent">Flow</span> AI
        </h1>
        <span className="text-sm text-neutral-500">
          {remaining} {remaining === 1 ? 'task' : 'tasks'} remaining
        </span>
      </header>

      <div ref={containerRef} className="flex flex-col gap-6">
        <AddTaskForm />
        <FilterBar />

        {visible.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="flex flex-col gap-2">
            {visible.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        )}
      </div>

      <footer className="mt-auto pt-6 text-center text-xs text-neutral-600">
        Ctrl+N to add · Ctrl+F to filter
      </footer>
    </div>
  );
}
