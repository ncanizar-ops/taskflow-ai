import { useTaskStore, type Task } from '../store/taskStore';

const PRIORITY_BADGE: Record<Task['priority'], string> = {
  high: 'bg-red-500/20 text-red-400',
  medium: 'bg-amber-500/20 text-amber-400',
  low: 'bg-sky-500/20 text-sky-400',
};

function isOverdue(task: Task): boolean {
  if (!task.dueDate || task.completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(task.dueDate) < today;
}

export function TaskItem({ task }: { task: Task }) {
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const overdue = isOverdue(task);

  return (
    <li className="group flex animate-fade-in items-center gap-3 rounded-xl bg-neutral-900 p-4 transition hover:bg-neutral-800/80">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="h-5 w-5 accent-accent"
      />
      <div className="min-w-0 flex-1">
        <p
          className={`truncate ${
            task.completed ? 'text-neutral-500 line-through' : 'text-neutral-100'
          }`}
        >
          {task.title}
        </p>
        {task.dueDate && (
          <p
            className={`text-xs ${
              overdue ? 'font-medium text-red-400' : 'text-neutral-500'
            }`}
          >
            Due {new Date(task.dueDate).toLocaleDateString()}
            {overdue && ' · overdue'}
          </p>
        )}
      </div>
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
          PRIORITY_BADGE[task.priority]
        }`}
      >
        {task.priority}
      </span>
      <button
        onClick={() => deleteTask(task.id)}
        aria-label="Delete task"
        className="text-neutral-600 opacity-0 transition hover:text-red-400 group-hover:opacity-100"
      >
        ✕
      </button>
    </li>
  );
}
