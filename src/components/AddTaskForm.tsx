import { useState, type FormEvent } from 'react';
import { useTaskStore, type Priority } from '../store/taskStore';

export function AddTaskForm() {
  const addTask = useTaskStore((s) => s.addTask);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addTask(trimmed, priority, dueDate || undefined);
    setTitle('');
    setDueDate('');
    setPriority('medium');
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-3 rounded-xl bg-neutral-900 p-4 sm:flex-row sm:items-center"
    >
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task and press Enter…"
        className="flex-1 rounded-lg bg-neutral-800 px-3 py-2 text-neutral-100 outline-none ring-1 ring-transparent transition focus:ring-accent"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="rounded-lg bg-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:ring-1 focus:ring-accent"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="rounded-lg bg-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:ring-1 focus:ring-accent"
      />
      <button
        type="submit"
        className="rounded-lg bg-accent px-4 py-2 font-medium text-white transition hover:bg-accent-hover"
      >
        Add
      </button>
    </form>
  );
}
